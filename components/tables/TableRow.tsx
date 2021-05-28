import styles from './TableRow.module.css';
import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {
  ReservationStatus,
  SlotsQuery,
  TableRowFragment,
} from '../../types/graphql';
import {add, differenceInMinutes, isBefore, isEqual, isPast} from 'date-fns';
import {UserOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {SLOT_LENGTH_MIN, SLOT_LENGTH_PX} from './Slots';
import cx from 'classnames';

gql`
  fragment TableRow on Reservation {
    id
    startTime
    endTime
    primaryPerson
    otherPersons
    status
    checkedInPersons
  }
`;

export default function TableRow(props: {
  table: SlotsQuery['node']['table'][number];
  maxCapacity: number;
  startTime: Date;
  endTime: Date;
  editReservation: (reservation: TableRowFragment) => void;
}) {
  const slots = [];
  let time = props.startTime;
  let i = -1;
  while (isBefore(time, props.endTime)) {
    let width = SLOT_LENGTH_PX;
    let content = null;
    if (isEqual(time, props.table.reservations[i + 1]?.startTime ?? -1)) {
      const reservation = props.table.reservations[++i];
      const length =
        differenceInMinutes(reservation.endTime, reservation.startTime) /
        SLOT_LENGTH_MIN;
      width *= length;
      content = (
        <div
          className={cx(styles.booking, styles.cellInner)}
          onClick={() => props.editReservation(reservation)}
        >
          <div className={styles.bookingTitle}>
            <strong>
              #{reservation.id}: {reservation.primaryPerson}
            </strong>
            <Status
              status={reservation.status}
              startTime={reservation.startTime}
              endTime={reservation.endTime}
            />
          </div>
          <UserOutlined />
          &nbsp;
          {reservation.checkedInPersons}/{reservation.otherPersons.length + 1}
          &nbsp;Personen
        </div>
      );
      time = reservation.endTime;
    } else {
      time = add(time, {minutes: SLOT_LENGTH_MIN});
      content = <a className={styles.cellInner} />;
    }
    slots.push(
      <div className={styles.cell} style={{width}} key={time.toString()}>
        {content}
      </div>,
    );
  }

  return (
    <div className={styles.row}>
      <div className={styles.tableName}>
        <strong>Tisch&nbsp;{props.table.displayName}</strong>
        {props.maxCapacity}&nbsp;Plätze
      </div>
      {slots}
    </div>
  );
}

function Status(props: {
  status: ReservationStatus;
  startTime: Date;
  endTime: Date;
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(differenceInMinutes(new Date(), props.startTime));
    }, 10000);
    return () => clearInterval(interval);
  }, [props.startTime]);

  if (isPast(props.endTime)) {
    return <Tag color="red">Abgelaufen</Tag>;
  } else if (props.status === 'CheckedIn') {
    return <Tag color="green">Eingecheckt</Tag>;
  } else if (props.status === 'Confirmed' && time > 15) {
    return <Tag color="gold">Überfällig</Tag>;
  }

  return null;
}
