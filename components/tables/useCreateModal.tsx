import {gql} from '@apollo/client';
import {Alert, Button, Form, Input, Modal} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {add, isAfter, min, differenceInMinutes, isBefore} from 'date-fns';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  CreateModalQuery,
  CreateReservationMutationVariables,
  useCreateModalQuery,
  useCreateReservationMutation,
} from '../../types/graphql';
import GuestInput from './GuestInput';
import {SLOT_LENGTH_MIN} from './Slots';
import TimePicker from './TimePicker';
const {confirm} = Modal;

gql`
  query CreateModal($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        maxCapacity
        displayName
        area {
          id
          displayName
          openingHour {
            startTime
            endTime
          }
        }
        reservations {
          startTime
          endTime
        }
      }
    }
  }

  mutation CreateReservation(
    $primaryEmail: String!
    $primaryPerson: String!
    $otherPersons: [String!]!
    $startTime: DateTime!
    $endTime: DateTime!
    $note: String
    $tableId: ID!
  ) {
    createReservation(
      primaryEmail: $primaryEmail
      primaryPerson: $primaryPerson
      otherPersons: $otherPersons
      startTime: $startTime
      endTime: $endTime
      note: $note
      tableId: $tableId
    ) {
      id
    }
  }
`;

export default function useCreateModal(): [
  (tableId: string, time: Date) => void,
  React.ReactElement,
] {
  const [slot, setSlot] = useState<{
    tableId: string;
    time: Date;
  } | null>(null);

  const {data} = useCreateModalQuery({
    variables: {
      id: slot ? `Table:${slot.tableId}` : null,
    },
    skip: slot == null,
  });

  const [variables, content] = useModalContent(
    data?.node?.__typename === 'Table' ? data.node : null,
    slot ? slot.time : null,
  );

  const [createReservation, {loading}] = useCreateReservationMutation({});

  const handleClose = () => {
    setSlot(null);
  };

  return [
    (tableId: string, time: Date) => setSlot({tableId, time}),
    <Modal
      title="Neue Reservierung"
      visible={Boolean(slot)}
      onOk={handleClose}
      onCancel={handleClose}
      okText="Erstellen"
      cancelText="Abbrechen"
      footer={
        <>
          <Button onClick={() => setSlot(null)}>Abbrechen</Button>
          <Button
            disabled={!variables?.primaryEmail || !variables?.primaryPerson}
            loading={loading}
            onClick={() => {
              createReservation({
                variables: {
                  ...variables,
                  startTime: slot.time,
                },
                refetchQueries: ['Slots'],
              }).then(handleClose);
            }}
            type="primary"
          >
            OK
          </Button>
        </>
      }
    >
      {content}
    </Modal>,
  ];
}

function useModalContent(
  table: Extract<CreateModalQuery['node'], {__typename?: 'Table'}> | null,
  time: Date | null,
): [
  variables: Omit<CreateReservationMutationVariables, 'startTime'> | null,
  content: React.ReactNode,
] {
  const [minEndTime, setMinEndTime] = useState<Date | null>(null);
  const [maxEndTime, setMaxEndTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [otherPersons, setOtherPersons] = useState<string[]>([]);
  const [primaryEmail, setPrimaryEmail] = useState<string>('');
  const [note, setNote] = useState<string | undefined>();

  useEffect(() => {
    if (!time || !table) {
      return;
    }
    const maxEndTime = min(
      [
        ...table.reservations
          .filter((r) => isAfter(r.startTime, time))
          .map((r) => r.startTime),
        ...table.area.openingHour
          .filter((o) => isAfter(o.endTime, time))
          .map((e) => e.endTime),
      ].filter(Boolean),
    );

    const minEndTime = add(time, {minutes: SLOT_LENGTH_MIN});
    setMaxEndTime(maxEndTime);
    setMinEndTime(minEndTime);
    setEndTime(minEndTime);
    setOtherPersons([]);
    setPrimaryEmail('');
    setNote('');
  }, [
    table,
    time,
    setEndTime,
    setMinEndTime,
    setMaxEndTime,
    setOtherPersons,
    setPrimaryEmail,
    setNote,
  ]);

  if (!table || !time || !endTime) {
    return [null, null];
  }

  return [
    {
      endTime,
      otherPersons: otherPersons.slice(1),
      primaryEmail,
      primaryPerson: otherPersons[0],
      tableId: table.id,
      note,
    },
    <Form labelCol={{span: 8}}>
      <Form.Item label="Ort">
        {table.area.displayName}, {table.displayName} ({table.maxCapacity}{' '}
        Plätze)
      </Form.Item>
      <Form.Item label="Von">
        {time.toLocaleString('de', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Berlin',
        })}{' '}
        Uhr
      </Form.Item>
      <Form.Item label="Bis">
        <TimePicker
          min={minEndTime}
          selected={endTime}
          max={maxEndTime}
          onChange={setEndTime}
        />
      </Form.Item>
      <Form.Item label="E-Mail">
        <Input
          type="email"
          value={primaryEmail}
          onChange={(e) => setPrimaryEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Gäste">
        <GuestInput
          maxCapacity={table.maxCapacity}
          value={otherPersons}
          onChange={setOtherPersons}
        />
      </Form.Item>
      <TextArea
        rows={3}
        placeholder="Interne Notizen"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      {differenceInMinutes(time, new Date()) < 15 && (
        <Alert
          message="Nach dem Erstellen muss die Reservierung noch manuell eingecheckt werden, sobald die Gäste das Gelände betreten."
          type="warning"
          showIcon
        />
      )}
    </Form>,
  ];
}
