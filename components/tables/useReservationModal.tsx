import {ExclamationCircleOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Modal, Rate, Form, Select, Spin} from 'antd';
import {add, max, min, sub, isSameDay} from 'date-fns';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, {useCallback, useState} from 'react';
import {
  ReservationModalQuery,
  useCheckInMutation,
  useReservationModalQuery,
} from '../../types/graphql';
import {SLOT_LENGTH_MIN} from './Slots';
import StatusBadge from './StatusBadge';
import styles from './useReservationModal.module.css';
const {confirm} = Modal;

gql`
  mutation UpdateReservation($persons: Int, $token: String!) {
    updateReservation(checkedInPersons: $persons, token: $token) {
      id
      status
      checkedInPersons
    }
  }
`;

gql`
  query ReservationModal($token: String!) {
    reservationForToken(token: $token) {
      id
      startTime
      endTime
      status
      checkedInPersons
      primaryPerson
      otherPersons
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
        reservations {
          id
          startTime
          endTime
          status
        }
        maxCapacity
        area {
          displayName
          openingHour {
            startTime
            endTime
          }
        }
      }
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
  });
  const [checkIn] = useCheckInMutation();

  const onClear = useCallback(() => {
    confirm({
      title: `Reservierung #${data?.reservationForToken?.id} löschen`,
      icon: <ExclamationCircleOutlined />,
      content: 'text',
      okButtonProps: {
        danger: true,
      },
      okText: 'Löschen',
      cancelText: 'Abbrechen',
      onOk() {},
    });
  }, [data?.reservationForToken]);

  const handleOk = () => {
    setToken(null);
  };

  const handleCancel = () => {
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
                checkIn({
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
            selected={data.reservationForToken.table.id}
          />
        </Form.Item>

        <Form.Item label="Von">
          <TimePicker
            min={max(
              [
                sub(data.reservationForToken.startTime, {
                  minutes: SLOT_LENGTH_MIN * 5,
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
            min={add(data.reservationForToken.startTime, {
              minutes: SLOT_LENGTH_MIN,
            })}
            max={min(
              [
                add(data.reservationForToken.endTime, {
                  minutes: SLOT_LENGTH_MIN * 5,
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
          {data.reservationForToken.primaryPerson},{' '}
          {data.reservationForToken.otherPersons.join(', ')}
        </Form.Item>
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
      onOk={handleOk}
      onCancel={handleCancel}
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

function TimePicker({
  min,
  max,
  selected,
}: {
  selected: Date;
  min: Date;
  max: Date;
}) {
  return (
    <Select value={selected.toISOString()}>
      {Array(differenceInMinutes(max, min) / SLOT_LENGTH_MIN)
        .fill(null)
        .map((_, i) => {
          const time = add(min, {minutes: SLOT_LENGTH_MIN * i});
          return (
            <Select.Option value={time.toISOString()} key={i}>
              {time.toLocaleTimeString('de', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Berlin',
              })}{' '}
              Uhr
            </Select.Option>
          );
        })}
    </Select>
  );
}

function TablePicker({
  alternativeTables,
  selected,
}: {
  alternativeTables: ReservationModalQuery['reservationForToken']['alternativeTables'];
  selected: string;
}) {
  const areas = alternativeTables.reduce<
    Map<
      string,
      ReservationModalQuery['reservationForToken']['alternativeTables'][number]['area']
    >
  >((acc, cv) => acc.set(cv.area.id, cv.area), new Map());
  return (
    <Select value={selected}>
      {[...areas].map(([, {id, displayName}]) => (
        <Select.OptGroup key={id} label={displayName}>
          {alternativeTables
            .filter((t) => t.area.id === id)
            .map((t) => (
              <Select.Option value={t.id} key={t.id}>
                Tisch {t.displayName}
              </Select.Option>
            ))}
        </Select.OptGroup>
      ))}
      {}
    </Select>
  );
}
