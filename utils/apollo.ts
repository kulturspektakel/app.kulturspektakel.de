import 'antd/dist/antd.css';
import {useMemo} from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {withScalars} from 'apollo-link-scalars';
import {buildClientSchema, IntrospectionQuery} from 'graphql';
import {GraphQLDate, GraphQLDateTime} from 'graphql-scalars';
import introspectionResult from '../types/graphql.schema.json';

function createApolloClient(cookie?: string) {
  const scalarLink: ApolloLink = withScalars({
    schema: buildClientSchema(
      (introspectionResult as unknown) as IntrospectionQuery,
    ),
    typesMap: {
      DateTime: GraphQLDateTime,
      Date: GraphQLDate,
    },
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: ApolloLink.from([
      scalarLink,
      new HttpLink({
        uri: 'https://api.kulturspektakel.de/graphql',
        credentials: 'include',
        headers: {
          cookie,
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });
}
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  cookie?: string,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(cookie);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({...existingCache, ...initialState});
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
