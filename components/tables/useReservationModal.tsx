import {ExclamationCircleOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Modal, Rate} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {TableRowFragment, useCheckInMutation} from '../../types/graphql';
const {confirm} = Modal;

gql`
  mutation CheckIn($persons: Int!, $id: Int!) {
    checkInReservation(checkedInPersons: $persons, id: $id) {
      id
      status
      checkedInPersons
      table {
        area {
          currentCapacity
          maxCapacity
          availableCapacity
        }
      }
    }
  }
`;

export default function useReservationModal(): [
  (reservation: TableRowFragment) => void,
  React.ReactElement,
] {
  const [reservation, setReservation] = useState<TableRowFragment | null>(null);
  const [checkIn, {loading}] = useCheckInMutation({});

  useEffect(() => {});

  const onClear = useCallback(() => {
    confirm({
      title: `Reservierung #${reservation?.id} stornieren`,
      icon: <ExclamationCircleOutlined />,
      content: 'text',
      okButtonProps: {
        danger: true,
      },
      okText: 'Stornieren',
      cancelText: 'Abbrechen',
      onOk() {},
    });
  }, [reservation]);

  const handleOk = () => {
    setReservation(null);
  };

  const handleCancel = () => {
    setReservation(null);
  };

  let content = null;

  if (reservation) {
    content = (
      <>
        {reservation.startTime.toLocaleTimeString('de', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Berlin',
        })}{' '}
        bis{' '}
        {reservation.endTime.toLocaleTimeString('de', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Berlin',
        })}{' '}
        Uhr
        <br />
        {reservation.primaryPerson}, {reservation.otherPersons.join(', ')}
        <br />
        <Rate
          value={reservation.checkedInPersons}
          count={10}
          character={({index}) => <span>{index + 1}</span>}
          onChange={(persons) => {
            checkIn({
              variables: {
                id: reservation.id,
                persons,
              },
            });
          }}
        />
        <br />
      </>
    );
  }

  return [
    setReservation,
    <Modal
      title={
        reservation ? `#${reservation.id}: ${reservation.primaryPerson}` : ''
      }
      visible={Boolean(reservation)}
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
