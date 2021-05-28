import {Select, Spin} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {useTablesQuery} from '../../types/graphql';
import {Content} from 'antd/lib/layout/layout';
import {formatISO, isSameDay, parseISO} from 'date-fns';
import Slots from '../../components/tables/Slots';

const {Option} = Select;

gql`
  query Tables {
    areas {
      id
      displayName
    }
  }
`;

const DAYS = [
  new Date('2021-07-23'),
  new Date('2021-07-24'),
  new Date('2021-07-25'),
];

export default function Tables() {
  const {data} = useTablesQuery({
    onCompleted: (d) => {
      if (area == null) {
        setArea(d.areas[0].id);
      }
    },
  });
  const [day, setDay] = useState(
    DAYS.find((d) => isSameDay(d, new Date())) ?? DAYS[0],
  );
  const [area, setArea] = useState<string | null>(null);

  return (
    <Page>
      <Content style={{padding: 24}}>
        <Select
          value={area ?? 'Loading...'}
          onChange={(a) => setArea(a)}
          disabled={!data}
        >
          {data?.areas.map((a) => (
            <Option key={a.id} value={a.id}>
              {a.displayName}
            </Option>
          ))}
        </Select>
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
          {area && day ? (
            <Slots area={area} day={day} />
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
