import {gql} from '@apollo/client';
import {Form, Modal} from 'antd';
import {add, isAfter, isSameDay, min} from 'date-fns';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {CreateModalQuery, useCreateModalQuery} from '../../types/graphql';
import {SLOT_LENGTH_MIN} from './Slots';
import StatusBadge from './StatusBadge';
import TimePicker from './TimePicker';
import styles from './useReservationModal.module.css';
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
    >
      {data?.node?.__typename === 'Table' && slot != null && (
        <ModalContent table={data.node} time={slot.time} />
      )}
    </Modal>,
  ];
}

function ModalContent({
  table,
  time,
}: {
  table: Extract<CreateModalQuery['node'], {__typename: 'Table'}>;
  time: Date;
}) {
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

  const [endTime, setEndTime] = useState<Date | null>(
    add(time, {minutes: SLOT_LENGTH_MIN}),
  );

  if (isAfter(endTime, maxEndTime)) {
    return 'error';
  }

  return (
    <Form labelCol={{span: 8}}>
      <Form.Item label="Ort">
        {table.area.displayName}, {table.displayName}
      </Form.Item>
      <Form.Item label="Von">
        {time.toLocaleString('de', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        Uhr
      </Form.Item>
      <Form.Item label="Bis">
        <TimePicker
          min={time}
          selected={endTime}
          max={maxEndTime}
          onChange={setEndTime}
        />
      </Form.Item>
    </Form>
  );
}
