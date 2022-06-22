import {Badge, message, PageHeader, Select, Table} from 'antd';
import React from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {
  useDevicesQuery,
  useUpdateDeviceListMutation,
} from '../../types/graphql';
import RelativeDate from '../../components/shared/RelativeDate';
import {differenceInMinutes} from 'date-fns';

gql`
  query Devices {
    devices(type: CONTACTLESS_TERMINAL) {
      id
      lastSeen
      softwareVersion
      productList {
        id
        name
      }
    }
    productLists {
      id
      name
      active
    }
  }

  mutation UpdateDeviceList($productListId: Int, $deviceId: ID!) {
    updateDeviceProductList(
      productListId: $productListId
      deviceId: $deviceId
    ) {
      id
      productList {
        id
        name
      }
    }
  }
`;

export default function Devices() {
  const {data, loading} = useDevicesQuery({
    pollInterval: 60000,
  });
  const [update] = useUpdateDeviceListMutation();

  return (
    <Page>
      <PageHeader title="Geräte"></PageHeader>
      <Table
        loading={loading}
        pagination={false}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            width: '20%',
            sorter: (a, b) => a.id.localeCompare(b.id),
          },
          {
            title: 'Software',
            dataIndex: 'softwareVersion',
            width: '20%',
          },
          {
            title: 'Zuletzt Online',
            width: '25%',
            dataIndex: 'lastSeen',
            sorter: (a, b) =>
              (b.lastSeen?.getTime() ?? 0) - (a.lastSeen?.getTime() ?? 0),
            render: (lastSeen) => (
              <span>
                <Badge
                  status={
                    differenceInMinutes(new Date(), lastSeen) < 15
                      ? 'success'
                      : 'default'
                  }
                />
                <RelativeDate date={lastSeen} />
              </span>
            ),
          },
          {
            title: 'Produktliste',
            dataIndex: 'productList',
            render: (productList, record) => (
              <Select
                style={{width: '100%'}}
                dropdownMatchSelectWidth={false}
                value={productList?.name}
                onChange={async (id) => {
                  await update({
                    variables: {
                      deviceId: record.id,
                      productListId: id,
                    },
                  });
                  message.success('Änderung gespeichert');
                }}
                placeholder="Liste auswählen..."
              >
                <Select.Option value={null}>(keine Liste)</Select.Option>
                {data.productLists.map((l) => (
                  <Select.Option value={l.id} key={l.id}>
                    {l.name}
                  </Select.Option>
                ))}
              </Select>
            ),
          },
        ]}
        dataSource={data?.devices}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => null,
        }}
      />
    </Page>
  );
}
