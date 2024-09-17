import {useRef} from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {withScalars} from 'apollo-link-scalars';
import {buildClientSchema, IntrospectionQuery} from 'graphql';
import {GraphQLDate, GraphQLDateTime} from 'graphql-scalars';
import introspectionResult from '../types/graphql.schema.json';
import {onError} from '@apollo/client/link/error';

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
        onError(({graphQLErrors}) => {
          if (
            graphQLErrors?.some(
              ({extensions}) => extensions?.code === 'UNAUTHORIZED',
            )
          ) {
            location.href = 'https://crew.kulturspektakel.de/admin/login';
          }
        }),
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
