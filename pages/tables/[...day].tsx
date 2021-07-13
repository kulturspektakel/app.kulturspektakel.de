import React, {useEffect} from 'react';
import Page from '../../components/shared/Page';
import {isSameDay} from 'date-fns';
import Slots from '../../components/tables/Slots';
import {useRouter} from 'next/dist/client/router';
import Head from 'next/head';
import {notification} from 'antd';

export const DAYS = [
  new Date('2021-07-23'),
  new Date('2021-07-24'),
  new Date('2021-07-25'),
];

export default function Tables() {
  const {query} = useRouter();

  const day = new Date(String(query.day));

  useEffect(() => {
    const goOffline = () =>
      notification.error({
        message: 'Internetverbindung verloren',
        duration: 0,
      });

    const goOnline = () => {
      notification.destroy();
      notification.success({
        message: 'Internet verbunden',
      });
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

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
