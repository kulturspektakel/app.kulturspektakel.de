import {ExclamationCircleOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Modal, Rate, Form, Select, Input, Spin} from 'antd';
import {add} from 'date-fns';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, {useCallback, useEffect, useState} from 'react';
import {
  TableRowFragment,
  useCheckInMutation,
  useReservationModalQuery,
} from '../../types/graphql';
import {SLOT_LENGTH_MIN} from './Slots';
import StatusBadge from './StatusBadge';
const {confirm} = Modal;

gql`
  mutation CheckIn($persons: Int!, $id: Int!) {
    checkInReservation(checkedInPersons: $persons, id: $id) {
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
      table {
        maxCapacity
        area {
          displayName
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
  });
  const [checkIn] = useCheckInMutation();

  useEffect(() => {});

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
    content = (
      <Form labelCol={{span: 8}}>
        <Rate
          value={data.reservationForToken.checkedInPersons}
          count={10}
          character={({index}) => <span>{index + 1}</span>}
          onChange={(persons) => {
            checkIn({
              variables: {
                id: data.reservationForToken.id,
                persons,
              },
            });
          }}
        />
        <Form.Item label="Status">
          <StatusBadge
            status={data.reservationForToken.status}
            startTime={data.reservationForToken.startTime}
            endTime={data.reservationForToken.endTime}
            showAll
          />
        </Form.Item>
        <Form.Item label="Bereich">
          {data.reservationForToken.table.area.displayName}
        </Form.Item>

        <Form.Item label="Von">
          <TimePicker
            min={data.reservationForToken.startTime}
            max={data.reservationForToken.endTime}
            selected={data.reservationForToken.startTime}
          />
        </Form.Item>
        <Form.Item label="Bis">
          <TimePicker
            min={data.reservationForToken.startTime}
            max={data.reservationForToken.endTime}
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
    content = <Spin />;
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
            <Select.Option value={time.toISOString()}>
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
