import {gql} from '@apollo/client';
import {Spin, Table} from 'antd';
import {
  OrderPayment,
  TimeGrouping,
  useRevenueDetailsQuery,
} from '../../types/graphql';
import styles from './RevenueDetails.module.css';
import {Column} from '@ant-design/plots';
import {useMemo} from 'react';
import {paymentName} from '../../utils/payments';
import {salesColumns} from './RevenueTable';
import {ColumnType} from 'antd/lib/table';

gql`
  query RevenueDetails(
    $id: Int!
    $after: DateTime!
    $before: DateTime!
    $grouping: TimeGrouping!
  ) {
    productList(id: $id) {
      id
      name
      salesNumbers(after: $after, before: $before) {
        timeSeries(grouping: $grouping) {
          time
          value
        }
        payment
      }
      historicalProducts {
        name
        salesNumbers(after: $after, before: $before) {
          count
          total
        }
      }
    }
  }
`;

export default function RevenueDetails({
  productListId,
  before,
  after,
}: {
  productListId: number;
  before: Date;
  after: Date;
}) {
  const {data, loading} = useRevenueDetailsQuery({
    variables: {
      after,
      before,
      id: productListId,
      grouping: TimeGrouping.Hour,
    },
  });

  const chartData = useMemo(
    () =>
      data?.productList.salesNumbers.flatMap(({payment, timeSeries}) =>
        timeSeries.map(({time, value}) => ({
          payment,
          value,
          time: time.toLocaleDateString('de', {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            timeZone: 'Europe/Berlin',
          }),
        })),
      ),
    [data?.productList.salesNumbers],
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <Table
        dataSource={data.productList?.historicalProducts}
        size="small"
        pagination={false}
        rowClassName={styles.row}
        rowKey="name"
        showHeader={false}
        className={styles.innerTable}
        columns={[
          {title: 'Name', dataIndex: 'name', className: styles.productName},
          ...(salesColumns as Array<ColumnType<any>>),
        ]}
      />
      <Column
        className={styles.chart}
        isStack
        seriesField="payment"
        data={chartData}
        xField="time"
        yField="value"
        legend={{
          position: 'bottom',
          itemName: {
            formatter: (t) => paymentName(t as OrderPayment),
          },
        }}
      />
    </div>
  );
}
