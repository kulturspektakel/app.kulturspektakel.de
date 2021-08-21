import React from 'react';
import Page from '../components/shared/Page';
import {Content} from 'antd/lib/layout/layout';
import {Layout} from 'antd';

export default function Home() {
  return (
    <Page>
      <Layout>
        <Content style={{margin: 24, padding: 24, background: 'white'}}>
          Homepage
        </Content>
      </Layout>
    </Page>
  );
}
