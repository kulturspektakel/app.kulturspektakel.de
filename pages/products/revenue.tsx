import {
  Col,
  ConfigProvider,
  DatePicker,
  PageHeader,
  Row,
  Select,
  Statistic,
} from 'antd';
import React, {useMemo, useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {RevenueQuery, useRevenueQuery} from '../../types/graphql';
import moment from 'moment';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import de_DE from 'antd/lib/locale-provider/de_DE';
import {isEqual, endOfDay, startOfDay} from 'date-fns';
import RevenueTable from '../../components/products/RevenueTable';
import currencyFormatter from '../../utils/currencyFormatter';
import {RangeValue} from 'rc-picker/lib/interface';

const {RangePicker} = DatePicker;

gql`
  query Revenue($after: DateTime!, $before: DateTime!) {
    config {
      depositValue
    }
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
    transactions {
      topUps: transactions(after: $after, before: $before, type: TopUp) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      cashouts: transactions(after: $after, before: $before, type: Cashout) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      charges: transactions(after: $after, before: $before, type: Charge) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      transactions(after: $after, before: $before) {
        depositIn
        depositOut
        uniqueCards
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
    const before = range?.[1]?.toISOString();
    const after = range?.[0]?.toISOString();

    if (before != router.query.before || after != router.query.after) {
      router.replace({
        pathname: router.pathname,
        query: {
          before: range?.[1]?.toISOString(),
          after: range?.[0]?.toISOString(),
        },
      });
    }
  }, [range, router]);

  const {data, loading} = useRevenueQuery({
    variables: {
      after: range?.[0]?.toDate() ?? new Date(),
      before: range?.[1]?.toDate() ?? new Date(),
    },
  });

  const eventPickerValue = useMemo(
    () =>
      data?.events.find(
        (e) =>
          isEqual(e.start, range?.[0]?.toDate() ?? new Date()) &&
          isEqual(e.end, range?.[1]?.toDate() ?? new Date()),
      ),
    [data?.events],
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
              onChange={(e) => {
                const a = e?.[0];
                const b = e?.[1];
                if (a && b) {
                  setRange([a, b]);
                }
              }}
              value={range as any}
            />
          </ConfigProvider>
        }
      ></PageHeader>
      <Row
        gutter={16}
        style={{paddingLeft: 24, paddingRight: 24, paddingBottom: 12}}
      >
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title={`${data?.transactions.charges.totalCount ?? 0} Abbuchungen`}
            value={calcValue(
              data?.transactions.charges,
              data?.config?.depositValue,
            )}
          />
        </Col>
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title={`${data?.transactions.topUps.totalCount ?? 0} Aufladungen`}
            value={calcValue(
              data?.transactions.topUps,
              data?.config?.depositValue,
            )}
          />
        </Col>
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title={`${
              data?.transactions.cashouts.totalCount ?? 0
            } Auszahlungen`}
            value={calcValue(
              data?.transactions.cashouts,
              data?.config?.depositValue,
            )}
          />
        </Col>
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title="Pfandausgaben"
            value={data?.transactions.transactions.depositOut ?? 0}
          />
        </Col>
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title="Pfandrückgaben"
            value={data?.transactions.transactions.depositIn ?? 0}
          />
        </Col>
        <Col md={4} sm={8}>
          <Statistic
            loading={!data}
            title="Karten"
            value={data?.transactions.transactions.uniqueCards}
          />
        </Col>
      </Row>
      {data?.productLists && (
        <RevenueTable
          loading={loading}
          productLists={data.productLists}
          range={range as any}
        />
      )}
    </Page>
  );
}

function calcValue(
  data: RevenueQuery['transactions']['topUps'] | undefined,
  depositValue: number = 0,
) {
  if (!data) {
    return '';
  }
  return currencyFormatter.format(
    Math.abs(
      data.balanceTotal - (data.depositIn - data.depositOut) * depositValue,
    ) / 100,
  );
}
