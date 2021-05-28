import '../styles/globals.css';
import 'antd/dist/antd.css';
import React from 'react';
import NextApp, {AppContext, AppInitialProps, AppProps} from 'next/app';
import {ViewerQuery} from '../types/graphql';
import {ApolloProvider, gql, NormalizedCacheObject} from '@apollo/client';
import {initializeApollo, useApollo} from '../utils/apollo';

const Viewer = gql`
  query Viewer {
    viewer {
      profilePicture
      displayName
    }
  }
`;

type Props = {
  initialApolloState: NormalizedCacheObject;
};

const App = ({Component, pageProps, initialApolloState}: AppProps & Props) => {
  const client = useApollo(initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

App.getInitialProps = async (
  app: AppContext,
): Promise<AppInitialProps & Props> => {
  const apolloClient = initializeApollo(null, app.ctx.req?.headers.cookie);
  const appProps = await NextApp.getInitialProps(app);

  await apolloClient.query<ViewerQuery>({
    query: Viewer,
    errorPolicy: 'ignore',
  });

  return {
    ...appProps,
    initialApolloState: apolloClient.cache.extract(),
  };
};

export default App;
