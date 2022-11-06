import {Button, Input, Spin, Table, Tooltip} from 'antd';
import {useRouter} from 'next/router';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {useCardInfoQuery} from '../../types/graphql';
import RelativeDate from '../../components/shared/RelativeDate';
import currencyFormatter from '../../utils/currencyFormatter';

gql`
  query CardInfo($cardID: ID!) {
    config {
      depositValue
    }
    node(id: $cardID) {
      ... on Card {
        id
        transactions {
          balanceTotal
          data {
            clientId
            transactionType
            balanceAfter
            balanceBefore
            depositAfter
            depositBefore
            deviceTime
            Order {
              total
              items {
                amount
                name
                productList {
                  emoji
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function CardInfo() {
  const router = useRouter();
  const {id} = router.query;
  const {data, loading} = useCardInfoQuery({
    variables: {cardID: `Card:${String(id).toUpperCase().replace(/:/g, '')}`},
    skip: !id,
  });

  const card = data?.node?.__typename === 'Card' ? data.node : undefined;

  return (
    <Page
      title={`Karte ${id ?? ''}`}
      accessory={
        !id && (
          <form
            name="horizontal_login"
            method="GET"
            action=""
            style={{display: 'flex'}}
          >
            <Input placeholder="Karten-ID" name="id" id="id" width="50%" />
            <Button type="primary" htmlType="submit">
              Anzeigen
            </Button>
          </form>
        )
      }
    >
      {loading && <Spin />}
      {card && (
        <Table
          pagination={false}
          size="small"
          rowKey={(r) => String(r.clientId)}
          columns={[
            {
              title: 'Bude',
              render: (_, r) => {
                const productList = r.Order[0]?.items[0]?.productList;
                if (productList) {
                  return (
                    <Tooltip
                      title={r.Order[0].items.map((i) => (
                        <div>
                          {i.amount}× {i.name}
                        </div>
                      ))}
                      placement="right"
                    >
                      {productList.emoji}&nbsp;
                      {productList.name}
                    </Tooltip>
                  );
                } else if (r.transactionType === 'TopUp') {
                  return 'Aufladung';
                } else if (r.transactionType === 'Cashout') {
                  return 'Auszahlung';
                } else if (r.transactionType === 'Charge') {
                  return 'Abbuchung';
                }
              },
            },
            {
              title: 'Zeit',
              dataIndex: 'deviceTime',
              render: (r) => <RelativeDate date={r} />,
            },
            {
              title: 'Pfand',
              render: (_, r) => {
                const deposit = r.depositAfter - r.depositBefore;
                if (deposit < 0) {
                  return `${deposit * -1}× Rückgabe`;
                } else if (deposit > 0) {
                  return `${deposit}× Pfandmarke`;
                }
              },
            },
            {
              title: 'Betrag',
              align: 'right',
              render: (_, r) =>
                currencyFormatter.format(
                  (r.balanceAfter -
                    r.balanceBefore +
                    (r.depositAfter - r.depositBefore) *
                      data!.config.depositValue) /
                    100,
                ),
            },
          ]}
          dataSource={card.transactions.data ?? []}
        />
      )}
    </Page>
  );
}
