import styles from './Slots.module.css';
import TableRowStyles from './TableRow.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {useSlotsQuery} from '../../types/graphql';
import {add, differenceInMinutes} from 'date-fns';
import TableRow from './TableRow';
import cx from 'classnames';
import useReservationModal from './useReservationModal';
import Numbers from './Numbers';

export const SLOT_LENGTH_MIN = 30;
export const SLOT_LENGTH_PX = 100;

gql`
  query Slots($areaId: ID!, $day: Date) {
    node(id: $areaId) {
      ... on Area {
        id
        table {
          id
          displayName
          maxCapacity
          reservations(day: $day) {
            ...TableRow
          }
        }
        openingHour(day: $day) {
          startTime
          endTime
        }
        ...Numbers
      }
    }
  }
`;

export default function Slots({area, day}: {area: string; day: Date}) {
  const {data} = useSlotsQuery({
    variables: {
      areaId: `Area:${area}`,
      day,
    },
    pollInterval: 10000,
  });

  const [editReservation, reservationModal] = useReservationModal();

  if (!data) {
    return null;
  }

  const startTime = data?.node.openingHour[0].startTime;
  const endTime = data?.node.openingHour[0].endTime;

  return (
    <>
      <Numbers data={data.node} />
      <div className={styles.table}>
        {reservationModal}
        <div className={TableRowStyles.row}>
          <div className={TableRowStyles.tableName} />

          {Array(differenceInMinutes(endTime, startTime) / SLOT_LENGTH_MIN)
            .fill(null)
            .map((_, i) => (
              <div
                className={cx(TableRowStyles.cell, styles.thead)}
                style={{width: SLOT_LENGTH_PX}}
                key={i}
              >
                {i === 0 && <Now startTime={startTime} />}
                <div className={styles.th}>
                  {add(startTime, {
                    minutes: SLOT_LENGTH_MIN * i,
                  }).toLocaleTimeString('de', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Berlin',
                  })}
                </div>
              </div>
            ))}
        </div>
        {data?.node.table.map((t) => (
          <TableRow
            key={t.id}
            table={t}
            startTime={startTime}
            endTime={endTime}
            editReservation={editReservation}
            maxCapacity={t.maxCapacity}
          />
        ))}
      </div>
    </>
  );
}

function Now(props: {startTime: Date}) {
  const calcLeft = useCallback(() => {
    return differenceInMinutes(new Date(), props.startTime);
  }, [props.startTime]);

  const [left, setLeft] = useState(calcLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft(calcLeft());
    }, 60000);
    return () => clearInterval(interval);
  }, [calcLeft]);

  return <div className={styles.now} style={{left}} />;
}
