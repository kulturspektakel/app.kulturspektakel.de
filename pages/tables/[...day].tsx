import React from 'react';
import Page from '../../components/shared/Page';
import {isSameDay} from 'date-fns';
import Slots from '../../components/tables/Slots';
import {useRouter} from 'next/dist/client/router';

export const DAYS = [
  new Date('2021-07-23'),
  new Date('2021-07-24'),
  new Date('2021-07-25'),
];

export default function Tables() {
  const {query} = useRouter();

  return (
    <Page>
      <Slots
        day={
          DAYS.find((d) => isSameDay(d, new Date(String(query.day)))) ?? DAYS[0]
        }
      />
    </Page>
  );
}
