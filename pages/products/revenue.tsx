import {DatePicker, PageHeader, Table} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {useRevenueQuery} from '../../types/graphql';
import moment from 'moment';

const {RangePicker} = DatePicker;

const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

gql`
  query Revenue($after: DateTime, $before: DateTime) {
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
  const [range, setRange] = useState<[moment.Moment, moment.Moment]>([
    moment().startOf('day'),
    moment().endOf('day'),
  ]);
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
          <RangePicker
            format="DD.MM.YYYY HH:mm"
            allowEmpty={[true, true]}
            showTime
            onChange={setRange}
            value={range}
          />
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
      />
    </Page>
  );
}
