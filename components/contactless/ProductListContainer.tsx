import React from 'react';
import {ProductListQuery} from '../../types/graphql';
import ProductList from './ProductList';
import styles from './ProductListContainer.module.css';

export default function ProductListContainer({
  data,
  title,
}: {
  title?: React.ReactNode;
  data?: ProductListQuery['productLists'];
}) {
  return (
    <>
      {title && <h3 className={styles.heading}>{title}</h3>}
      <div className={styles.root}>
        {data?.map((list) => (
          <ProductList key={list.id} list={list} />
        ))}
      </div>
    </>
  );
}
