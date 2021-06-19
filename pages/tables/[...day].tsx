import {Select, Spin} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {Content} from 'antd/lib/layout/layout';
import {formatISO, isSameDay, parseISO} from 'date-fns';
import Slots from '../../components/tables/Slots';
import {useRouter} from 'next/dist/client/router';
import {useEffect} from 'react';

const {Option} = Select;

const DAYS = [
  new Date('2021-07-23'),
  new Date('2021-07-24'),
  new Date('2021-07-25'),
];

export default function Tables() {
  const {query, push} = useRouter();
  const [day, setDay] = useState(
    DAYS.find((d) => isSameDay(d, new Date(String(query.day)))) ?? DAYS[0],
  );
  useEffect(() => {
    push(`/tables/${day.toISOString().substr(0, 10)}`);
  }, [day]);

  return (
    <Page>
      <Content style={{padding: 24}}>
        &nbsp;
        <Select
          value={formatISO(day, {
            representation: 'date',
          })}
          onChange={(e) => setDay(parseISO(e + 'T10:00:00'))}
        >
          {DAYS.map((d) => (
            <Option
              value={formatISO(d, {
                representation: 'date',
              })}
              key={d.toString()}
            >
              {d.toLocaleDateString('de', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
              })}
            </Option>
          ))}
        </Select>
        <Content
          style={{
            marginTop: 12,
            borderRadius: 5,
          }}
        >
          {day ? (
            <Slots day={day} />
          ) : (
            <div
              style={{paddingTop: 50, paddingBottom: 50, textAlign: 'center'}}
            >
              <Spin />
            </div>
          )}
        </Content>
      </Content>
    </Page>
  );
}
