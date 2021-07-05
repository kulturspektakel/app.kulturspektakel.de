import React from 'react';
import Page from '../../components/shared/Page';
import {isSameDay} from 'date-fns';
import Slots from '../../components/tables/Slots';
import {useRouter} from 'next/dist/client/router';
import Head from 'next/head';

export const DAYS = [
  new Date('2021-07-23'),
  new Date('2021-07-24'),
  new Date('2021-07-25'),
];

export default function Tables() {
  const {query} = useRouter();

  const day = new Date(String(query.day));

  return (
    <Page>
      <Head>
        <title>
          {day.toLocaleDateString('de', {
            weekday: 'long',
          })}{' '}
          · Reservierungen
        </title>
      </Head>
      <Slots day={DAYS.find((d) => isSameDay(d, day)) ?? DAYS[0]} />
    </Page>
  );
}
