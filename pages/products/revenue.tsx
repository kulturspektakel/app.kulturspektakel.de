import {ConfigProvider, DatePicker, PageHeader, Table} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {useRevenueQuery} from '../../types/graphql';
import moment from 'moment';
import RevenueDetails from '../../components/products/RevenueDetails';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import de_DE from 'antd/lib/locale-provider/de_DE';

const {RangePicker} = DatePicker;

const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

gql`
  query Revenue($after: DateTime!, $before: DateTime!) {
    productLists {
      id
      name
      salesNumbers(after: $after, before: $before) {
        count
        total
      }
    }
  }
`;

export default function Revenue() {
  const router = useRouter();

  const [range, setRange] = useState<[moment.Moment, moment.Moment]>([
    moment(router.query.after),
    moment(router.query.before),
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

  return (
    <Page>
      <PageHeader
        title="Umsätze"
        extra={
          <ConfigProvider locale={de_DE}>
            <RangePicker
              format="DD.MM.YYYY HH:mm"
              allowEmpty={[true, true]}
              showTime
              onChange={setRange}
              value={range}
            />
          </ConfigProvider>
        }
      ></PageHeader>
      <Table
        loading={loading}
        pagination={false}
        columns={[
          {title: 'Name', dataIndex: 'name'},
          {
            title: 'Verkäufe',
            align: 'right',
            render: (r) => r.salesNumbers.count,
          },
          {
            title: 'Umsatz',
            align: 'right',
            render: (r) => formatter.format(r.salesNumbers.total),
          },
        ]}
        dataSource={data?.productLists}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <RevenueDetails
              productListId={record.id}
              before={range[1].toDate()}
              after={range[0].toDate()}
            />
          ),
        }}
      />
    </Page>
  );
}
