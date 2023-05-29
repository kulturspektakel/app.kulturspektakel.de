import styles from './Page.module.css';
import {Layout} from 'antd';
import React from 'react';

export default function Page({
  children,
  title,
  className,
  padded,
  accessory,
}: {
  children: any;
  title?: string;
  className?: string;
  padded?: boolean;
  accessory?: React.ReactNode;
}) {
  return (
    <Layout className={`${styles.layout} ${className ?? ''}`}>
      <Layout.Content className={padded ? styles.padded : undefined}>
        {(title || accessory) && (
          <div className={`${styles.title} ${!padded ? styles.padded : ''}`}>
            <h2>{title}</h2>
            <div className={styles.accessory}>{accessory}</div>
          </div>
        )}
        {children}
      </Layout.Content>
    </Layout>
  );
}
