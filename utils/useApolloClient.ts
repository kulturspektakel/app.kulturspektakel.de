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

export function initializeApolloClient(
  initialState: NormalizedCacheObject | null = null,
  cookie?: string,
) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: ApolloLink.from([
      withScalars({
        schema: buildClientSchema(
          introspectionResult as unknown as IntrospectionQuery,
        ),
        typesMap: {
          DateTime: GraphQLDateTime,
          Date: GraphQLDate,
        },
      }),
      new HttpLink({
        uri: 'https://api.kulturspektakel.de/graphql',
        credentials: 'include',
        headers: {cookie: cookie ?? ''},
      }),
    ]),
    cache: initialState
      ? new InMemoryCache().restore(initialState)
      : new InMemoryCache(),
  });
}

function useApolloClient(
  initialState: NormalizedCacheObject | null = null,
  cookie?: string,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const store = useMemo(() => initializeApolloClient(initialState, cookie), []);
  return store;
}
export default useApolloClient;
