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
  table: Array<Table>;
  maxCapacity: Scalars['Int'];
  openingHour: Array<Availability>;
  currentCapacity: Scalars['Int'];
  availableCapacity: Scalars['Int'];
  availability: Array<Availability>;
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

export type AreaAvailabilityArgs = {
  partySize: Scalars['Int'];
  day: Scalars['Date'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type Availability = {
  __typename?: 'Availability';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type Band = {
  __typename?: 'Band';
  id: Scalars['Int'];
  name: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelReservation?: Maybe<Scalars['Boolean']>;
  confirmReservation?: Maybe<Reservation>;
  requestReservation: Scalars['Boolean'];
  updateReservation?: Maybe<Reservation>;
  checkInReservation?: Maybe<Reservation>;
  createOrder?: Maybe<Order>;
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
};

export type MutationUpdateReservationArgs = {
  token: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
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

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars['ID'];
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

export type ProductProductListIdOrderCompoundUniqueInput = {
  productListId: Scalars['Int'];
  order: Scalars['Int'];
};

export type ProductWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  productListId_order?: Maybe<ProductProductListIdOrderCompoundUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  reservationForToken?: Maybe<Reservation>;
  viewer?: Maybe<Viewer>;
  node?: Maybe<Node>;
  productLists: Array<ProductList>;
  orders: Array<Order>;
};

export type QueryReservationForTokenArgs = {
  token: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
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
  reservationsFromSamePerson: Array<Reservation>;
};

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
  Cleared = 'Cleared',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Table = {
  __typename?: 'Table';
  id: Scalars['String'];
  displayName: Scalars['String'];
  maxCapacity: Scalars['Int'];
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

export type NumbersFragment = {__typename?: 'Area'} & Pick<
  Area,
  'maxCapacity' | 'currentCapacity' | 'availableCapacity'
>;

export type SlotsQueryVariables = Exact<{
  areaId: Scalars['ID'];
  day?: Maybe<Scalars['Date']>;
}>;

export type SlotsQuery = {__typename?: 'Query'} & {
  node?: Maybe<
    {__typename?: 'Area'} & Pick<Area, 'id'> & {
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
          {__typename?: 'Availability'} & Pick<
            Availability,
            'startTime' | 'endTime'
          >
        >;
      } & NumbersFragment
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
>;

export type CheckInMutationVariables = Exact<{
  persons: Scalars['Int'];
  id: Scalars['Int'];
}>;

export type CheckInMutation = {__typename?: 'Mutation'} & {
  checkInReservation?: Maybe<
    {__typename?: 'Reservation'} & Pick<
      Reservation,
      'id' | 'status' | 'checkedInPersons'
    > & {
        table: {__typename?: 'Table'} & {
          area: {__typename?: 'Area'} & Pick<
            Area,
            'currentCapacity' | 'maxCapacity' | 'availableCapacity'
          >;
        };
      }
  >;
};

export type ViewerQueryVariables = Exact<{[key: string]: never}>;

export type ViewerQuery = {__typename?: 'Query'} & {
  viewer?: Maybe<
    {__typename?: 'Viewer'} & Pick<Viewer, 'profilePicture' | 'displayName'>
  >;
};

export type TablesQueryVariables = Exact<{[key: string]: never}>;

export type TablesQuery = {__typename?: 'Query'} & {
  areas: Array<{__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'>>;
};

export const NumbersFragmentDoc = gql`
  fragment Numbers on Area {
    maxCapacity
    currentCapacity
    availableCapacity
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
  }
`;
export const SlotsDocument = gql`
  query Slots($areaId: ID!, $day: Date) {
    node(id: $areaId) {
      ... on Area {
        id
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
        ...Numbers
      }
    }
  }
  ${TableRowFragmentDoc}
  ${NumbersFragmentDoc}
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
 *      areaId: // value for 'areaId'
 *      day: // value for 'day'
 *   },
 * });
 */
export function useSlotsQuery(
  baseOptions: Apollo.QueryHookOptions<SlotsQuery, SlotsQueryVariables>,
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
export const CheckInDocument = gql`
  mutation CheckIn($persons: Int!, $id: Int!) {
    checkInReservation(checkedInPersons: $persons, id: $id) {
      id
      status
      checkedInPersons
      table {
        area {
          currentCapacity
          maxCapacity
          availableCapacity
        }
      }
    }
  }
`;
export type CheckInMutationFn = Apollo.MutationFunction<
  CheckInMutation,
  CheckInMutationVariables
>;

/**
 * __useCheckInMutation__
 *
 * To run a mutation, you first call `useCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkInMutation, { data, loading, error }] = useCheckInMutation({
 *   variables: {
 *      persons: // value for 'persons'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckInMutation,
    CheckInMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<CheckInMutation, CheckInMutationVariables>(
    CheckInDocument,
    options,
  );
}
export type CheckInMutationHookResult = ReturnType<typeof useCheckInMutation>;
export type CheckInMutationResult = Apollo.MutationResult<CheckInMutation>;
export type CheckInMutationOptions = Apollo.BaseMutationOptions<
  CheckInMutation,
  CheckInMutationVariables
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
export const TablesDocument = gql`
  query Tables {
    areas {
      id
      displayName
    }
  }
`;

/**
 * __useTablesQuery__
 *
 * To run a query within a React component, call `useTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTablesQuery(
  baseOptions?: Apollo.QueryHookOptions<TablesQuery, TablesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<TablesQuery, TablesQueryVariables>(
    TablesDocument,
    options,
  );
}
export function useTablesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TablesQuery, TablesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<TablesQuery, TablesQueryVariables>(
    TablesDocument,
    options,
  );
}
export type TablesQueryHookResult = ReturnType<typeof useTablesQuery>;
export type TablesLazyQueryHookResult = ReturnType<typeof useTablesLazyQuery>;
export type TablesQueryResult = Apollo.QueryResult<
  TablesQuery,
  TablesQueryVariables
>;
