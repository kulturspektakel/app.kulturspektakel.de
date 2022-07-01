import {Table} from 'antd';
import {useMemo} from 'react';
import {Billable, RevenueQuery} from '../../types/graphql';
import currencyFormatter from '../../utils/currencyFormatter';
import {isRevenue} from '../../utils/payments';
import RevenueDetails from './RevenueDetails';
import styles from './RevenueTable.module.css';
import {RangeValue} from 'rc-picker/lib/interface';
import {ColumnType} from 'antd/lib/table';

export default function RevenueTable({
  loading,
  productLists,
  range,
}: {
  range: RangeValue<moment.Moment>;
  loading: boolean;
  productLists: RevenueQuery['productLists'];
}) {
  const dataSource = useMemo(
    () =>
      productLists?.filter((d) => d.salesNumbers.some(({total}) => total > 0)),
    [productLists],
  );

  return (
    <Table
      loading={loading}
      pagination={false}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render: (t) => <strong className={styles.title}>{t}</strong>,
        },
        ...(salesColumns as Array<ColumnType<any>>),
      ]}
      dataSource={dataSource}
      className={styles.table}
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
  );
}

export const salesColumns: Array<ColumnType<Billable>> = [
  {
    title: 'Gesamt',
    width: 100,
    align: 'right' as const,
    render: (_, r) => r.salesNumbers.reduce((acc, cv) => (acc += cv.count), 0),
  },
  {
    title: 'Kostenlos',
    width: 100,
    align: 'right' as const,
    render: (_, r) =>
      r.salesNumbers
        .filter((s) => !isRevenue(s.payment))
        .reduce((acc, cv) => (acc += cv.count), 0),
  },
  {
    title: 'Bezahlt',
    width: 100,
    align: 'right' as const,
    render: (_, r) =>
      r.salesNumbers
        .filter((s) => isRevenue(s.payment))
        .reduce((acc, cv) => (acc += cv.count), 0),
  },
  {
    title: 'Einnahmen',
    width: 120,
    align: 'right' as const,
    render: (_, r) =>
      currencyFormatter.format(
        r.salesNumbers
          .filter((s) => isRevenue(s.payment))
          .reduce((acc, cv) => (acc += cv.total), 0),
      ),
  },
];
