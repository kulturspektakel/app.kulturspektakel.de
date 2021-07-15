import {Col, Row, Modal, PageHeader, Button, Input, Spin, Empty} from 'antd';
import React, {useState, useCallback} from 'react';
import Page from '../../components/shared/Page';
import ProductList from '../../components/products/ProductList';
import {gql} from '@apollo/client';
import {
  useCreateProductListMutation,
  useProductListQuery,
} from '../../types/graphql';

gql`
  query ProductList {
    productLists {
      id
      ...ProductList
    }
  }

  mutation CreateProductList($name: String!) {
    upsertProductList(name: $name) {
      ...ProductList
    }
  }
`;

export default function Lists() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newListName, setNewListName] = useState<string | null>(null);
  const {data} = useProductListQuery();
  const [create] = useCreateProductListMutation({});

  const createList = useCallback(async () => {
    if (!newListName) {
      return;
    }
    await create({
      variables: {
        name: newListName,
      },
      refetchQueries: ['ProductList'],
      awaitRefetchQueries: true,
    });
    setNewListName('');
    setCreateModalVisible(false);
  }, [setNewListName, setCreateModalVisible, newListName, create]);

  return (
    <Page>
      <Modal
        title="Neue Preisliste erstellen"
        visible={createModalVisible}
        okText="Erstellen"
        cancelText="Abbrechen"
        onCancel={() => setCreateModalVisible(false)}
        okButtonProps={{
          disabled: !newListName,
          onClick: createList,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return createList();
          }}
        >
          <Input
            placeholder="Name"
            autoFocus
            value={newListName ?? ''}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </form>
      </Modal>
      <PageHeader
        title="Preislisten"
        extra={[
          <Button key="1" href="/products/print" target="_blank">
            Drucken
          </Button>,
          <Button
            key="2"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            Neue Preisliste
          </Button>,
        ]}
      >
        {data?.productLists.length === 0 && (
          <Empty description="Keine Preislisten" />
        )}
        {data?.productLists ? (
          <Row gutter={16}>
            {data.productLists.map((list) => (
              <Col sm={24} md={12} lg={8} xxl={6} key={list.name}>
                <ProductList list={list} />
              </Col>
            ))}
          </Row>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 50,
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </PageHeader>
    </Page>
  );
}
