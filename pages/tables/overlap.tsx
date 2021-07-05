import {gql} from '@apollo/client';
import {Badge, Table, Tooltip} from 'antd';
import {isAfter, isBefore} from 'date-fns';
import isSameDay from 'date-fns/isSameDay';
import Head from 'next/head';
import React from 'react';
import Page from '../../components/shared/Page';
import {OverlapQuery, useOverlapQuery} from '../../types/graphql';
import styles from './overlap.module.css';
import {DAYS} from './[...day]';

gql`
  query Overlap {
    reservationsByPerson {
      email
      reservations {
        id
        status
        startTime
        endTime
        otherPersons
        primaryPerson
        table {
          id
          displayName
          area {
            id
            displayName
          }
        }
      }
    }
  }
`;

export default function Overlap() {
  const {data} = useOverlapQuery({});

  return (
    <Page>
      <Head>
        <title>Überlappungen · Reservierungen</title>
      </Head>
      <Table
        rowKey="email"
        columns={[
          {title: 'E-Mail', dataIndex: 'email'},
          {
            title: 'Reservierungen',
            align: 'right',
            render: (r) => r.reservations.length,
            sorter: (a, b) => a.reservations.length - b.reservations.length,
          },
          {
            title: 'Überlappungen',
            align: 'right',
            render: (r) => overlaps(r.reservations),
          },
          {
            title: 'Tage',
            render: (r) => <Days reservations={r.reservations} />,
          },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <PersonRow reservations={record.reservations} />
          ),
        }}
        loading={!data}
        dataSource={data?.reservationsByPerson ?? []}
        pagination={false}
      />
    </Page>
  );
}

function overlaps(
  reservations: OverlapQuery['reservationsByPerson'][number]['reservations'],
): number {
  let overlaps = 0;
  for (let i = 0; i < reservations.length - 1; i++) {
    // This is where you'll capture that last value
    for (let j = i + 1; j < reservations.length; j++) {
      if (
        isBefore(reservations[j].startTime, reservations[i].endTime) &&
        isAfter(reservations[j].endTime, reservations[i].startTime)
      ) {
        overlaps++;
      }
    }
  }

  return overlaps;
}

type Res = OverlapQuery['reservationsByPerson'][number]['reservations'][number];

function PersonRow({reservations}: {reservations: Res[]}) {
  return (
    <Table
      pagination={false}
      showHeader={false}
      rowKey="id"
      size="small"
      rowClassName={styles.tableRow}
      columns={[
        {title: 'ID', render: (r: Res) => `#${r.id}`},
        {title: 'Bühne', render: (r: Res) => r.table.area.displayName},
        {title: 'Tisch', render: (r: Res) => r.table.displayName},
        {
          title: 'Zeit',
          render: (r: Res) =>
            `${r.startTime.toLocaleString('de', {
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Berlin',
            })} bis ${r.endTime.toLocaleTimeString('de', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Berlin',
            })}`,
        },
        {
          title: 'Personen',
          render: (r: Res) => (
            <Tooltip title={[r.primaryPerson, ...r.otherPersons].join(', ')}>
              {r.otherPersons.length + 1} Personen
            </Tooltip>
          ),
        },
      ]}
      dataSource={reservations}
    />
  );
}

function Days({reservations}: {reservations: Res[]}) {
  return (
    <>
      {DAYS.map((d) => (
        <Tooltip
          title={d.toLocaleDateString('de', {
            weekday: 'long',
          })}
        >
          <Badge
            status={
              reservations.some((r) => isSameDay(d, r.startTime))
                ? 'success'
                : 'default'
            }
          />
        </Tooltip>
      ))}
    </>
  );
}
