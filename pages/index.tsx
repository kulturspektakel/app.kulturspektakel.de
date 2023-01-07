import React from 'react';
import Page from '../components/shared/Page';
import {Layout} from 'antd';
import Trigger from 'rc-trigger';

export default function Home() {
  return (
    <Page>
      <Layout>
        <Layout.Content style={{margin: 24, padding: 24, background: 'white'}}>
          Homepage
        </Layout.Content>
      </Layout>
    </Page>
  );
}
