import Head from 'next/head';
import styles from './Page.module.css';
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import React from 'react';
const {Header} = Layout;
import Link from 'next/link';
import {useRouter} from 'next/dist/client/router';
import useViewerContext from '../../utils/useViewerContext';

export const HEADER_HEIGHT = 64;

export default function Page({
  children,
  title,
  className,
}: {
  children: any;
  title?: string;
  className?: string;
}) {
  const {asPath} = useRouter();
  const viewer = useViewerContext();

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
          <a className={styles.logo}>
            <img src="/logo.svg" />
          </a>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={asPath.split('/').filter(Boolean)}
        >
          <Menu.SubMenu key="products" title="Verkauf">
            <Menu.Item key="lists">
              <Link href={`/products/lists`}>Preislisten</Link>
            </Menu.Item>
            <Menu.Item key="devices">
              <Link href={`/products/devices`}>Geräte</Link>
            </Menu.Item>
            <Menu.Item key="revenue">
              <Link href={`/products/revenue`}>Umsätze</Link>
            </Menu.Item>
            <Menu.Item key="card">
              <Link href={`/products/card`}>Karten-Details</Link>
            </Menu.Item>
            <Menu.Item key="card-token">
              <Link href={`/products/card-token`}>Token-Generator</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="booking">
            <Link href="/booking">Booking</Link>
          </Menu.Item>
          <Menu.Item key="stationery">
            <Link href="/stationery">Briefpapier</Link>
          </Menu.Item>
        </Menu>
        <div className={styles.spacer} />
        <Dropdown
          className={styles.profileMenu}
          placement="bottomRight"
          arrow
          overlay={
            <Menu>
              <Menu.Item>
                <a href="https://api.kulturspektakel.de/logout">Logout</a>
              </Menu.Item>
            </Menu>
          }
        >
          {viewer && (
            <Avatar src={viewer.profilePicture}>
              {viewer.displayName
                .split(' ')
                .map((n) => n.substr(0, 1).toLocaleUpperCase())
                .join('')}
            </Avatar>
          )}
        </Dropdown>
      </Header>
      {children}
    </Layout>
  );
}
