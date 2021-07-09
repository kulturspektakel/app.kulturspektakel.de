import ProductRow from './ProductRow';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useState, useCallback, useEffect} from 'react';
import EmojiPicker from './EmojiPicker';
import {Card, Button, message} from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import styles from './ProductList.module.css';
import {gql} from '@apollo/client';
import {
  ProductListFragmentFragment,
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

export type ProductT = {id: string; name: string | null; price: number | null};

function generateRow(name: string | null, price: number | null): ProductT {
  return {id: Math.random().toString(36), name, price};
}

gql`
  fragment ProductListFragment on ProductList {
    id
    name
    emoji
    product {
      id
      name
      price
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
  const [products, setProducts] = useState<ProductT[]>([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setProducts(list.product.map(({name, price}) => generateRow(name, price)));
  }, [list.product]);

  useLeavePageConfirm(dirty, 'Änderungen an Preislisten nicht gespeichert');

  const [mutate] = useUpsertProductListMutation({});
  const [deleteList] = useDeleteProductListMutation({});

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      const items = reorder<ProductT>(
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
    (i: number, newProduct: Partial<ProductT>) => {
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
                  .map(({name, price}) => ({name, price})),
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
            setProducts([...products, generateRow('', 0)]);
          }}
        >
          Produkt
        </Button>,
        <Button
          icon={<DeleteOutlined />}
          type="link"
          danger
          onClick={() => deleteList({variables: {id: list.id}})}
        >
          Löschen
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={
          <EmojiPicker
            value={list.emoji}
            onChange={() =>
              mutate({
                variables: {
                  id: list.id,
                  emoji: list.emoji,
                },
              })
            }
          />
        }
        title={list.name}
        description="test"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {products.map((product, i) => (
                <Draggable key={product.id} draggableId={product.id} index={i}>
                  {(provided) => (
                    <ProductRow
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      index={i + 1}
                      product={product.name}
                      price={product.price}
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
