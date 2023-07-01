import {Modal, Button, Input, Empty, Typography, Tabs} from 'antd';
import React, {useState, useCallback} from 'react';
import Page from 'components/shared/Page';
import {gql} from '@apollo/client';
import {
  useCreateProductListMutation,
  useProductListsQuery,
} from 'types/graphql';
import ProductList from 'components/contactless/ProductList';
import styles from './lists.module.css';

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

      <Tabs
        tabPosition={document.body.clientWidth < 600 ? 'top' : 'left'}
        size="small"
        onTabClick={() => window.scrollTo(0, 0)}
        className={styles.tabs}
        items={[
          ...(data?.productLists
            .filter((l) => l.active)
            .map((l) => ({
              key: l.id,
              label: (
                <Typography.Text>
                  {l.emoji}&ensp;
                  {l.name}
                </Typography.Text>
              ),
              children: <ProductList listId={l.id} />,
            })) ?? []),
          ...(data?.productLists
            .filter((l) => !l.active)
            .map((l) => ({
              key: l.id,
              children: <ProductList listId={l.id} />,
              label: (
                <Typography.Text type="secondary">
                  {l.emoji}&ensp;{l.name}
                </Typography.Text>
              ),
            })) ?? []),
        ]}
      />

      {data?.productLists.length === 0 && (
        <Empty description="Keine Preislisten" />
      )}
    </Page>
  );
}
