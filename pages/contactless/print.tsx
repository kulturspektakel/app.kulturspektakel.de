import React from 'react';
import {gql} from '@apollo/client';
import {useProductPrintQuery} from 'types/graphql';
import styles from './print.module.css';
import Head from 'next/head';

gql`
  query ProductPrint {
    productLists {
      id
      emoji
      name
      active
      product {
        id
        name
        price
        requiresDeposit
        additives {
          id
        }
      }
    }
    config {
      depositValue
    }
    productAdditives {
      id
      displayName
    }
  }
`;

const formatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function Lists() {
  const {data} = useProductPrintQuery();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        <span>
          <strong>Kulturspektakel</strong>
          <br />
          Preisliste
        </span>
      </h1>
      <Head>
        <title>Preisliste</title>
      </Head>
      <div className={styles.content}>
        {data?.productLists
          .filter((l) => l.active)
          .map((list) => (
            <div className={styles.list} key={list.id}>
              <h2>
                <span className={styles.emoji}>{list.emoji}</span>&nbsp;
                {list.name}
              </h2>
              <ul>
                {list.product.map((p) => (
                  <li key={p.id}>
                    <span className={styles.product}>
                      {p.name}
                      {p.additives.length > 0 && (
                        <sup>
                          &nbsp;
                          {p.additives
                            .map((a) => a.id.replace(/^0/, ''))
                            .join(', ')}
                        </sup>
                      )}
                    </span>
                    <span className={styles.spacer} />
                    <span className={styles.price}>
                      {p.requiresDeposit ? <>*&nbsp;</> : ''}
                      {formatter.format(p.price / 100)}&nbsp;&euro;
                    </span>
                  </li>
                ))}
              </ul>
              {list.product.some((p) => p.requiresDeposit) && (
                <p className={styles.token}>
                  *&nbsp;zuzüglich {formatter.format(200 / 100)}&nbsp;&euro;
                  Pfand
                </p>
              )}
            </div>
          ))}
      </div>
      <ul className={styles.additives}>
        {data?.productAdditives.map((p) => (
          <li key={p.id}>
            <sup>{p.id.replace(/^0/, '')}</sup>&nbsp;{p.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}
