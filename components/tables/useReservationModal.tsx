import {ExclamationCircleOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Modal, Rate, Form, Select, Spin} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {add, max, min, sub, isSameDay} from 'date-fns';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {
  ReservationModalQuery,
  useCancelReservationMutation,
  useReservationModalQuery,
  useUpdateReservationMutation,
} from '../../types/graphql';
import GuestInput from './GuestInput';
import {SLOT_LENGTH_MIN} from './Slots';
import StatusBadge from './StatusBadge';
import TimePicker from './TimePicker';
import styles from './useReservationModal.module.css';
const {confirm} = Modal;

gql`
  fragment ReservationFragment on Reservation {
    id
    startTime
    endTime
    status
    checkedInPersons
    primaryPerson
    otherPersons
    note
    alternativeTables {
      id
      displayName
      area {
        id
        displayName
      }
    }
    table {
      id
      displayName
      maxCapacity
      reservations {
        id
        startTime
        endTime
        status
      }
      area {
        id
        displayName
        openingHour {
          startTime
          endTime
        }
      }
    }
  }

  mutation UpdateReservation(
    $id: Int!
    $persons: Int
    $startTime: DateTime
    $endTime: DateTime
    $note: String
    $tableId: ID
  ) {
    updateReservation(
      id: $id
      checkedInPersons: $persons
      startTime: $startTime
      endTime: $endTime
      note: $note
      tableId: $tableId
    ) {
      ...ReservationFragment
    }
  }

  mutation CancelReservation($token: String!) {
    cancelReservation(token: $token)
  }

  query ReservationModal($token: String!) {
    reservationForToken(token: $token) {
      ...ReservationFragment
    }
  }
`;

export default function useReservationModal(): [
  (token: string) => void,
  React.ReactElement,
] {
  const [token, setToken] = useState<string | null>(null);
  const {data} = useReservationModalQuery({
    variables: {
      token,
    },
    skip: !token,
    fetchPolicy: 'cache-and-network',
  });
  const [updateReservation] = useUpdateReservationMutation();
  const [cancelReservation] = useCancelReservationMutation();
  const [note, setNote] = useState<string | undefined>();

  const onClear = useCallback(() => {
    confirm({
      title: `Reservierung #${data?.reservationForToken?.id} löschen`,
      icon: <ExclamationCircleOutlined />,
      content:
        'Die Reservierung ist dann nicht mehr verfügbar und die Plätze können neu vergeben werden.',
      okButtonProps: {
        danger: true,
      },
      okText: 'Löschen',
      cancelText: 'Abbrechen',
      onOk: () => {
        cancelReservation({
          variables: {
            token,
          },
          refetchQueries: ['Slots'],
        }).then(() => setToken(null));
      },
    });
  }, [data?.reservationForToken]);

  useEffect(() => setNote(data?.reservationForToken?.note), [
    data?.reservationForToken?.note,
  ]);

  const handleClose = () => {
    if (data?.reservationForToken?.note !== note) {
      updateReservation({
        variables: {
          id: data?.reservationForToken?.id,
          note,
        },
      });
    }
    setToken(null);
  };

  let content = null;

  if (data?.reservationForToken) {
    const reserved = data.reservationForToken.otherPersons.length + 1;
    const reservationIndex = data.reservationForToken.table.reservations.findIndex(
      (r) => r.id === data.reservationForToken.id,
    );

    const opening: Date | null = data.reservationForToken.table.area.openingHour.find(
      ({startTime}) => isSameDay(startTime, data.reservationForToken.startTime),
    )?.startTime;
    const ending: Date | null = data.reservationForToken.table.area.openingHour.find(
      ({endTime}) => isSameDay(endTime, data.reservationForToken.endTime),
    )?.endTime;

    content = (
      <Form labelCol={{span: 8}}>
        <div className={styles.rater}>
          <h4>Gäste einchecken</h4>
          <Rate
            value={data.reservationForToken.checkedInPersons}
            count={data.reservationForToken.table.maxCapacity}
            character={({value, index}) => (
              <Button
                type={index < Math.max(reserved, value) ? 'primary' : 'default'}
                ghost={index >= value && index < reserved}
                shape="circle"
              >
                {index + 1}
              </Button>
            )}
            onChange={(persons) => {
              const onOk = () =>
                updateReservation({
                  variables: {
                    id: data.reservationForToken.id,
                    persons,
                  },
                });
              const now = new Date();
              if (
                data.reservationForToken.status !== 'CheckedIn' &&
                differenceInMinutes(data.reservationForToken.startTime, now) >
                  10
              ) {
                Modal.confirm({
                  title: 'Reservierung beginnt später',
                  content: `Die Reservierung beginnt erst später, soll sie trotzdem schon eingecheckt werden?`,
                  okText: 'Einchecken',
                  cancelText: 'Abbrechen',
                  onOk,
                });
              } else {
                onOk();
              }
            }}
          />
          <p className={styles.info}>
            Eingechekt:{' '}
            <strong>{data.reservationForToken.checkedInPersons}</strong>{' '}
            &middot; Reserviert für: <strong>{reserved}</strong> &middot; Platz
            für: <strong>{data.reservationForToken.table.maxCapacity}</strong>
          </p>
        </div>
        <Form.Item label="Status">
          <StatusBadge
            status={data.reservationForToken.status}
            startTime={data.reservationForToken.startTime}
            endTime={data.reservationForToken.endTime}
            showAll
          />
        </Form.Item>
        <Form.Item label="Tisch">
          <TablePicker
            alternativeTables={data.reservationForToken.alternativeTables}
            selected={data.reservationForToken.table}
            onChange={(value) =>
              updateReservation({
                variables: {
                  id: data.reservationForToken.id,
                  tableId: value,
                },
                refetchQueries: ['Slots'],
              })
            }
          />
        </Form.Item>

        <Form.Item label="Von">
          <TimePicker
            onChange={(value) =>
              updateReservation({
                variables: {
                  id: data.reservationForToken.id,
                  startTime: value,
                },
              })
            }
            min={max(
              [
                sub(data.reservationForToken.startTime, {
                  minutes: SLOT_LENGTH_MIN * 4,
                }),
                opening,
                data.reservationForToken.table.reservations[
                  reservationIndex - 1
                ]?.endTime,
              ].filter(Boolean),
            )}
            max={sub(data.reservationForToken.endTime, {
              minutes: SLOT_LENGTH_MIN,
            })}
            selected={data.reservationForToken.startTime}
          />
        </Form.Item>
        <Form.Item label="Bis">
          <TimePicker
            onChange={(value) =>
              updateReservation({
                variables: {
                  id: data.reservationForToken.id,
                  endTime: value,
                },
              })
            }
            min={add(data.reservationForToken.startTime, {
              minutes: SLOT_LENGTH_MIN,
            })}
            max={min(
              [
                add(data.reservationForToken.endTime, {
                  minutes: SLOT_LENGTH_MIN * 4,
                }),
                ending,
                data.reservationForToken.table.reservations[
                  reservationIndex + 1
                ]?.startTime,
              ].filter(Boolean),
            )}
            selected={data.reservationForToken.endTime}
          />
        </Form.Item>
        <Form.Item label="Gäste">
          <GuestInput
            onChange={() => {}}
            maxCapacity={data.reservationForToken.table.maxCapacity}
            value={[
              data.reservationForToken.primaryPerson,
              ...data.reservationForToken.otherPersons,
            ]}
          />
        </Form.Item>
        <TextArea
          rows={3}
          placeholder="Interne Notizen"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Form>
    );
  } else {
    content = (
      <div className={styles.spinner}>
        <Spin />
      </div>
    );
  }

  return [
    setToken,
    <Modal
      title={
        data?.reservationForToken
          ? `#${data.reservationForToken.id}: ${data.reservationForToken.primaryPerson}`
          : ''
      }
      visible={Boolean(token)}
      onOk={handleClose}
      onCancel={handleClose}
      footer={
        <Button danger onClick={onClear}>
          Reservierung stornieren
        </Button>
      }
    >
      {content}
    </Modal>,
  ];
}

function TablePicker({
  alternativeTables,
  selected,
  onChange,
}: {
  alternativeTables: ReservationModalQuery['reservationForToken']['alternativeTables'];
  selected: ReservationModalQuery['reservationForToken']['table'];
  onChange: (value: string) => void;
}) {
  const areas = alternativeTables.reduce<
    Map<
      string,
      ReservationModalQuery['reservationForToken']['alternativeTables'][number]['area']
    >
  >((acc, cv) => acc.set(cv.area.id, cv.area), new Map());
  return (
    <Select onChange={onChange} value={selected.id}>
      {[...areas]
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .map(([, {id, displayName}]) => (
          <Select.OptGroup key={id} label={displayName}>
            {}
            {alternativeTables
              .filter((t) => t.area.id === id)
              .concat(id === selected.area.id ? [selected] : [])
              .sort((a, b) => (a.id < b.id ? -1 : 1))
              .map((t) => (
                <Select.Option value={t.id} key={t.id}>
                  {t.displayName}
                </Select.Option>
              ))}
          </Select.OptGroup>
        ))}
      {}
    </Select>
  );
}
