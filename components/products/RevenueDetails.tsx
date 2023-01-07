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
import {differenceInHours} from 'date-fns';
import {Datum} from '@ant-design/charts';
import {ColumnType} from 'antd/es/table';

gql`
  query RevenueDetails(
    $id: ID!
    $after: DateTime!
    $before: DateTime!
    $grouping: TimeGrouping!
  ) {
    productList: node(id: $id) {
      ... on ProductList {
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
            payment
          }
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
  productListId: string;
  before: Date;
  after: Date;
}) {
  const {data, loading} = useRevenueDetailsQuery({
    variables: {
      after,
      before,
      id: productListId,
      grouping:
        differenceInHours(before, after) < 100
          ? TimeGrouping.Hour
          : TimeGrouping.Day,
    },
  });

  const productList =
    data?.productList?.__typename === 'ProductList' ? data?.productList : null;

  const chartData = useMemo(
    () =>
      productList?.salesNumbers.flatMap(({payment, timeSeries}) =>
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
    [productList?.salesNumbers],
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
        dataSource={productList?.historicalProducts}
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
      {chartData && (
        <Column
          className={styles.chart}
          isStack
          seriesField="payment"
          data={chartData}
          xField="time"
          yField="value"
          tooltip={{
            // @ts-ignore: https://github.com/ant-design/ant-design-charts/issues/1474
            formatter: (datum: Datum) => ({
              name: paymentName(datum.payment as OrderPayment),
              value: datum.value,
            }),
          }}
          legend={{
            position: 'bottom',
            itemName: {
              formatter: (t) => paymentName(t as OrderPayment),
            },
          }}
        />
      )}
    </div>
  );
}
