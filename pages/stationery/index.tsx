import {gql} from '@apollo/client';
import {Button, Checkbox, Layout, Select} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {useState} from 'react';
import Page from '../../components/shared/Page';
import {
  useStationeryPageLazyQuery,
  useStationerySearchLazyQuery,
} from '../../types/graphql';
import styles from './stationary.module.css';
import ReactMarkdown from 'react-markdown';

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
    nuclinoPage(id: $id) {
      id
      title
      content
    }
  }
`;

export default function Stationery() {
  const [search, {loading: loadingSearch, data: searchData}] =
    useStationerySearchLazyQuery();
  const [loadPage, {loading: loadingPage, data: pageData}] =
    useStationeryPageLazyQuery();
  const [address, setAddress] = useState('');
  const [showDate, setShowDate] = useState(true);

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
            onChange={(id) =>
              loadPage({
                variables: {
                  id,
                },
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
            onChange={(e) => setAddress(e.target.value.trim())}
          />
          <Checkbox
            onChange={(e) => setShowDate(e.target.checked)}
            value={showDate}
          >
            Ort/Datum anzeigen
          </Checkbox>
          <Button block type="primary" onClick={() => window.print()}>
            Drucken
          </Button>
        </Sider>
        <Layout>
          <Content className={styles.page}>
            <div className={styles.header}>Logo</div>
            {address && (
              <div className={styles.address}>
                <div className={styles.returnAddress}>
                  Kulturspektakel Gauting e.V., Bahnhofstr. 6, 82131 Gauting
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

            <ReactMarkdown className={styles.content}>
              {pageData?.nuclinoPage?.content}
            </ReactMarkdown>
            <div className={styles.footer}>
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
                  Schriftführer: Verena Fischer
                  <br />
                  Kassenwart: Leonhard Pelzt
                  <br />
                  Beisitzer: Valentin Langer, Felicitas Sautner
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
          </Content>
        </Layout>
      </Layout>
    </Page>
  );
}
