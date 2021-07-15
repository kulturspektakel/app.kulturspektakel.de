import {gql} from '@apollo/client';
import {Badge, List, Select, Table, Tag} from 'antd';
import {differenceInMinutes, isAfter, isBefore, isToday} from 'date-fns';
import Head from 'next/head';
import React, {useState} from 'react';
import {useEffect} from 'react';
import Page from '../../components/shared/Page';
import {
  OverviewReservationFragment,
  useOverviewQuery,
} from '../../types/graphql';
import styles from './overview.module.css';
import {DAYS} from './[...day]';

gql`
  fragment OverviewReservation on Reservation {
    id
    status
    startTime
    endTime
    primaryPerson
    otherPersons
  }

  query Overview($area: ID!, $day: Date!) {
    areas {
      id
      displayName
    }
    node(id: $area) {
      ... on Area {
        table {
          id
          displayName
          maxCapacity
          reservations(day: $day) {
            id
            ...OverviewReservation
          }
        }
      }
    }
  }
`;

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const ref = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(ref);
  }, [now, setNow]);

  return now;
}

export default function Overlap() {
  const now = useNow();
  const [area, setArea] = useState('gb');
  const [day, setDay] = useState(DAYS.find((d) => isToday(d)) ?? DAYS[0]);
  const {data} = useOverviewQuery({
    variables: {
      area: `Area:${area}`,
      day,
    },
    pollInterval: 10000,
  });

  return (
    <Page>
      <Head>
        <title>Übersicht · Reservierungen</title>
      </Head>
      <div className={styles.row}>
        <Select
          className={styles.select}
          dropdownMatchSelectWidth={false}
          onChange={(d) => setDay(new Date(d))}
          value={day.toDateString()}
        >
          {DAYS.map((d) => (
            <Select.Option key={d.toDateString()} value={d.toDateString()}>
              {d.toLocaleDateString('de', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
              })}
            </Select.Option>
          ))}
        </Select>
        <Select
          className={styles.select}
          value={area}
          dropdownMatchSelectWidth={false}
          onChange={(a) => setArea(a.toString())}
        >
          {data?.areas.map((a) => (
            <Select.Option key={a.id} value={a.id}>
              {a.displayName}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table
        rowKey="id"
        columns={[
          {title: 'Name', dataIndex: 'displayName'},
          {title: 'Plätze', dataIndex: 'maxCapacity'},
          {
            title: 'Status',
            align: 'right',
            render: (_, r) => {
              const currentReservation = r.reservations.find(
                (r) => isAfter(r.startTime, now) && isBefore(r.endTime, now),
              );
              if (!currentReservation) {
                const nextReservation = r.reservations.find((r) =>
                  isAfter(r.startTime, now),
                );

                const freeUntil = nextReservation
                  ? differenceInMinutes(nextReservation.startTime, now)
                  : null;

                const label =
                  freeUntil && freeUntil < 240
                    ? `${freeUntil}min frei`
                    : 'frei';

                return (
                  <Tag color="success" className={styles.tag}>
                    {label}
                  </Tag>
                );
              } else if (
                currentReservation &&
                currentReservation.status == 'CheckedIn'
              ) {
                const timeLeft = differenceInMinutes(
                  currentReservation.endTime,
                  now,
                );
                return (
                  <Tag className={styles.tag} color="red">
                    {timeLeft < 60 ? `noch ${timeLeft}min` : 'belegt'}
                  </Tag>
                );
              } else {
                return (
                  <Tag className={styles.tag} color="warning">
                    gebucht
                  </Tag>
                );
              }
            },
          },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <TableDetails reservations={record.reservations} now={now} />
          ),
          expandRowByClick: true,
          expandIconColumnIndex: -1,
        }}
        loading={!data}
        dataSource={data?.node.__typename === 'Area' ? data.node.table : []}
        pagination={false}
      />
    </Page>
  );
}

function TableDetails({
  now,
  reservations,
}: {
  now: Date;
  reservations: OverviewReservationFragment[];
}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reservations}
      locale={{emptyText: 'Keine Reservierungen'}}
      renderItem={(r) => (
        <List.Item>
          <List.Item.Meta
            style={{opacity: isAfter(now, r.endTime) ? 0.5 : 1}}
            avatar={<Badge color="success" />}
            title={`#${r.id}: ${r.startTime.toLocaleTimeString('de', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Berlin',
            })} 
              bis 
              ${r.endTime.toLocaleTimeString('de', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Berlin',
              })} Uhr, ${r.otherPersons.length + 1} Personen`}
            description={[r.primaryPerson, ...r.otherPersons].join(', ')}
          />
        </List.Item>
      )}
    />
  );
}
