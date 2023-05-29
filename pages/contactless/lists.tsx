import {Modal, Button, Input, Spin, Empty} from 'antd';
import React, {useState, useCallback} from 'react';
import Page from 'components/shared/Page';
import {gql} from '@apollo/client';
import {useCreateProductListMutation, useProductListQuery} from 'types/graphql';
import ProductListContainer from 'components/contactless/ProductListContainer';

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
    <Page
      title="Preislisten"
      padded
      accessory={
        <>
          <Button href="/products/print" target="_blank">
            Drucken
          </Button>
          <Button type="primary" onClick={() => setCreateModalVisible(true)}>
            Neue Preisliste
          </Button>
        </>
      }
    >
      <Modal
        title="Neue Preisliste erstellen"
        open={createModalVisible}
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
            maxLength={20}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </form>
      </Modal>

      {data?.productLists.length === 0 && (
        <Empty description="Keine Preislisten" />
      )}
      {data?.productLists ? (
        <>
          <ProductListContainer
            data={data?.productLists.filter((p) => p.active)}
          />
          <ProductListContainer
            title="Deaktivierte Listen"
            data={data?.productLists.filter((p) => !p.active)}
          />
        </>
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
    </Page>
  );
}