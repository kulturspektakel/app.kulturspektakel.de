import '../styles/globals.css';

import React, {useMemo} from 'react';
import NextApp, {AppContext, AppInitialProps, AppProps} from 'next/app';
import {ApolloProvider, NormalizedCacheObject} from '@apollo/client';
import useApolloClient, {
  initializeApolloClient,
} from '../utils/useApolloClient';
import {ViewerContext, ViewerQ} from '../utils/useViewerContext';
import {
  useViewerContextProviderQuery,
  ViewerContextProviderQuery,
} from '../types/graphql';
import {useRouter} from 'next/router';
import absoluteUrl from 'next-absolute-url';
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

const App = ({Component, pageProps, initialApolloState}: AppProps & Props) => {
  const client = useApolloClient(initialApolloState);
  const customTheme = useMemo(
    () => ({
      token: {
        fontSizeHeading5: theme.defaultConfig.token.fontSize,
      },
    }),
    [],
  );

  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <ConfigProvider locale={deDE} theme={customTheme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </LoginProvider>
    </ApolloProvider>
  );
};

App.getInitialProps = async (
  app: AppContext,
): Promise<AppInitialProps & Props> => {
  const cookie = app.router.query.token
    ? `token=${app.router.query.token}`
    : app.ctx.req?.headers.cookie;

  const appProps = await NextApp.getInitialProps(app);

  let initialApolloState: NormalizedCacheObject | undefined;

  if (cookie && typeof window === 'undefined') {
    const apolloClient = initializeApolloClient(null, cookie);
    initialApolloState = await apolloClient
      .query<ViewerContextProviderQuery>({
        query: ViewerQ,
      })
      .then(({data}) => {
        if (data.viewer) {
          return apolloClient.cache.extract();
        }
      })
      .catch(() => undefined);
  }

  return {
    ...appProps,
    initialApolloState,
  };
};

function LoginProvider({children}: {children: React.ReactNode}) {
  const {data, loading} = useViewerContextProviderQuery();
  const router = useRouter();

  if (loading) {
    // haven't loaded data yet
    return null;
  } else if (data?.viewer == null) {
    // loaded, but no viewer
    const authUrl = new URL('https://api.kulturspektakel.de/auth');
    authUrl.searchParams.append('state', absoluteUrl().origin);
    router.push(authUrl.toString());
    return null;
  } else {
    // we have viewer
    return (
      <ViewerContext.Provider value={data.viewer}>
        {children}
      </ViewerContext.Provider>
    );
  }
}

export default App;
