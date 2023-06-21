import {Modal, Button, Input, Spin, Empty, Menu, Typography, Card} from 'antd';
import React, {useState, useCallback, Suspense} from 'react';
import Page from 'components/shared/Page';
import {gql} from '@apollo/client';
import {
  useCreateProductListMutation,
  useProductListsQuery,
} from 'types/graphql';
import ProductList from 'components/contactless/ProductList';

gql`
  query ProductLists {
    productLists {
      id
      emoji
      name
      active
    }
  }

  mutation CreateProductList($name: String!) {
    upsertProductList(name: $name) {
      id
    }
  }
`;

export default function Lists() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newListName, setNewListName] = useState<string | null>(null);
  const {data} = useProductListsQuery();
  const [create] = useCreateProductListMutation({});
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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
          <Button href="/contactless/print" target="_blank">
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
      <Card bodyStyle={{padding: 12, paddingTop: 0}}>
        <Menu
          selectedKeys={selectedListId ? [selectedListId] : undefined}
          onSelect={({key}) => setSelectedListId(key)}
          items={[
            ...(data?.productLists
              .filter((l) => l.active)
              .map((l) => ({
                key: l.id,
                label: <Typography.Text>{l.name}</Typography.Text>,
              })) ?? []),
            {type: 'divider'},
            ...(data?.productLists
              .filter((l) => !l.active)
              .map((l) => ({
                key: l.id,
                label: (
                  <Typography.Text type="secondary">{l.name}</Typography.Text>
                ),
              })) ?? []),
          ]}
          mode="horizontal"
        />
        {selectedListId != null ? (
          <Suspense fallback={<Spin />}>
            <ProductList listId={selectedListId} key={selectedListId} />
          </Suspense>
        ) : (
          <Empty description="Preisliste auswählen" />
        )}
      </Card>
    </Page>
  );
}
