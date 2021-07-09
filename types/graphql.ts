import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Area = Node & {
  __typename?: 'Area';
  /** Unique identifier for the resource */
  id: Scalars['ID'];
  displayName: Scalars['String'];
  themeColor: Scalars['String'];
  table: Array<Table>;
  openingHour: Array<OpeningHour>;
  availableTables: Scalars['Int'];
  availability: Array<TableAvailability>;
  bandsPlaying: Array<Band>;
};

export type AreaOpeningHourArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type AreaAvailableTablesArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type AreaAvailabilityArgs = {
  partySize: Scalars['Int'];
  day: Scalars['Date'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type Band = {
  __typename?: 'Band';
  id: Scalars['ID'];
  name: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type Config = {
  __typename?: 'Config';
  reservationStart?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateReservationOtherPersons?: Maybe<Reservation>;
  cancelReservation?: Maybe<Scalars['Boolean']>;
  confirmReservation?: Maybe<Reservation>;
  requestReservation: Scalars['Boolean'];
  updateReservation?: Maybe<Reservation>;
  checkInReservation?: Maybe<Reservation>;
  createOrder?: Maybe<Order>;
  createReservation?: Maybe<Reservation>;
  upsertProductList?: Maybe<ProductList>;
  deleteProductList?: Maybe<Scalars['Boolean']>;
};

export type MutationUpdateReservationOtherPersonsArgs = {
  token: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
};

export type MutationCancelReservationArgs = {
  token: Scalars['String'];
};

export type MutationConfirmReservationArgs = {
  token: Scalars['String'];
};

export type MutationRequestReservationArgs = {
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  areaId: Scalars['ID'];
  tableType?: Maybe<TableType>;
};

export type MutationUpdateReservationArgs = {
  id: Scalars['Int'];
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  tableId?: Maybe<Scalars['ID']>;
  checkedInPersons?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
};

export type MutationCheckInReservationArgs = {
  id: Scalars['Int'];
  checkedInPersons: Scalars['Int'];
};

export type MutationCreateOrderArgs = {
  tableId: Scalars['ID'];
  products: Array<OrderItemInput>;
  payment: OrderPayment;
};

export type MutationCreateReservationArgs = {
  tableId: Scalars['ID'];
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
};

export type MutationUpsertProductListArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductInput>>;
};

export type MutationDeleteProductListArgs = {
  id: Scalars['Int'];
};

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars['ID'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  payment: OrderPayment;
  tokens: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  table?: Maybe<Table>;
  items: Array<OrderItem>;
  total?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  name: Scalars['String'];
};

export type OrderItemInput = {
  productId: Scalars['Int'];
  amount: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
};

export enum OrderPayment {
  Cash = 'CASH',
  Bon = 'BON',
  SumUp = 'SUM_UP',
  Voucher = 'VOUCHER',
  FreeCrew = 'FREE_CREW',
  FreeBand = 'FREE_BAND',
}

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type ProductList = {
  __typename?: 'ProductList';
  id: Scalars['Int'];
  name: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  product: Array<Product>;
};

export type ProductListProductArgs = {
  orderBy?: Maybe<Array<ProductListProductOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProductWhereUniqueInput>;
  after?: Maybe<ProductWhereUniqueInput>;
};

export type ProductListProductOrderByInput = {
  order?: Maybe<SortOrder>;
};

export type ProductWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  reservationForToken?: Maybe<Reservation>;
  viewer?: Maybe<Viewer>;
  node?: Maybe<Node>;
  productLists: Array<ProductList>;
  orders: Array<Order>;
  config?: Maybe<Config>;
  availableCapacity: Scalars['Int'];
  reservationsByPerson: Array<ReservationByPerson>;
};

export type QueryReservationForTokenArgs = {
  token: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryAvailableCapacityArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['Int'];
  status: ReservationStatus;
  token: Scalars['String'];
  table: Table;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  checkedInPersons: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  checkInTime?: Maybe<Scalars['DateTime']>;
  alternativeTables: Array<Maybe<Table>>;
  availableToCheckIn: Scalars['Int'];
  reservationsFromSamePerson: Array<Reservation>;
};

export type ReservationByPerson = {
  __typename?: 'ReservationByPerson';
  email: Scalars['String'];
  reservations: Array<Reservation>;
};

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Table = Node & {
  __typename?: 'Table';
  /** Unique identifier for the resource */
  id: Scalars['ID'];
  displayName: Scalars['String'];
  maxCapacity: Scalars['Int'];
  type: TableType;
  area: Area;
  reservations: Array<Reservation>;
};

export type TableReservationsArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type TableAvailability = {
  __typename?: 'TableAvailability';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  tableType: TableType;
};

export enum TableType {
  Table = 'TABLE',
  Island = 'ISLAND',
}

export type Viewer = {
  __typename?: 'Viewer';
  displayName: Scalars['String'];
  email: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type ProductListFragmentFragment = {__typename?: 'ProductList'} & Pick<
  ProductList,
  'id' | 'name' | 'emoji'
> & {
    product: Array<
      {__typename?: 'Product'} & Pick<Product, 'id' | 'name' | 'price'>
    >;
  };

export type UpsertProductListMutationVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
  emoji?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductInput> | ProductInput>;
}>;

export type UpsertProductListMutation = {__typename?: 'Mutation'} & {
  upsertProductList?: Maybe<
    {__typename?: 'ProductList'} & ProductListFragmentFragment
  >;
};

export type DeleteProductListMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteProductListMutation = {__typename?: 'Mutation'} & Pick<
  Mutation,
  'deleteProductList'
>;

export type SlotsQueryVariables = Exact<{
  day?: Maybe<Scalars['Date']>;
}>;

export type SlotsQuery = {__typename?: 'Query'} & {
  areas: Array<
    {__typename?: 'Area'} & Pick<Area, 'id' | 'displayName' | 'themeColor'> & {
        table: Array<
          {__typename?: 'Table'} & Pick<
            Table,
            'id' | 'displayName' | 'maxCapacity'
          > & {
              reservations: Array<
                {__typename?: 'Reservation'} & TableRowFragment
              >;
            }
        >;
        openingHour: Array<
          {__typename?: 'OpeningHour'} & Pick<
            OpeningHour,
            'startTime' | 'endTime'
          >
        >;
      }
  >;
};

export type TableRowFragment = {__typename?: 'Reservation'} & Pick<
  Reservation,
  | 'id'
  | 'startTime'
  | 'endTime'
  | 'primaryPerson'
  | 'otherPersons'
  | 'status'
  | 'checkedInPersons'
  | 'checkInTime'
  | 'token'
>;

export type CreateModalQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type CreateModalQuery = {__typename?: 'Query'} & {
  node?: Maybe<
    | {__typename?: 'Area'}
    | ({__typename?: 'Table'} & Pick<
        Table,
        'id' | 'maxCapacity' | 'displayName'
      > & {
          area: {__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'> & {
              openingHour: Array<
                {__typename?: 'OpeningHour'} & Pick<
                  OpeningHour,
                  'startTime' | 'endTime'
                >
              >;
            };
          reservations: Array<
            {__typename?: 'Reservation'} & Pick<
              Reservation,
              'startTime' | 'endTime'
            >
          >;
        })
  >;
};

export type CreateReservationMutationVariables = Exact<{
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']> | Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  tableId: Scalars['ID'];
}>;

export type CreateReservationMutation = {__typename?: 'Mutation'} & {
  createReservation?: Maybe<
    {__typename?: 'Reservation'} & Pick<Reservation, 'id'>
  >;
};

export type ReservationFragmentFragment = {__typename?: 'Reservation'} & Pick<
  Reservation,
  | 'id'
  | 'startTime'
  | 'endTime'
  | 'status'
  | 'checkedInPersons'
  | 'primaryPerson'
  | 'otherPersons'
  | 'note'
  | 'availableToCheckIn'
> & {
    reservationsFromSamePerson: Array<
      {__typename?: 'Reservation'} & Pick<
        Reservation,
        'id' | 'startTime' | 'endTime' | 'otherPersons'
      > & {
          table: {__typename?: 'Table'} & {
            area: {__typename?: 'Area'} & Pick<Area, 'displayName'>;
          };
        }
    >;
    alternativeTables: Array<
      Maybe<
        {__typename?: 'Table'} & Pick<Table, 'id' | 'displayName'> & {
            area: {__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'>;
          }
      >
    >;
    table: {__typename?: 'Table'} & Pick<
      Table,
      'id' | 'displayName' | 'maxCapacity'
    > & {
        reservations: Array<
          {__typename?: 'Reservation'} & Pick<
            Reservation,
            'id' | 'startTime' | 'endTime' | 'status'
          >
        >;
        area: {__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'> & {
            openingHour: Array<
              {__typename?: 'OpeningHour'} & Pick<
                OpeningHour,
                'startTime' | 'endTime'
              >
            >;
          };
      };
  };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['Int'];
  persons?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  tableId?: Maybe<Scalars['ID']>;
}>;

export type UpdateReservationMutation = {__typename?: 'Mutation'} & {
  updateReservation?: Maybe<
    {__typename?: 'Reservation'} & ReservationFragmentFragment
  >;
};

export type CancelReservationMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type CancelReservationMutation = {__typename?: 'Mutation'} & Pick<
  Mutation,
  'cancelReservation'
>;

export type ReservationModalQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type ReservationModalQuery = {__typename?: 'Query'} & Pick<
  Query,
  'availableCapacity'
> & {
    reservationForToken?: Maybe<
      {__typename?: 'Reservation'} & ReservationFragmentFragment
    >;
  };

export type ViewerQueryVariables = Exact<{[key: string]: never}>;

export type ViewerQuery = {__typename?: 'Query'} & {
  viewer?: Maybe<
    {__typename?: 'Viewer'} & Pick<Viewer, 'profilePicture' | 'displayName'>
  >;
};

export type ProductListQueryVariables = Exact<{[key: string]: never}>;

export type ProductListQuery = {__typename?: 'Query'} & {
  productLists: Array<
    {__typename?: 'ProductList'} & Pick<ProductList, 'id'> &
      ProductListFragmentFragment
  >;
};

export type CreateProductListMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateProductListMutation = {__typename?: 'Mutation'} & {
  upsertProductList?: Maybe<
    {__typename?: 'ProductList'} & ProductListFragmentFragment
  >;
};

export type OverlapQueryVariables = Exact<{[key: string]: never}>;

export type OverlapQuery = {__typename?: 'Query'} & {
  reservationsByPerson: Array<
    {__typename?: 'ReservationByPerson'} & Pick<
      ReservationByPerson,
      'email'
    > & {
        reservations: Array<
          {__typename?: 'Reservation'} & Pick<
            Reservation,
            | 'id'
            | 'status'
            | 'startTime'
            | 'endTime'
            | 'otherPersons'
            | 'primaryPerson'
          > & {
              table: {__typename?: 'Table'} & Pick<
                Table,
                'id' | 'displayName'
              > & {
                  area: {__typename?: 'Area'} & Pick<
                    Area,
                    'id' | 'displayName'
                  >;
                };
            }
        >;
      }
  >;
};

export const ProductListFragmentFragmentDoc = gql`
  fragment ProductListFragment on ProductList {
    id
    name
    emoji
    product {
      id
      name
      price
    }
  }
`;
export const TableRowFragmentDoc = gql`
  fragment TableRow on Reservation {
    id
    startTime
    endTime
    primaryPerson
    otherPersons
    status
    checkedInPersons
    checkInTime
    token
  }
`;
export const ReservationFragmentFragmentDoc = gql`
  fragment ReservationFragment on Reservation {
    id
    startTime
    endTime
    status
    checkedInPersons
    primaryPerson
    otherPersons
    note
    reservationsFromSamePerson {
      id
      startTime
      endTime
      otherPersons
      table {
        area {
          displayName
        }
      }
    }
    availableToCheckIn
    alternativeTables {
      id
      displayName
      area {
        id
        displayName
      }
    }
    table {
      id
      displayName
      maxCapacity
      reservations {
        id
        startTime
        endTime
        status
      }
      area {
        id
        displayName
        openingHour {
          startTime
          endTime
        }
      }
    }
  }
`;
export const UpsertProductListDocument = gql`
  mutation UpsertProductList(
    $id: Int
    $emoji: String
    $name: String
    $products: [ProductInput!]
  ) {
    upsertProductList(
      id: $id
      emoji: $emoji
      name: $name
      products: $products
    ) {
      ...ProductListFragment
    }
  }
  ${ProductListFragmentFragmentDoc}
`;
export type UpsertProductListMutationFn = Apollo.MutationFunction<
  UpsertProductListMutation,
  UpsertProductListMutationVariables
>;

/**
 * __useUpsertProductListMutation__
 *
 * To run a mutation, you first call `useUpsertProductListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertProductListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertProductListMutation, { data, loading, error }] = useUpsertProductListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      emoji: // value for 'emoji'
 *      name: // value for 'name'
 *      products: // value for 'products'
 *   },
 * });
 */
export function useUpsertProductListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertProductListMutation,
    UpsertProductListMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpsertProductListMutation,
    UpsertProductListMutationVariables
  >(UpsertProductListDocument, options);
}
export type UpsertProductListMutationHookResult = ReturnType<
  typeof useUpsertProductListMutation
>;
export type UpsertProductListMutationResult = Apollo.MutationResult<UpsertProductListMutation>;
export type UpsertProductListMutationOptions = Apollo.BaseMutationOptions<
  UpsertProductListMutation,
  UpsertProductListMutationVariables
>;
export const DeleteProductListDocument = gql`
  mutation DeleteProductList($id: Int!) {
    deleteProductList(id: $id)
  }
`;
export type DeleteProductListMutationFn = Apollo.MutationFunction<
  DeleteProductListMutation,
  DeleteProductListMutationVariables
>;

/**
 * __useDeleteProductListMutation__
 *
 * To run a mutation, you first call `useDeleteProductListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductListMutation, { data, loading, error }] = useDeleteProductListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductListMutation,
    DeleteProductListMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    DeleteProductListMutation,
    DeleteProductListMutationVariables
  >(DeleteProductListDocument, options);
}
export type DeleteProductListMutationHookResult = ReturnType<
  typeof useDeleteProductListMutation
>;
export type DeleteProductListMutationResult = Apollo.MutationResult<DeleteProductListMutation>;
export type DeleteProductListMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductListMutation,
  DeleteProductListMutationVariables
>;
export const SlotsDocument = gql`
  query Slots($day: Date) {
    areas {
      id
      displayName
      themeColor
      table {
        id
        displayName
        maxCapacity
        reservations(day: $day) {
          ...TableRow
        }
      }
      openingHour(day: $day) {
        startTime
        endTime
      }
    }
  }
  ${TableRowFragmentDoc}
`;

/**
 * __useSlotsQuery__
 *
 * To run a query within a React component, call `useSlotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsQuery({
 *   variables: {
 *      day: // value for 'day'
 *   },
 * });
 */
export function useSlotsQuery(
  baseOptions?: Apollo.QueryHookOptions<SlotsQuery, SlotsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<SlotsQuery, SlotsQueryVariables>(
    SlotsDocument,
    options,
  );
}
export function useSlotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlotsQuery, SlotsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<SlotsQuery, SlotsQueryVariables>(
    SlotsDocument,
    options,
  );
}
export type SlotsQueryHookResult = ReturnType<typeof useSlotsQuery>;
export type SlotsLazyQueryHookResult = ReturnType<typeof useSlotsLazyQuery>;
export type SlotsQueryResult = Apollo.QueryResult<
  SlotsQuery,
  SlotsQueryVariables
>;
export const CreateModalDocument = gql`
  query CreateModal($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        maxCapacity
        displayName
        area {
          id
          displayName
          openingHour {
            startTime
            endTime
          }
        }
        reservations {
          startTime
          endTime
        }
      }
    }
  }
`;

/**
 * __useCreateModalQuery__
 *
 * To run a query within a React component, call `useCreateModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateModalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateModalQuery(
  baseOptions: Apollo.QueryHookOptions<
    CreateModalQuery,
    CreateModalQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<CreateModalQuery, CreateModalQueryVariables>(
    CreateModalDocument,
    options,
  );
}
export function useCreateModalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CreateModalQuery,
    CreateModalQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<CreateModalQuery, CreateModalQueryVariables>(
    CreateModalDocument,
    options,
  );
}
export type CreateModalQueryHookResult = ReturnType<typeof useCreateModalQuery>;
export type CreateModalLazyQueryHookResult = ReturnType<
  typeof useCreateModalLazyQuery
>;
export type CreateModalQueryResult = Apollo.QueryResult<
  CreateModalQuery,
  CreateModalQueryVariables
>;
export const CreateReservationDocument = gql`
  mutation CreateReservation(
    $primaryEmail: String!
    $primaryPerson: String!
    $otherPersons: [String!]!
    $startTime: DateTime!
    $endTime: DateTime!
    $note: String
    $tableId: ID!
  ) {
    createReservation(
      primaryEmail: $primaryEmail
      primaryPerson: $primaryPerson
      otherPersons: $otherPersons
      startTime: $startTime
      endTime: $endTime
      note: $note
      tableId: $tableId
    ) {
      id
    }
  }
`;
export type CreateReservationMutationFn = Apollo.MutationFunction<
  CreateReservationMutation,
  CreateReservationMutationVariables
>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      primaryEmail: // value for 'primaryEmail'
 *      primaryPerson: // value for 'primaryPerson'
 *      otherPersons: // value for 'otherPersons'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      note: // value for 'note'
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useCreateReservationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReservationMutation,
    CreateReservationMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreateReservationMutation,
    CreateReservationMutationVariables
  >(CreateReservationDocument, options);
}
export type CreateReservationMutationHookResult = ReturnType<
  typeof useCreateReservationMutation
>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<
  CreateReservationMutation,
  CreateReservationMutationVariables
>;
export const UpdateReservationDocument = gql`
  mutation UpdateReservation(
    $id: Int!
    $persons: Int
    $startTime: DateTime
    $endTime: DateTime
    $note: String
    $tableId: ID
  ) {
    updateReservation(
      id: $id
      checkedInPersons: $persons
      startTime: $startTime
      endTime: $endTime
      note: $note
      tableId: $tableId
    ) {
      ...ReservationFragment
    }
  }
  ${ReservationFragmentFragmentDoc}
`;
export type UpdateReservationMutationFn = Apollo.MutationFunction<
  UpdateReservationMutation,
  UpdateReservationMutationVariables
>;

/**
 * __useUpdateReservationMutation__
 *
 * To run a mutation, you first call `useUpdateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationMutation, { data, loading, error }] = useUpdateReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      persons: // value for 'persons'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      note: // value for 'note'
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useUpdateReservationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateReservationMutation,
    UpdateReservationMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdateReservationMutation,
    UpdateReservationMutationVariables
  >(UpdateReservationDocument, options);
}
export type UpdateReservationMutationHookResult = ReturnType<
  typeof useUpdateReservationMutation
>;
export type UpdateReservationMutationResult = Apollo.MutationResult<UpdateReservationMutation>;
export type UpdateReservationMutationOptions = Apollo.BaseMutationOptions<
  UpdateReservationMutation,
  UpdateReservationMutationVariables
>;
export const CancelReservationDocument = gql`
  mutation CancelReservation($token: String!) {
    cancelReservation(token: $token)
  }
`;
export type CancelReservationMutationFn = Apollo.MutationFunction<
  CancelReservationMutation,
  CancelReservationMutationVariables
>;

/**
 * __useCancelReservationMutation__
 *
 * To run a mutation, you first call `useCancelReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservationMutation, { data, loading, error }] = useCancelReservationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCancelReservationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelReservationMutation,
    CancelReservationMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CancelReservationMutation,
    CancelReservationMutationVariables
  >(CancelReservationDocument, options);
}
export type CancelReservationMutationHookResult = ReturnType<
  typeof useCancelReservationMutation
>;
export type CancelReservationMutationResult = Apollo.MutationResult<CancelReservationMutation>;
export type CancelReservationMutationOptions = Apollo.BaseMutationOptions<
  CancelReservationMutation,
  CancelReservationMutationVariables
>;
export const ReservationModalDocument = gql`
  query ReservationModal($token: String!) {
    availableCapacity
    reservationForToken(token: $token) {
      ...ReservationFragment
    }
  }
  ${ReservationFragmentFragmentDoc}
`;

/**
 * __useReservationModalQuery__
 *
 * To run a query within a React component, call `useReservationModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationModalQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useReservationModalQuery(
  baseOptions: Apollo.QueryHookOptions<
    ReservationModalQuery,
    ReservationModalQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ReservationModalQuery, ReservationModalQueryVariables>(
    ReservationModalDocument,
    options,
  );
}
export function useReservationModalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReservationModalQuery,
    ReservationModalQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ReservationModalQuery,
    ReservationModalQueryVariables
  >(ReservationModalDocument, options);
}
export type ReservationModalQueryHookResult = ReturnType<
  typeof useReservationModalQuery
>;
export type ReservationModalLazyQueryHookResult = ReturnType<
  typeof useReservationModalLazyQuery
>;
export type ReservationModalQueryResult = Apollo.QueryResult<
  ReservationModalQuery,
  ReservationModalQueryVariables
>;
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      profilePicture
      displayName
    }
  }
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    options,
  );
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    options,
  );
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<
  ViewerQuery,
  ViewerQueryVariables
>;
export const ProductListDocument = gql`
  query ProductList {
    productLists {
      id
      ...ProductListFragment
    }
  }
  ${ProductListFragmentFragmentDoc}
`;

/**
 * __useProductListQuery__
 *
 * To run a query within a React component, call `useProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductListQuery,
    ProductListQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ProductListQuery, ProductListQueryVariables>(
    ProductListDocument,
    options,
  );
}
export function useProductListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductListQuery,
    ProductListQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ProductListQuery, ProductListQueryVariables>(
    ProductListDocument,
    options,
  );
}
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<
  typeof useProductListLazyQuery
>;
export type ProductListQueryResult = Apollo.QueryResult<
  ProductListQuery,
  ProductListQueryVariables
>;
export const CreateProductListDocument = gql`
  mutation CreateProductList($name: String!) {
    upsertProductList(name: $name) {
      ...ProductListFragment
    }
  }
  ${ProductListFragmentFragmentDoc}
`;
export type CreateProductListMutationFn = Apollo.MutationFunction<
  CreateProductListMutation,
  CreateProductListMutationVariables
>;

/**
 * __useCreateProductListMutation__
 *
 * To run a mutation, you first call `useCreateProductListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductListMutation, { data, loading, error }] = useCreateProductListMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProductListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductListMutation,
    CreateProductListMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreateProductListMutation,
    CreateProductListMutationVariables
  >(CreateProductListDocument, options);
}
export type CreateProductListMutationHookResult = ReturnType<
  typeof useCreateProductListMutation
>;
export type CreateProductListMutationResult = Apollo.MutationResult<CreateProductListMutation>;
export type CreateProductListMutationOptions = Apollo.BaseMutationOptions<
  CreateProductListMutation,
  CreateProductListMutationVariables
>;
export const OverlapDocument = gql`
  query Overlap {
    reservationsByPerson {
      email
      reservations {
        id
        status
        startTime
        endTime
        otherPersons
        primaryPerson
        table {
          id
          displayName
          area {
            id
            displayName
          }
        }
      }
    }
  }
`;

/**
 * __useOverlapQuery__
 *
 * To run a query within a React component, call `useOverlapQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverlapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverlapQuery({
 *   variables: {
 *   },
 * });
 */
export function useOverlapQuery(
  baseOptions?: Apollo.QueryHookOptions<OverlapQuery, OverlapQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<OverlapQuery, OverlapQueryVariables>(
    OverlapDocument,
    options,
  );
}
export function useOverlapLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OverlapQuery,
    OverlapQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<OverlapQuery, OverlapQueryVariables>(
    OverlapDocument,
    options,
  );
}
export type OverlapQueryHookResult = ReturnType<typeof useOverlapQuery>;
export type OverlapLazyQueryHookResult = ReturnType<typeof useOverlapLazyQuery>;
export type OverlapQueryResult = Apollo.QueryResult<
  OverlapQuery,
  OverlapQueryVariables
>;
