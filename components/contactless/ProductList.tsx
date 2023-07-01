import ProductRow from './ProductRow';
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import React, {useState, useCallback, useEffect, Suspense} from 'react';
import EmojiPicker from './EmojiPicker';
import {Button, message, Modal, Typography, Card, Dropdown, Spin} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import styles from './ProductList.module.css';
import {gql, useSuspenseQuery} from '@apollo/client';
import {
  ProductListDocument,
  ProductListQuery,
  ProductRowFragment,
  useUpsertProductListMutation,
} from '../../types/graphql';
import useLeavePageConfirm from '../../utils/useLeavePageConfirm';

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function generateRow(data: Partial<ProductRowFragment>): ProductRowFragment {
  return {
    id: data.id ?? Math.random().toString(36),
    name: '',
    price: 0,
    requiresDeposit: false,
    additives: [],
    ...data,
  };
}

gql`
  fragment ProductList on ProductList {
    id
    name
    emoji
    active
    product {
      id
      ...ProductRow
    }
  }

  query ProductList($id: ID!) {
    productList: node(id: $id) {
      ... on ProductList {
        ...ProductList
      }
    }
    productAdditives {
      id
      displayName
    }
  }

  mutation UpsertProductList(
    $id: ID
    $emoji: String
    $name: String
    $products: [ProductInput!]
    $active: Boolean
  ) {
    upsertProductList(
      id: $id
      emoji: $emoji
      name: $name
      products: $products
      active: $active
    ) {
      ...ProductList
    }
  }
`;

type Props = {listId: string};

function ProductList({listId}: Props) {
  const [products, setProducts] = useState<ProductRowFragment[]>([]);
  const [dirty, setDirty] = useState(false);
  const {data} = useSuspenseQuery<ProductListQuery>(ProductListDocument, {
    variables: {
      id: listId,
    },
  });
  const list =
    data.productList?.__typename === 'ProductList' ? data.productList : null;
  if (!list) {
    throw new Error('List not found');
  }

  useEffect(() => {
    setProducts(list.product.map(generateRow));
  }, [list.product]);

  useLeavePageConfirm(dirty, 'Änderungen an Preislisten nicht gespeichert');

  const [mutate, {loading}] = useUpsertProductListMutation({});

  const onDragEnd = useCallback<OnDragEndResponder>(
    (result) => {
      if (!result.destination) {
        return;
      }
      const items = reorder<ProductRowFragment>(
        products,
        result.source.index,
        result.destination.index,
      );
      setProducts(items);
      setDirty(true);
    },
    [products],
  );

  const onProductChange = useCallback(
    (i: number, newProduct: Partial<ProductRowFragment> | null) => {
      const newProducts = [...products];
      if (newProduct == null) {
        newProducts.splice(i, 1);
      } else {
        newProducts.splice(i, 1, {...products[i], ...newProduct});
      }
      setProducts(newProducts);
      setDirty(true);
    },
    [setProducts, products],
  );

  return (
    <Card
      bordered={false}
      className={styles.container}
      bodyStyle={{
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div className={styles.header}>
        <EmojiPicker
          key={list.id}
          value={list.emoji ?? null}
          onChange={async (emoji) => {
            await mutate({
              variables: {
                id: list.id,
                emoji,
              },
            });
            message.success('Emoji geändert');
          }}
        />
        <div className={styles.titleGroup}>
          <Typography.Title level={4} className={styles.title}>
            {list.name}
          </Typography.Title>
          <Typography.Text type="secondary">{`${list.product.length} Produkt${
            list.product.length !== 1 ? 'e' : ''
          }`}</Typography.Text>
        </div>
        <div>
          <Dropdown.Button
            loading={loading}
            menu={{
              items: [
                {
                  key: 1,
                  disabled: products.length >= 30,
                  label: 'Neues Produkt',
                  onClick: () => setProducts([...products, generateRow({})]),
                },
                {
                  key: 2,
                  danger: list.active,
                  label: list.active
                    ? 'Preisliste deaktivieren'
                    : 'Preisliste aktivieren',
                  onClick: () => {
                    if (list.active) {
                      return Modal.confirm({
                        title: 'Preisliste deaktivieren',
                        icon: <ExclamationCircleOutlined rev={undefined} />,
                        okText: 'Deaktivieren',
                        okButtonProps: {
                          danger: true,
                        },
                        cancelText: 'Abbrechen',
                        content: `Soll die Preisliste ${list.name} wirklich deaktiviert werden? Sie wird dann von allen Geräten entfernt die sie verwenden.`,
                        onOk() {
                          return mutate({
                            variables: {id: list.id, active: false},
                          });
                        },
                      });
                    } else {
                      return mutate({variables: {id: list.id, active: true}});
                    }
                  },
                },
              ],
            }}
            type={dirty ? 'primary' : undefined}
            onClick={async () => {
              setDirty(false);
              await mutate({
                variables: {
                  id: list.id,
                  products: products.map(
                    ({id, __typename, additives, ...data}) => ({
                      ...data,
                      additives: additives.map((a) => a.id),
                    }),
                  ),
                },
              });
              message.success('Änderung gespeichert');
            }}
          >
            Speichern
          </Dropdown.Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {products.map((product, i) => (
                <Draggable
                  key={product.id}
                  draggableId={String(product.id)}
                  index={i}
                >
                  {(provided) => (
                    <ProductRow
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      index={i + 1}
                      data={product}
                      onChange={onProductChange}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}

export default function ProductListLazy(props: Props) {
  return (
    <Suspense fallback={<Spin />}>
      <ProductList {...props} />
    </Suspense>
  );
}
