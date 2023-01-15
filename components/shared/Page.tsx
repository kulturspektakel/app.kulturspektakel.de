import Head from 'next/head';
import styles from './Page.module.css';
import {Dropdown, Layout, Menu} from 'antd';
import React from 'react';
const {Header} = Layout;
import Link from 'next/link';
import {useRouter} from 'next/dist/client/router';
import ViewerAvatar from './ViewerAvatar';

export const HEADER_HEIGHT = 64;

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
  const {asPath} = useRouter();

  return (
    <Layout
      className={`${styles.layout} ${className ?? ''}`}
      style={{paddingTop: HEADER_HEIGHT}}
    >
      <Head>
        <title>{title ?? 'Crew'} · Kulturspektakel Gauting</title>
        <meta name="theme-color" content="#001529" />
      </Head>
      <Header className={styles.header} style={{height: HEADER_HEIGHT}}>
        <Link href="/">
          <span className={styles.logo}>
            <img src="/logo.svg" alt="Logo" />
          </span>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={asPath.split('/').filter(Boolean)}
          items={[
            {
              label: 'Verkauf',
              key: 'products',
              children: [
                {
                  label: <Link href={`/products/lists`}>Preislisten</Link>,
                  key: 'lists',
                },
                {
                  label: <Link href={`/products/devices`}>Geräte</Link>,
                  key: 'devices',
                },
                {
                  label: <Link href={`/products/revenue`}>Umsätze</Link>,
                  key: 'revenue',
                },
                {
                  label: <Link href={`/products/card`}>Karten-Details</Link>,
                  key: 'card',
                },
                {
                  label: (
                    <Link href={`/products/card-token`}>Token-Generator</Link>
                  ),
                  key: 'card-token',
                },
              ],
            },
            {
              key: 'booking',
              label: <Link href="/booking">Booking</Link>,
            },
          ]}
        />
        <div className={styles.spacer} />
        <Dropdown
          className={styles.profileMenu}
          placement="bottomRight"
          arrow
          menu={{
            items: [
              {
                label: (
                  <a href="https://api.kulturspektakel.de/logout">Logout</a>
                ),
                key: 'logout',
              },
            ],
          }}
        >
          <ViewerAvatar />
        </Dropdown>
      </Header>
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
