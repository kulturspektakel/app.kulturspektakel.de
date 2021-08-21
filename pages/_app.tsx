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
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import absoluteUrl from 'next-absolute-url';

type Props = {
  initialApolloState: NormalizedCacheObject;
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

function LoginProvider({children}) {
  const {data} = useViewerContextProviderQuery();

  const router = useRouter();
  useEffect(() => {
    if (data && data.viewer == null) {
      const authUrl = new URL('https://api.kulturspektakel.de/auth');
      authUrl.searchParams.append('state', absoluteUrl().origin);
      router.push(authUrl.toString());
    }
  }, [data]);

  if (!data?.viewer) {
    return null;
  }

  return (
    <ViewerContext.Provider value={data.viewer}>
      {children}
    </ViewerContext.Provider>
  );
}

export default App;
