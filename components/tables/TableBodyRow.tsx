import styles from './TableBodyRow.module.css';
import TableRowStyles from './TableRow.module.css';
import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {OpeningHour, SlotsQuery} from '../../types/graphql';
import {add, differenceInMinutes, isBefore, isEqual} from 'date-fns';
import {UserOutlined} from '@ant-design/icons';
import {SLOT_LENGTH_MIN, SLOT_LENGTH_PX} from './Slots';
import cx from 'classnames';
import TableRow, {FirstTableCell} from './TableRow';
import isAfter from 'date-fns/isAfter';
import StatusBadge from './StatusBadge';
import {Badge} from 'antd';
import {useCallback} from 'react';
import {PresetStatusColorType} from 'antd/lib/_util/colors';
import {useEffect} from 'react';

gql`
  fragment TableRow on Reservation {
    id
    startTime
    endTime
    primaryPerson
    otherPersons
    status
    checkedInPersons
    token
  }
`;

export default function TableBodyRow(props: {
  table: SlotsQuery['areas'][number]['table'][number];
  area: SlotsQuery['areas'][number];
  maxCapacity: number;
  startTime: Date;
  endTime: Date;
  editReservation: (token: string) => void;
  createReservation: (tableId: string, time: Date) => void;
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
          onClick={() => props.editReservation(reservation.token)}
        >
          <div className={styles.bookingTitle}>
            <strong>
              #{reservation.id}: {reservation.primaryPerson}
            </strong>
            <StatusBadge
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
      const notOpen = isClosed(props.area.openingHour, time);

      if (notOpen) {
        const nextOpen = props.area.openingHour.reduce<Date | null>(
          (acc, {startTime}) =>
            isAfter(startTime, time) &&
            (acc == null || isBefore(startTime, acc))
              ? startTime
              : acc,
          null,
        );
        const newTime = nextOpen ?? props.endTime;
        const length = differenceInMinutes(newTime, time) / SLOT_LENGTH_MIN;
        width *= length;
        time = newTime;

        content = <div className={styles.disabled} />;
      } else {
        content = (
          <a
            className={styles.cellInner}
            onClick={() => props.createReservation(props.table.id, time)}
          />
        );
        time = add(time, {minutes: SLOT_LENGTH_MIN});
      }
    }
    slots.push(
      <div
        className={TableRowStyles.cell}
        style={{width}}
        key={time.toString()}
      >
        {content}
      </div>,
    );
  }

  return (
    <TableRow
      endTime={props.endTime}
      startTime={props.startTime}
      firstCell={
        <FirstTableBodyCell
          area={props.area}
          table={props.table}
          maxCapacity={props.maxCapacity}
          endTime={props.endTime}
          startTime={props.startTime}
        />
      }
      cells={slots}
    />
  );
}

function isClosed(
  hours: Array<Pick<OpeningHour, 'startTime' | 'endTime'>>,
  time: Date = new Date(),
): boolean {
  return hours.every(
    ({startTime, endTime}) =>
      isBefore(time, startTime) || !isAfter(endTime, time),
  );
}

function FirstTableBodyCell(props: {
  table: SlotsQuery['areas'][number]['table'][number];
  area: SlotsQuery['areas'][number];
  maxCapacity: number;
  startTime: Date;
  endTime: Date;
}) {
  const calcStatus = useCallback((): PresetStatusColorType => {
    const now = new Date();
    if (isClosed(props.area.openingHour)) {
      return 'error';
    } else if (
      props.table.reservations.some(
        (r) => r.status === 'CheckedIn' && isBefore(now, r.endTime),
      )
    ) {
      return 'error';
    }

    const in15Min = add(now, {
      minutes: 15,
    });
    if (
      props.table.reservations.some(
        (r) => isAfter(in15Min, r.startTime) && isBefore(now, r.endTime),
      )
    ) {
      return 'warning';
    }
    return 'success';
  }, []);

  const [status, setStatus] = useState<PresetStatusColorType>(calcStatus());
  useEffect(() => {
    const i = setInterval(() => setStatus(calcStatus()), 10000);
    return () => clearInterval(i);
  }, [setStatus, calcStatus]);

  return (
    <FirstTableCell style={{borderLeftColor: props.area.themeColor}}>
      <Badge status={status} text={props.table.displayName} />
      <div className={styles.tableNameInfo}>
        {props.maxCapacity}&nbsp;Plätze
      </div>
    </FirstTableCell>
  );
}
