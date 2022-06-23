import {gql} from '@apollo/client';
import {Spin, Table} from 'antd';
import {TimeGrouping, useRevenueDetailsQuery} from '../../types/graphql';
import styles from './RevenueDetails.module.css';
import {Line} from '@ant-design/plots';
import currencyFormatter from '../../utils/currencyFormatter';

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
        bordered
        rowKey="name"
        columns={[
          {
            title: 'Produkt',
            dataIndex: 'name',
          },

          {
            title: 'Anzahl',
            align: 'right',
            render: (r) => r.salesNumbers.count,
            sorter: (a, b) => a.salesNumbers.count - b.salesNumbers.count,
          },

          {
            title: 'Umsatz',
            align: 'right',
            render: (r) => currencyFormatter.format(r.salesNumbers.total),
            sorter: (a, b) => a.salesNumbers.total - b.salesNumbers.total,
          },
        ]}
      />
      <Line
        data={data.productList.salesNumbers.timeSeries.map(({value, time}) => ({
          value,
          time: time.toLocaleDateString('de', {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            timeZone: 'Europe/Berlin',
          }),
        }))}
        xField="time"
        yField="value"
      />
    </div>
  );
}
