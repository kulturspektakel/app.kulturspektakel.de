import styles from './Slots.module.css';
import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {SlotsQuery, useSlotsQuery} from '../../types/graphql';
import {add, min, max, isAfter, isBefore, isEqual, sub} from 'date-fns';
import TableRow, {FirstTableCell} from './TableRow';
import useReservationModal from './useReservationModal';
import NowIndicator from './NowIndicator';
import TableBodyRow from './TableBodyRow';
import {Select, Statistic, Tooltip} from 'antd';
import {HEADER_HEIGHT} from '../shared/Page';
import useCreateModal from './useCreateModal';
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';

export const SLOT_LENGTH_MIN = 30;
export const SLOT_LENGTH_PX = 80;

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
  const [createReservation, createModal] = useCreateModal();
  const [areaFilter, setAreaFilter] = useState('all');

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
    <div className={styles.table}>
      {reservationModal}
      {createModal}
      <NowIndicator startTime={startTime} endTime={endTime} />
      <TableRow
        style={{top: HEADER_HEIGHT}}
        firstCell={
          <FirstTableCell>
            <Select
              className={styles.areaFilter}
              value={areaFilter}
              onChange={(value) => setAreaFilter(value)}
              dropdownMatchSelectWidth={false}
            >
              <Select.Option value="all">alle Bereiche</Select.Option>
              {data?.areas.map((a) => (
                <Select.Option key={a.id} value={a.id}>
                  {a.displayName}
                </Select.Option>
              ))}
            </Select>
          </FirstTableCell>
        }
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

      {data?.areas
        .filter((a) => (areaFilter === 'all' ? true : areaFilter === a.id))
        .flatMap((a) =>
          a.table.map((t) => (
            <TableBodyRow
              key={t.id}
              table={t}
              startTime={startTime}
              endTime={endTime}
              editReservation={editReservation}
              createReservation={createReservation}
              maxCapacity={t.maxCapacity}
              area={a}
            />
          )),
        )}
      <TableRow
        style={{bottom: 43, boxShadow: `0 -1px 0 #f0f0f0`}}
        firstCell={<FirstTableCell>Personen</FirstTableCell>}
        startTime={startTime}
        endTime={endTime}
        cellRenderer={(i) => {
          return (
            <>
              <Tooltip title="Eingecheckt">
                {checkedInPersons(
                  add(startTime, {
                    minutes: SLOT_LENGTH_MIN * i,
                  }),
                  data,
                  areaFilter,
                )}
              </Tooltip>
              /
              <Tooltip title="Reserviert">
                {getReservations(
                  add(startTime, {
                    minutes: SLOT_LENGTH_MIN * i,
                  }),
                  data,
                  areaFilter,
                ).reduce((acc, cv) => acc + cv.otherPersons.length + 1, 0)}
              </Tooltip>
            </>
          );
        }}
      />
      <TableRow
        style={{bottom: 0}}
        firstCell={<FirstTableCell>Tische</FirstTableCell>}
        startTime={startTime}
        endTime={endTime}
        cellRenderer={(i) =>
          getReservationInout(
            add(startTime, {
              minutes: SLOT_LENGTH_MIN * i,
            }),
            data,
            areaFilter,
          )
        }
      />
    </div>
  );
}

function getReservationInout(time: Date, data: SlotsQuery, areaFilter: string) {
  const starting =
    data?.areas
      .flatMap((a) =>
        a.table.flatMap((t) =>
          t.reservations.map((r) => ({...r, areaId: a.id})),
        ),
      )
      .filter(
        (r) =>
          (areaFilter === 'all' || r.areaId === areaFilter) &&
          isEqual(r.startTime, time),
      ) ?? [];

  const ending =
    data?.areas
      .flatMap((a) =>
        a.table.flatMap((t) =>
          t.reservations.map((r) => ({...r, areaId: a.id})),
        ),
      )
      .filter(
        (r) =>
          (areaFilter === 'all' || r.areaId === areaFilter) &&
          isEqual(r.endTime, time),
      ) ?? [];

  return (
    <>
      <Tooltip title="Gehende Reservierungen">
        <Statistic
          value={ending.length}
          valueStyle={{color: '#f5222d', fontSize: '1em'}}
          prefix={<LogoutOutlined style={{marginRight: -3}} />}
        />
      </Tooltip>
      &nbsp;&nbsp;
      <Tooltip title="Kommende Reservierungen">
        <Statistic
          value={starting.length}
          valueStyle={{color: '#52c41a', fontSize: '1em'}}
          prefix={<LoginOutlined style={{marginRight: -3}} />}
        />
      </Tooltip>
    </>
  );
}

function getReservations(
  time: Date,
  data: SlotsQuery,
  areaFilter: string,
): SlotsQuery['areas'][number]['table'][number]['reservations'] {
  return (
    data?.areas
      .flatMap((a) =>
        a.table.flatMap((t) =>
          t.reservations.map((r) => ({...r, areaId: a.id})),
        ),
      )
      .filter(
        (r) =>
          (areaFilter === 'all' || r.areaId === areaFilter) &&
          !isAfter(r.startTime, time) &&
          isBefore(time, r.endTime),
      ) ?? []
  );
}

function checkedInPersons(
  time: Date,
  data: SlotsQuery,
  areaFilter: string,
): number {
  return (
    data?.areas
      .flatMap((a) =>
        a.table.flatMap((t) =>
          t.reservations.map((r) => ({...r, areaId: a.id})),
        ),
      )
      .filter(
        (r) =>
          r.checkInTime &&
          (areaFilter === 'all' || r.areaId === areaFilter) &&
          !isBefore(time, r.startTime) &&
          isBefore(r.checkInTime, add(time, {minutes: SLOT_LENGTH_MIN})) &&
          isBefore(time, r.endTime),
      )
      .reduce((acc, cv) => acc + cv.checkedInPersons, 0) ?? 0
  );
}
