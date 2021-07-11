import ProductRow from './ProductRow';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import React, {useState, useCallback, useEffect} from 'react';
import EmojiPicker from './EmojiPicker';
import {Card, Button, message, Modal} from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import styles from './ProductList.module.css';
import {gql} from '@apollo/client';
import {
  ProductListFragmentFragment,
  ProductRowFragment,
  useDeleteProductListMutation,
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
    id: data.id ?? Math.random(),
    name: '',
    price: 0,
    requiresDeposit: false,
    ...data,
  };
}

gql`
  fragment ProductListFragment on ProductList {
    id
    name
    emoji
    product {
      id
      ...ProductRowFragment
    }
  }

  mutation UpsertProductList(
    $id: Int
    $emoji: String
    $name: String
    $products: [ProductInput!]
  ) {
    upsertProductList(
      id: $id
      emoji: $emoji
      name: $name
      products: $products
    ) {
      ...ProductListFragment
    }
  }

  mutation DeleteProductList($id: Int!) {
    deleteProductList(id: $id)
  }
`;

export default function ProductList({
  list,
}: {
  list: ProductListFragmentFragment;
}) {
  const [products, setProducts] = useState<ProductRowFragment[]>([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setProducts(list.product.map(generateRow));
  }, [list.product]);

  useLeavePageConfirm(dirty, 'Änderungen an Preislisten nicht gespeichert');

  const [mutate] = useUpsertProductListMutation({});
  const [deleteList] = useDeleteProductListMutation({
    refetchQueries: ['ProductList'],
  });

  const onDragEnd = useCallback(
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
    (i: number, newProduct: Partial<ProductRowFragment>) => {
      const newProducts = [...products];
      newProducts.splice(i, 1, {...products[i], ...newProduct});
      setProducts(newProducts);
      setDirty(true);
    },
    [setProducts, products],
  );

  return (
    <Card
      className={styles.root}
      size="small"
      actions={[
        <Button
          icon={<CheckCircleOutlined />}
          type="link"
          disabled={!dirty}
          onClick={async () => {
            setDirty(false);
            await mutate({
              variables: {
                id: list.id,
                products: products
                  .filter((p) => Boolean(p.name && p.price))
                  .map(({id, __typename, ...data}) => data),
              },
            });
            message.success('Änderung gespeichert');
          }}
        >
          Speichern
        </Button>,
        <Button
          icon={<PlusCircleOutlined />}
          type="link"
          style={{color: '#52c41a'}}
          onClick={() => {
            setProducts([...products, generateRow({})]);
          }}
        >
          Produkt
        </Button>,
        <Button
          icon={<DeleteOutlined />}
          type="link"
          danger
          onClick={() => {
            Modal.confirm({
              title: 'Preisliste löschen',
              icon: <ExclamationCircleOutlined />,
              okText: 'Löschen',
              okButtonProps: {
                danger: true,
              },
              cancelText: 'Abbrechen',
              content: `Soll die Preisliste ${list.name} wirklich gelöscht werden?`,
              onOk() {
                return deleteList({variables: {id: list.id}});
              },
            });
          }}
        >
          Löschen
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={
          <EmojiPicker
            value={list.emoji}
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
        }
        title={list.name}
        description={`${list.product.length} Produkt${
          list.product.length !== 1 ? 'e' : ''
        }`}
      />
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
