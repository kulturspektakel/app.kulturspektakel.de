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

export type AreaTableArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TableWhereUniqueInput>;
  after?: Maybe<TableWhereUniqueInput>;
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

export type TableAreaIdDisplayNameCompoundUniqueInput = {
  areaId: Scalars['String'];
  displayName: Scalars['String'];
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

export type TableWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  areaId_displayName?: Maybe<TableAreaIdDisplayNameCompoundUniqueInput>;
};

export type Viewer = {
  __typename?: 'Viewer';
  displayName: Scalars['String'];
  email: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

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
