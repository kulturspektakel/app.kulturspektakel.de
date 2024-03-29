import '../styles/globals.css';

import React, {Suspense, useMemo} from 'react';
import {AppProps} from 'next/app';
import {ApolloProvider, NormalizedCacheObject} from '@apollo/client';
import useApolloClient from '../utils/useApolloClient';
import dynamic from 'next/dynamic';

import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import {ConfigProvider, theme} from 'antd';
import deDE from 'antd/locale/de_DE';

dayjs.locale(de);
dayjs.extend(weekday);
dayjs.extend(localeData);

type Props = {
  initialApolloState: NormalizedCacheObject | undefined;
};

const App = ({Component, pageProps}: AppProps & Props) => {
  const client = useApolloClient();

  const customTheme = useMemo(
    () => ({
      token: {
        fontSizeHeading5: theme.defaultConfig.token.fontSize,
        colorBgLayout: 'transparent',
      },
    }),
    [],
  );

  return (
    <ApolloProvider client={client}>
      <ConfigProvider locale={deDE} theme={customTheme}>
        <Suspense fallback={null}>
          <Component {...pageProps} />
        </Suspense>
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default dynamic(() => Promise.resolve(App), {ssr: false});
