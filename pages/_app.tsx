import '../styles/globals.css';
import 'antd/dist/antd.css';
import React from 'react';
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

type Props = {
  initialApolloState: NormalizedCacheObject | undefined;
};

const App = ({Component, pageProps, initialApolloState}: AppProps & Props) => {
  const client = useApolloClient(initialApolloState);

  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </ApolloProvider>
  );
};

App.getInitialProps = async (
  app: AppContext,
): Promise<AppInitialProps & Props> => {
  const apolloClient = initializeApolloClient(
    null,
    app.router.query.token
      ? `token=${app.router.query.token}`
      : app.ctx.req?.headers.cookie,
  );
  const appProps = await NextApp.getInitialProps(app);

  const initialApolloState = await apolloClient
    .query<ViewerContextProviderQuery>({
      query: ViewerQ,
    })
    .then(({data}) => {
      if (data.viewer) {
        return apolloClient.cache.extract();
      }
    })
    .catch(() => undefined);

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
