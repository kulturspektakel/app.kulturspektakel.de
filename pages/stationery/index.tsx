import {gql} from '@apollo/client';
import {Button, Checkbox, Layout, Select} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {useEffect, useState} from 'react';
import Page from '../../components/shared/Page';
import {
  useStationeryPageLazyQuery,
  useStationeryPageQuery,
  useStationerySearchLazyQuery,
} from '../../types/graphql';
import styles from './stationary.module.css';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';
import {useRouter} from 'next/router';

const {Option} = Select;
const {Content, Sider} = Layout;

gql`
  query StationerySearch($query: String!) {
    nuclinoPages(query: $query) {
      highlight
      page {
        id
        title
      }
    }
  }
  query StationeryPage($id: ID!) {
    nuclinoPage: node(id: $id) {
      ... on NuclinoPage {
        id
        title
        content
      }
    }
  }
`;

export default function Stationery() {
  const router = useRouter();
  const [search, {loading: loadingSearch, data: searchData}] =
    useStationerySearchLazyQuery();
  const {loading: loadingPage, data: pageData} = useStationeryPageQuery({
    variables: {
      id: String(router.query?.id),
    },
    skip: !router.query?.id,
  });
  const [address, setAddress] = useState('');
  const [showDate, setShowDate] = useState(false);

  const nuclinoPage =
    pageData?.nuclinoPage?.__typename === 'NuclinoPage'
      ? pageData?.nuclinoPage
      : null;

  return (
    <Page title="Briefpapier">
      <Layout>
        <Sider width={300} className={styles.sidebar}>
          <Select
            showSearch
            className={styles.select}
            placeholder="Nuclino-Seiten suchen..."
            optionFilterProp="children"
            loading={loadingSearch}
            value={nuclinoPage?.title}
            onChange={(id) =>
              router.push({
                pathname: router.pathname,
                query: {...router.query, id},
              })
            }
            onSearch={async (query) =>
              search({
                variables: {
                  query,
                },
              })
            }
          >
            {searchData?.nuclinoPages.map((p) => (
              <Option key={p.page.id} value={p.page.id}>
                {p.page.title}
              </Option>
            ))}
          </Select>
          <TextArea
            rows={4}
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Checkbox
            onChange={(e) => setShowDate(e.target.checked)}
            checked={showDate}
            className={styles.checkbox}
          >
            Ort/Datum anzeigen
          </Checkbox>
          <Button block type="primary" onClick={() => window.print()}>
            Drucken
          </Button>
        </Sider>
        <Layout>
          <Content className={styles.page}>
            <div className={styles.pageInner}>
              <style
                dangerouslySetInnerHTML={{
                  __html: '@page {margin: 1.5cm; margin-bottom: 1cm}',
                }}
              />
              <table className={styles.layoutTable}>
                <thead>
                  <tr>
                    <td>
                      <div className={styles.headerSpace}>&nbsp;</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {address && (
                        <div className={styles.address}>
                          <div className={styles.returnAddress}>
                            Kulturspektakel Gauting e.V., Bahnhofstr. 6, 82131
                            Gauting
                          </div>
                          {address}
                        </div>
                      )}
                      {showDate && (
                        <div className={styles.date}>
                          Gauting,{' '}
                          {new Date().toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      )}

                      <ReactMarkdown
                        className={styles.content}
                        components={{
                          a: 'span',
                        }}
                        remarkPlugins={[remarkGfm]}
                        skipHtml
                      >
                        {nuclinoPage?.content ?? ''}
                      </ReactMarkdown>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <div className={styles.footerSpace}>&nbsp;</div>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className={classNames(styles.header, styles.headerSpace)}>
                <img src="/logo-text-right-black.svg" />
              </div>

              <div className={classNames(styles.footerSpace, styles.footer)}>
                <div>
                  <h4>Kulturspektakel Gauting e.V.</h4>
                  Bahnhofstr. 6<br />
                  82131 Gauting
                  <br />
                  info@kulturspektakel.de
                  <br />
                  www.kulturspektakel.de
                  <br />
                  facebook.com/kulturspektakel
                </div>
                <div>
                  <p>
                    Vertreten durch: Gabriel Knoll,
                    <br />
                    Tristan Häuser und Emil Leckert
                  </p>
                  <p>
                    Schriftführerin: Lara Bühler
                    <br />
                    Kassenwart: Valentin Langer
                    <br />
                    Beisitzer: Adrian Luck, Laila Dörmer
                  </p>
                </div>
                <div>
                  <p>
                    Registergericht: Amtsgericht München
                    <br />
                    Registernummer: VR&nbsp;70819
                  </p>
                  <p>
                    Kreissparkasse Starnberg
                    <br />
                    IBAN: DE71&nbsp;7025&nbsp;0150&nbsp;0620&nbsp;0007&nbsp;52
                    <br />
                    BIC: BYLADEM1KMS
                  </p>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Page>
  );
}
