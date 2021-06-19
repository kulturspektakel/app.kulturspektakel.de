import styles from './Slots.module.css';
import React from 'react';
import {gql} from '@apollo/client';
import {SlotsQuery, useSlotsQuery} from '../../types/graphql';
import {add, min, max, isAfter, isBefore} from 'date-fns';
import TableRow, {FirstTableCell} from './TableRow';
import useReservationModal from './useReservationModal';
import Numbers from './Numbers';
import NowIndicator from './NowIndicator';
import TableBodyRow from './TableBodyRow';

export const SLOT_LENGTH_MIN = 30;
export const SLOT_LENGTH_PX = 100;

gql`
  query Slots($day: Date) {
    areas {
      id
      displayName
      themeColor
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
    }
  }
`;

export default function Slots({day}: {day: Date}) {
  const {data} = useSlotsQuery({
    variables: {
      day,
    },
    pollInterval: 10000,
  });

  const [editReservation, reservationModal] = useReservationModal();

  if (!data) {
    return null;
  }

  const startTime = min(
    data?.areas.flatMap((a) => a.openingHour.map((a) => a.startTime)) ?? [],
  );
  const endTime = max(
    data?.areas.flatMap((a) => a.openingHour.map((a) => a.endTime)) ?? [],
  );
  return (
    <>
      {/* <Numbers data={data.node} /> */}
      <div className={styles.table}>
        {reservationModal}
        <NowIndicator startTime={startTime} endTime={endTime} />
        <TableRow
          firstCell={<FirstTableCell />}
          startTime={startTime}
          endTime={endTime}
          cellRenderer={(i) => (
            <div className={styles.th}>
              {add(startTime, {
                minutes: SLOT_LENGTH_MIN * i,
              }).toLocaleTimeString('de', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Berlin',
              })}
            </div>
          )}
        />

        {data?.areas.flatMap((a) =>
          a.table.map((t) => (
            <TableBodyRow
              key={t.id}
              table={t}
              startTime={startTime}
              endTime={endTime}
              editReservation={editReservation}
              maxCapacity={t.maxCapacity}
              area={a}
            />
          )),
        )}
        <TableRow
          firstCell={<FirstTableCell>Eingecheckt</FirstTableCell>}
          startTime={startTime}
          endTime={endTime}
          cellRenderer={(i) =>
            getReservations(
              add(startTime, {
                minutes: SLOT_LENGTH_MIN * i,
              }),
              data,
            ).reduce((acc, cv) => acc + cv.checkedInPersons, 0)
          }
        />
        <TableRow
          firstCell={<FirstTableCell>Reserviert</FirstTableCell>}
          startTime={startTime}
          endTime={endTime}
          cellRenderer={(i) =>
            getReservations(
              add(startTime, {
                minutes: SLOT_LENGTH_MIN * i,
              }),
              data,
            ).reduce((acc, cv) => acc + cv.otherPersons.length + 1, 0)
          }
        />
        <TableRow
          firstCell={<FirstTableCell>Verfügbar</FirstTableCell>}
          startTime={startTime}
          endTime={endTime}
          cellRenderer={(i) =>
            getReservations(
              add(startTime, {
                minutes: SLOT_LENGTH_MIN * i,
              }),
              data,
            ).reduce((acc, cv) => 0, 0)
          }
        />
      </div>
    </>
  );
}

function getReservations(
  time: Date,
  data: SlotsQuery,
): SlotsQuery['areas'][number]['table'][number]['reservations'] {
  return (
    data?.areas
      .flatMap((a) => a.table.flatMap((t) => t.reservations))
      .filter(
        (r) =>
          !isAfter(r.startTime, time) &&
          isBefore(time, r.endTime) &&
          r.status !== 'Cleared',
      ) ?? []
  );
}
