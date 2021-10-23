import Head from 'next/head';
import styles from './Page.module.css';
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import React from 'react';
const {Header} = Layout;
import Link from 'next/link';
import {useRouter} from 'next/dist/client/router';
import {DAYS} from '../../pages/tables/[...day]';
import useViewerContext from '../../utils/useViewerContext';

export const HEADER_HEIGHT = 64;

export default function Page({
  children,
  title,
}: {
  children: any;
  title?: string;
}) {
  const {asPath} = useRouter();
  const viewer = useViewerContext();

  return (
    <Layout className={styles.layout} style={{paddingTop: HEADER_HEIGHT}}>
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
          <Menu.SubMenu key="tables" title="Reservierungen">
            {DAYS.map((d) => (
              <Menu.Item key={d.toISOString().substr(0, 10)}>
                <Link href={`/tables/${d.toISOString().substr(0, 10)}`}>
                  {d.toLocaleDateString('de', {
                    weekday: 'long',
                  })}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item key="overlap">
              <Link href="/tables/overlap">Überlappungen</Link>
            </Menu.Item>
            <Menu.Item key="overview">
              <Link href="/tables/overview">Übersicht</Link>
            </Menu.Item>
            <Menu.Item key="juz">
              <a
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1mIpkFrLwoXXwGFTokNd_YwmlnSMOjIdTtQv3ZHJXvEw/edit?usp=sharing"
              >
                JUZ
              </a>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="products" title="Verkauf">
            <Menu.Item key="lists">
              <Link href={`/products/lists`}>Preislisten</Link>
            </Menu.Item>
            <Menu.Item key="revenue">
              <Link href={`/products/revenue`}>Umsätze</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="booking">
            <Link href="/booking">Booking</Link>
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
          <Avatar src={viewer.profilePicture}>
            {viewer.displayName
              .split(' ')
              .map((n) => n.substr(0, 1).toLocaleUpperCase())
              .join('')}
          </Avatar>
        </Dropdown>
      </Header>
      {children}
    </Layout>
  );
}
