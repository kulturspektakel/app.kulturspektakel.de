import {useRef} from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {withScalars} from 'apollo-link-scalars';
import {buildClientSchema, IntrospectionQuery} from 'graphql';
import {GraphQLDate, GraphQLDateTime} from 'graphql-scalars';
import introspectionResult from '../types/graphql.schema.json';
import jwtDecode from 'jwt-decode';

let token: string | null = null;
// prevent multiple refresh operations to run in parallel
let refresher: Promise<Response> | null = null;

const authMiddleware = setContext(async (operation) => {
  if (operation.operationName?.startsWith('Public')) {
    return;
  }
  if (
    token == null ||
    jwtDecode<{exp: number}>(token).exp < new Date().getTime() / 1000
  ) {
    if (!refresher) {
      refresher = fetch('https://crew.kulturspektakel.de/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
    }

    const res = await refresher;
    refresher = null;
    token = null;
    if (res.status === 400) {
      // tried refreshing, but couldn't
      location.href = 'https://crew.kulturspektakel.de/admin/login';
    } else {
      token = (await res?.json())?.data?.access_token ?? null;
    }
  }

  return {
    headers:
      token != null
        ? {
            authorization: `Bearer ${token}`,
          }
        : undefined,
  };
});

export default function useApolloClient() {
  const client = useRef(
    new ApolloClient({
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
        authMiddleware,
        new HttpLink({
          uri: 'https://api.kulturspektakel.de/graphql',
          credentials: 'include',
        }),
      ]),
      cache: new InMemoryCache(),
    }),
  );

  return client.current;
}
