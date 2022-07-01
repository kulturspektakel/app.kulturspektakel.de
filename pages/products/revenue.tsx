import {ConfigProvider, DatePicker, PageHeader, Select} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {useRevenueQuery} from '../../types/graphql';
import moment from 'moment';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import de_DE from 'antd/lib/locale-provider/de_DE';
import {isEqual, endOfDay, startOfDay} from 'date-fns';
import {RangeValue} from 'rc-picker/lib/interface';
import RevenueTable from '../../components/products/RevenueTable';

const {RangePicker} = DatePicker;

gql`
  query Revenue($after: DateTime!, $before: DateTime!) {
    events {
      id
      name
      start
      end
    }
    productLists {
      id
      name
      salesNumbers(after: $after, before: $before) {
        count
        total
        payment
      }
    }
  }
`;

export default function Revenue() {
  const router = useRouter();
  const [range, setRange] = useState<RangeValue<moment.Moment>>([
    moment(router.query.after ?? startOfDay(new Date())),
    moment(router.query.before ?? endOfDay(new Date())),
  ]);

  useEffect(() => {
    const before = range[1].toISOString();
    const after = range[0].toISOString();

    if (before != router.query.before || after != router.query.after) {
      router.replace({
        pathname: router.pathname,
        query: {
          before: range[1].toISOString(),
          after: range[0].toISOString(),
        },
      });
    }
  }, [range, router]);

  const {data, loading} = useRevenueQuery({
    variables: {
      after: range[0].toDate(),
      before: range[1].toDate(),
    },
  });

  const eventPickerValue = data?.events.find(
    (e) =>
      isEqual(e.start, range[0].toDate()) && isEqual(e.end, range[1].toDate()),
  );

  return (
    <Page>
      <PageHeader
        title="Umsätze"
        extra={
          <ConfigProvider locale={de_DE}>
            <Select
              onChange={(id) => {
                const event = data?.events.find((e) => e.id === id);
                if (event) {
                  setRange([moment(event.start), moment(event.end)]);
                }
              }}
              dropdownMatchSelectWidth={false}
              value={eventPickerValue?.id ?? 'Veranstaltung auswählen'}
            >
              {data?.events.map((e) => (
                <Select.Option value={e.id} key={e.id}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
            &nbsp;
            <RangePicker
              format="DD.MM.YYYY HH:mm"
              allowEmpty={[true, true]}
              showTime
              onChange={setRange}
              value={range as any}
            />
          </ConfigProvider>
        }
      ></PageHeader>
      <RevenueTable
        loading={loading}
        productLists={data?.productLists}
        range={range as any}
      />
    </Page>
  );
}
