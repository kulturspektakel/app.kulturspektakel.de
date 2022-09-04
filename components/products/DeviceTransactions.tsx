import {Spin, Table} from 'antd';
import {gql} from '@apollo/client';
import {
  CardTransactionType,
  useDeviceTransactionsQuery,
} from '../../types/graphql';
import currencyFormatter from '../../utils/currencyFormatter';
import RelativeDate from '../shared/RelativeDate';
import styles from './DeviceTransactions.module.css';
import {
  LoginOutlined,
  LogoutOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

gql`
  query DeviceTransactions($deviceID: ID!) {
    node(id: $deviceID) {
      ... on Device {
        transactions(limit: 25) {
          data {
            deviceTime
            balanceAfter
            balanceBefore
            depositBefore
            depositAfter
            cardId
            transactionType
          }
        }
      }
    }
  }
`;

export default function DeviceTransactions(props: {deviceID: string}) {
  const {loading, data} = useDeviceTransactionsQuery({
    variables: {
      deviceID: `Device:${props.deviceID}`,
    },
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }
  if (data?.node?.__typename !== 'Device') {
    throw new Error('wrong __typename');
  }
  return (
    <Table
      className={styles.root}
      size="small"
      pagination={false}
      dataSource={data.node.transactions.data}
      scroll={{y: 255}}
      columns={[
        {
          title: 'Zeit',
          dataIndex: 'deviceTime',
          render: (r) => <RelativeDate date={r} />,
        },
        {title: 'Karten ID', dataIndex: 'cardId'},
        {
          title: 'Transaktion',
          dataIndex: 'transactionType',
          render: (r: CardTransactionType) => {
            switch (r) {
              case 'Charge':
                return (
                  <div className={styles.charge}>
                    <LogoutOutlined />
                    &nbsp;Abbuchung
                  </div>
                );
              case 'TopUp':
                return (
                  <div className={styles.topup}>
                    <LoginOutlined />
                    &nbsp;Aufladung
                  </div>
                );
              case 'Cashout':
                return (
                  <div className={styles.cashout}>
                    <PoweroffOutlined />
                    &nbsp;Auszahlung
                  </div>
                );
              default:
                return r;
            }
          },
        },
        {
          title: 'Betrag',
          align: 'right',
          render: (r, {transactionType}) => {
            let val = (r.balanceBefore - r.balanceAfter) / 100;
            if (transactionType === 'TopUp') {
              val *= -1;
            }
            return currencyFormatter.format(val);
          },
        },
        {
          title: 'Pfand',
          render: (r) => {
            const d = r.depositBefore - r.depositAfter;
            if (d === 0) {
              return null;
            } else if (d > 0) {
              return `${d}× Pfandrückgabe`;
            } else {
              return `${Math.abs(d)}× Pfand`;
            }
          },
        },
      ]}
    />
  );
}
