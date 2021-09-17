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

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  id: Scalars['ID'];
  bandname: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  genreCategory: GenreCategory;
  facebook?: Maybe<Scalars['String']>;
  facebookLikes?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  email: Scalars['String'];
  city: Scalars['String'];
  demo?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  instagramFollower?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Float']>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
  knowsKultFrom?: Maybe<Scalars['String']>;
  contactedByViewer?: Maybe<Viewer>;
  bandApplicationRating: Array<BandApplicationRating>;
  rating?: Maybe<Scalars['Float']>;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  viewer: Viewer;
  rating: Scalars['Int'];
};

export type Billable = {
  salesNumbers: SalesNumber;
};

export type BillableSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Config = {
  __typename?: 'Config';
  reservationStart: Scalars['DateTime'];
  tokenValue: Scalars['Int'];
  bandApplicationDeadline: Scalars['DateTime'];
};

export type CreateBandApplicationInput = {
  email: Scalars['String'];
  bandname: Scalars['String'];
  genreCategory: GenreCategory;
  genre?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  demo: Scalars['String'];
  description: Scalars['String'];
  numberOfArtists: Scalars['Int'];
  numberOfNonMaleArtists: Scalars['Int'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  knowsKultFrom?: Maybe<Scalars['String']>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
};

export type Device = Billable & {
  __typename?: 'Device';
  salesNumbers: SalesNumber;
  id: Scalars['ID'];
  productList?: Maybe<ProductList>;
  lastSeen?: Maybe<Scalars['DateTime']>;
};

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Event = Node & {
  __typename?: 'Event';
  /** Unique identifier for the resource */
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplication: Array<BandApplication>;
};

export enum GenreCategory {
  Rock = 'Rock',
  Pop = 'Pop',
  Indie = 'Indie',
  ReggaeSka = 'Reggae_Ska',
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  FolkSingerSongwriterCountry = 'Folk_SingerSongwriter_Country',
  ElektroHipHop = 'Elektro_HipHop',
  HardrockMetalPunk = 'Hardrock_Metal_Punk',
  Other = 'Other',
}

export enum HeardAboutBookingFrom {
  BYon = 'BYon',
  Newspaper = 'Newspaper',
  Friends = 'Friends',
  Website = 'Website',
  Facebook = 'Facebook',
}

export type HistoricalProduct = Billable & {
  __typename?: 'HistoricalProduct';
  salesNumbers: SalesNumber;
  name: Scalars['String'];
  productListId: Scalars['Int'];
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
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
  swapReservations?: Maybe<Scalars['Boolean']>;
  createBandApplication?: Maybe<BandApplication>;
  markBandApplicationContacted?: Maybe<BandApplication>;
  rateBandApplication?: Maybe<BandApplication>;
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
  primaryPerson?: Maybe<Scalars['String']>;
};

export type MutationCheckInReservationArgs = {
  id: Scalars['Int'];
  checkedInPersons: Scalars['Int'];
};

export type MutationCreateOrderArgs = {
  products: Array<OrderItemInput>;
  payment: OrderPayment;
  clientId?: Maybe<Scalars['String']>;
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
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
  active?: Maybe<Scalars['Boolean']>;
  products?: Maybe<Array<ProductInput>>;
};

export type MutationSwapReservationsArgs = {
  a: Scalars['Int'];
  b: Scalars['Int'];
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: Maybe<Scalars['Int']>;
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
  deviceTime: Scalars['DateTime'];
  deviceId: Scalars['String'];
  items: Array<OrderItem>;
  total?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  name: Scalars['String'];
  productList?: Maybe<ProductList>;
  perUnitPrice: Scalars['Int'];
};

export type OrderItemInput = {
  perUnitPrice: Scalars['Int'];
  name: Scalars['String'];
  amount: Scalars['Int'];
  productListId?: Maybe<Scalars['Int']>;
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

export type Product = Billable & {
  __typename?: 'Product';
  salesNumbers: SalesNumber;
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit: Scalars['Boolean'];
  productListId: Scalars['Int'];
};

export type ProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit?: Maybe<Scalars['Boolean']>;
};

export type ProductList = Billable & {
  __typename?: 'ProductList';
  salesNumbers: SalesNumber;
  id: Scalars['Int'];
  name: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  product: Array<Product>;
  historicalProducts: Array<HistoricalProduct>;
};

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  reservationForToken?: Maybe<Reservation>;
  viewer?: Maybe<Viewer>;
  node?: Maybe<Node>;
  productLists: Array<ProductList>;
  config?: Maybe<Config>;
  availableCapacity: Scalars['Int'];
  reservationsByPerson: Array<ReservationByPerson>;
  devices: Array<Device>;
  productList?: Maybe<ProductList>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
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

export type QueryProductListArgs = {
  id: Scalars['Int'];
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['Int'];
  status: ReservationStatus;
  token: Scalars['String'];
  table: Table;
  tableId: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  primaryPerson: Scalars['String'];
  primaryEmail: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  checkedInPersons: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  checkInTime?: Maybe<Scalars['DateTime']>;
  swappableWith: Array<Maybe<Reservation>>;
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

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  total: Scalars['Float'];
  timeSeries: Array<TimeSeries>;
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: Maybe<TimeGrouping>;
};

export type Table = Node & {
  __typename?: 'Table';
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

export enum TimeGrouping {
  Hour = 'Hour',
  Day = 'Day',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Viewer = Node & {
  __typename?: 'Viewer';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type ApplicationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ApplicationDetailsQuery = {__typename?: 'Query'} & {
  node?: Maybe<
    | {__typename?: 'Area'}
    | ({__typename?: 'BandApplication'} & Pick<
        BandApplication,
        | 'id'
        | 'bandname'
        | 'instagram'
        | 'instagramFollower'
        | 'facebook'
        | 'facebookLikes'
        | 'description'
        | 'knowsKultFrom'
        | 'heardAboutBookingFrom'
        | 'contactName'
        | 'contactPhone'
        | 'email'
        | 'demo'
      > &
        RatingFragment)
    | {__typename?: 'Event'}
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
  >;
};

export type ContactedByFragment = {__typename?: 'BandApplication'} & {
  contactedByViewer?: Maybe<
    {__typename?: 'Viewer'} & Pick<Viewer, 'id' | 'displayName'>
  >;
};

export type MarkAsContextedMutationVariables = Exact<{
  id: Scalars['ID'];
  contacted: Scalars['Boolean'];
}>;

export type MarkAsContextedMutation = {__typename?: 'Mutation'} & {
  markBandApplicationContacted?: Maybe<
    {__typename?: 'BandApplication'} & Pick<BandApplication, 'id'> &
      ContactedByFragment
  >;
};

export type BandApplicationRatingMutationVariables = Exact<{
  id: Scalars['ID'];
  rating?: Maybe<Scalars['Int']>;
}>;

export type BandApplicationRatingMutation = {__typename?: 'Mutation'} & {
  rateBandApplication?: Maybe<
    {__typename?: 'BandApplication'} & Pick<BandApplication, 'id'> &
      RatingFragment
  >;
};

export type ProductListFragment = {__typename?: 'ProductList'} & Pick<
  ProductList,
  'id' | 'name' | 'emoji'
> & {
    product: Array<
      {__typename?: 'Product'} & Pick<Product, 'id'> & ProductRowFragment
    >;
  };

export type UpsertProductListMutationVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
  emoji?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductInput> | ProductInput>;
  active?: Maybe<Scalars['Boolean']>;
}>;

export type UpsertProductListMutation = {__typename?: 'Mutation'} & {
  upsertProductList?: Maybe<{__typename?: 'ProductList'} & ProductListFragment>;
};

export type ProductRowFragment = {__typename?: 'Product'} & Pick<
  Product,
  'id' | 'name' | 'price' | 'requiresDeposit'
>;

export type RevenueDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
  grouping: TimeGrouping;
}>;

export type RevenueDetailsQuery = {__typename?: 'Query'} & {
  productList?: Maybe<
    {__typename?: 'ProductList'} & Pick<ProductList, 'id' | 'name'> & {
        salesNumbers: {__typename?: 'SalesNumber'} & {
          timeSeries: Array<
            {__typename?: 'TimeSeries'} & Pick<TimeSeries, 'time' | 'value'>
          >;
        };
        historicalProducts: Array<
          {__typename?: 'HistoricalProduct'} & Pick<
            HistoricalProduct,
            'name'
          > & {
              salesNumbers: {__typename?: 'SalesNumber'} & Pick<
                SalesNumber,
                'count' | 'total'
              >;
            }
        >;
      }
  >;
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
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'}
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
    | {__typename?: 'Viewer'}
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
  | 'primaryEmail'
  | 'otherPersons'
  | 'note'
  | 'availableToCheckIn'
> & {
    reservationsFromSamePerson: Array<
      {__typename?: 'Reservation'} & Pick<
        Reservation,
        'id' | 'startTime' | 'endTime' | 'otherPersons'
      > & {
          table: {__typename?: 'Table'} & Pick<Table, 'id'> & {
              area: {__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'>;
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
    swappableWith: Array<
      Maybe<
        {__typename?: 'Reservation'} & Pick<
          Reservation,
          'id' | 'primaryPerson' | 'status'
        > & {table: {__typename?: 'Table'} & Pick<Table, 'id' | 'displayName'>}
      >
    >;
  };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['Int'];
  persons?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  tableId?: Maybe<Scalars['ID']>;
  primaryPerson?: Maybe<Scalars['String']>;
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

export type UpdateOtherPersonsMutationVariables = Exact<{
  token: Scalars['String'];
  otherPersons: Array<Scalars['String']> | Scalars['String'];
}>;

export type UpdateOtherPersonsMutation = {__typename?: 'Mutation'} & {
  updateReservationOtherPersons?: Maybe<
    {__typename?: 'Reservation'} & ReservationFragmentFragment
  >;
};

export type SwapReservationsMutationVariables = Exact<{
  a: Scalars['Int'];
  b: Scalars['Int'];
}>;

export type SwapReservationsMutation = {__typename?: 'Mutation'} & Pick<
  Mutation,
  'swapReservations'
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
    areas: Array<{__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'>>;
  };

export type RatingFragment = {__typename?: 'BandApplication'} & Pick<
  BandApplication,
  'rating'
> & {
    bandApplicationRating: Array<
      {__typename?: 'BandApplicationRating'} & Pick<
        BandApplicationRating,
        'rating'
      > & {
          viewer: {__typename?: 'Viewer'} & Pick<
            Viewer,
            'id' | 'displayName' | 'profilePicture'
          >;
        }
    >;
  };

export type BandApplcationsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type BandApplcationsQuery = {__typename?: 'Query'} & {
  viewer?: Maybe<{__typename?: 'Viewer'} & Pick<Viewer, 'id'>>;
  node?: Maybe<
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | ({__typename?: 'Event'} & {
        bandApplication: Array<
          {__typename?: 'BandApplication'} & Pick<
            BandApplication,
            | 'id'
            | 'bandname'
            | 'rating'
            | 'city'
            | 'genre'
            | 'genreCategory'
            | 'distance'
            | 'facebookLikes'
            | 'instagramFollower'
          > &
            ContactedByFragment &
            RatingFragment
        >;
      })
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
  >;
};

export type EventsQueryVariables = Exact<{[key: string]: never}>;

export type EventsQuery = {__typename?: 'Query'} & {
  events: Array<{__typename?: 'Event'} & Pick<Event, 'id' | 'name'>>;
};

export type ProductListQueryVariables = Exact<{[key: string]: never}>;

export type ProductListQuery = {__typename?: 'Query'} & {
  productLists: Array<
    {__typename?: 'ProductList'} & Pick<ProductList, 'id'> & ProductListFragment
  >;
};

export type CreateProductListMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateProductListMutation = {__typename?: 'Mutation'} & {
  upsertProductList?: Maybe<{__typename?: 'ProductList'} & ProductListFragment>;
};

export type ProductPrintQueryVariables = Exact<{[key: string]: never}>;

export type ProductPrintQuery = {__typename?: 'Query'} & {
  productLists: Array<
    {__typename?: 'ProductList'} & Pick<
      ProductList,
      'id' | 'emoji' | 'name'
    > & {
        product: Array<
          {__typename?: 'Product'} & Pick<
            Product,
            'id' | 'name' | 'price' | 'requiresDeposit'
          >
        >;
      }
  >;
  config?: Maybe<{__typename?: 'Config'} & Pick<Config, 'tokenValue'>>;
};

export type RevenueQueryVariables = Exact<{
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
}>;

export type RevenueQuery = {__typename?: 'Query'} & {
  productLists: Array<
    {__typename?: 'ProductList'} & Pick<ProductList, 'id' | 'name'> & {
        salesNumbers: {__typename?: 'SalesNumber'} & Pick<
          SalesNumber,
          'count' | 'total'
        >;
      }
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

export type OverviewReservationFragment = {__typename?: 'Reservation'} & Pick<
  Reservation,
  | 'id'
  | 'status'
  | 'startTime'
  | 'endTime'
  | 'primaryPerson'
  | 'otherPersons'
  | 'checkedInPersons'
>;

export type OverviewAreasQueryVariables = Exact<{[key: string]: never}>;

export type OverviewAreasQuery = {__typename?: 'Query'} & {
  areas: Array<{__typename?: 'Area'} & Pick<Area, 'id' | 'displayName'>>;
};

export type OverviewQueryVariables = Exact<{
  area: Scalars['ID'];
  day: Scalars['Date'];
}>;

export type OverviewQuery = {__typename?: 'Query'} & {
  node?: Maybe<
    | ({__typename?: 'Area'} & {
        table: Array<
          {__typename?: 'Table'} & Pick<
            Table,
            'id' | 'displayName' | 'maxCapacity'
          > & {
              reservations: Array<
                {__typename?: 'Reservation'} & Pick<Reservation, 'id'> &
                  OverviewReservationFragment
              >;
            }
        >;
      })
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'}
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
  >;
};

export type ViewerContextProviderQueryVariables = Exact<{[key: string]: never}>;

export type ViewerContextProviderQuery = {__typename?: 'Query'} & {
  viewer?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      'id' | 'profilePicture' | 'displayName'
    >
  >;
};

export const ContactedByFragmentDoc = gql`
  fragment ContactedBy on BandApplication {
    contactedByViewer {
      id
      displayName
    }
  }
`;
export const ProductRowFragmentDoc = gql`
  fragment ProductRow on Product {
    id
    name
    price
    requiresDeposit
  }
`;
export const ProductListFragmentDoc = gql`
  fragment ProductList on ProductList {
    id
    name
    emoji
    product {
      id
      ...ProductRow
    }
  }
  ${ProductRowFragmentDoc}
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
    primaryEmail
    otherPersons
    note
    reservationsFromSamePerson {
      id
      startTime
      endTime
      otherPersons
      table {
        id
        area {
          id
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
    swappableWith {
      id
      primaryPerson
      status
      table {
        id
        displayName
      }
    }
  }
`;
export const RatingFragmentDoc = gql`
  fragment Rating on BandApplication {
    bandApplicationRating {
      viewer {
        id
        displayName
        profilePicture
      }
      rating
    }
    rating
  }
`;
export const OverviewReservationFragmentDoc = gql`
  fragment OverviewReservation on Reservation {
    id
    status
    startTime
    endTime
    primaryPerson
    otherPersons
    checkedInPersons
  }
`;
export const ApplicationDetailsDocument = gql`
  query ApplicationDetails($id: ID!) {
    node(id: $id) {
      ... on BandApplication {
        id
        bandname
        instagram
        instagramFollower
        facebook
        facebookLikes
        description
        knowsKultFrom
        heardAboutBookingFrom
        contactName
        contactPhone
        email
        demo
        ...Rating
      }
    }
  }
  ${RatingFragmentDoc}
`;

/**
 * __useApplicationDetailsQuery__
 *
 * To run a query within a React component, call `useApplicationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ApplicationDetailsQuery,
    ApplicationDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    ApplicationDetailsQuery,
    ApplicationDetailsQueryVariables
  >(ApplicationDetailsDocument, options);
}
export function useApplicationDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ApplicationDetailsQuery,
    ApplicationDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ApplicationDetailsQuery,
    ApplicationDetailsQueryVariables
  >(ApplicationDetailsDocument, options);
}
export type ApplicationDetailsQueryHookResult = ReturnType<
  typeof useApplicationDetailsQuery
>;
export type ApplicationDetailsLazyQueryHookResult = ReturnType<
  typeof useApplicationDetailsLazyQuery
>;
export type ApplicationDetailsQueryResult = Apollo.QueryResult<
  ApplicationDetailsQuery,
  ApplicationDetailsQueryVariables
>;
export const MarkAsContextedDocument = gql`
  mutation MarkAsContexted($id: ID!, $contacted: Boolean!) {
    markBandApplicationContacted(
      bandApplicationId: $id
      contacted: $contacted
    ) {
      id
      ...ContactedBy
    }
  }
  ${ContactedByFragmentDoc}
`;
export type MarkAsContextedMutationFn = Apollo.MutationFunction<
  MarkAsContextedMutation,
  MarkAsContextedMutationVariables
>;

/**
 * __useMarkAsContextedMutation__
 *
 * To run a mutation, you first call `useMarkAsContextedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsContextedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsContextedMutation, { data, loading, error }] = useMarkAsContextedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      contacted: // value for 'contacted'
 *   },
 * });
 */
export function useMarkAsContextedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkAsContextedMutation,
    MarkAsContextedMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    MarkAsContextedMutation,
    MarkAsContextedMutationVariables
  >(MarkAsContextedDocument, options);
}
export type MarkAsContextedMutationHookResult = ReturnType<
  typeof useMarkAsContextedMutation
>;
export type MarkAsContextedMutationResult = Apollo.MutationResult<MarkAsContextedMutation>;
export type MarkAsContextedMutationOptions = Apollo.BaseMutationOptions<
  MarkAsContextedMutation,
  MarkAsContextedMutationVariables
>;
export const BandApplicationRatingDocument = gql`
  mutation BandApplicationRating($id: ID!, $rating: Int) {
    rateBandApplication(bandApplicationId: $id, rating: $rating) {
      id
      ...Rating
    }
  }
  ${RatingFragmentDoc}
`;
export type BandApplicationRatingMutationFn = Apollo.MutationFunction<
  BandApplicationRatingMutation,
  BandApplicationRatingMutationVariables
>;

/**
 * __useBandApplicationRatingMutation__
 *
 * To run a mutation, you first call `useBandApplicationRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandApplicationRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandApplicationRatingMutation, { data, loading, error }] = useBandApplicationRatingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useBandApplicationRatingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BandApplicationRatingMutation,
    BandApplicationRatingMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    BandApplicationRatingMutation,
    BandApplicationRatingMutationVariables
  >(BandApplicationRatingDocument, options);
}
export type BandApplicationRatingMutationHookResult = ReturnType<
  typeof useBandApplicationRatingMutation
>;
export type BandApplicationRatingMutationResult = Apollo.MutationResult<BandApplicationRatingMutation>;
export type BandApplicationRatingMutationOptions = Apollo.BaseMutationOptions<
  BandApplicationRatingMutation,
  BandApplicationRatingMutationVariables
>;
export const UpsertProductListDocument = gql`
  mutation UpsertProductList(
    $id: Int
    $emoji: String
    $name: String
    $products: [ProductInput!]
    $active: Boolean
  ) {
    upsertProductList(
      id: $id
      emoji: $emoji
      name: $name
      products: $products
      active: $active
    ) {
      ...ProductList
    }
  }
  ${ProductListFragmentDoc}
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
 *      active: // value for 'active'
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
export const RevenueDetailsDocument = gql`
  query RevenueDetails(
    $id: Int!
    $after: DateTime!
    $before: DateTime!
    $grouping: TimeGrouping!
  ) {
    productList(id: $id) {
      id
      name
      salesNumbers(after: $after, before: $before) {
        timeSeries(grouping: $grouping) {
          time
          value
        }
      }
      historicalProducts {
        name
        salesNumbers(after: $after, before: $before) {
          count
          total
        }
      }
    }
  }
`;

/**
 * __useRevenueDetailsQuery__
 *
 * To run a query within a React component, call `useRevenueDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      grouping: // value for 'grouping'
 *   },
 * });
 */
export function useRevenueDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    RevenueDetailsQuery,
    RevenueDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<RevenueDetailsQuery, RevenueDetailsQueryVariables>(
    RevenueDetailsDocument,
    options,
  );
}
export function useRevenueDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RevenueDetailsQuery,
    RevenueDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<RevenueDetailsQuery, RevenueDetailsQueryVariables>(
    RevenueDetailsDocument,
    options,
  );
}
export type RevenueDetailsQueryHookResult = ReturnType<
  typeof useRevenueDetailsQuery
>;
export type RevenueDetailsLazyQueryHookResult = ReturnType<
  typeof useRevenueDetailsLazyQuery
>;
export type RevenueDetailsQueryResult = Apollo.QueryResult<
  RevenueDetailsQuery,
  RevenueDetailsQueryVariables
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
    $primaryPerson: String
  ) {
    updateReservation(
      id: $id
      checkedInPersons: $persons
      startTime: $startTime
      endTime: $endTime
      note: $note
      tableId: $tableId
      primaryPerson: $primaryPerson
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
 *      primaryPerson: // value for 'primaryPerson'
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
export const UpdateOtherPersonsDocument = gql`
  mutation UpdateOtherPersons($token: String!, $otherPersons: [String!]!) {
    updateReservationOtherPersons(otherPersons: $otherPersons, token: $token) {
      ...ReservationFragment
    }
  }
  ${ReservationFragmentFragmentDoc}
`;
export type UpdateOtherPersonsMutationFn = Apollo.MutationFunction<
  UpdateOtherPersonsMutation,
  UpdateOtherPersonsMutationVariables
>;

/**
 * __useUpdateOtherPersonsMutation__
 *
 * To run a mutation, you first call `useUpdateOtherPersonsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOtherPersonsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOtherPersonsMutation, { data, loading, error }] = useUpdateOtherPersonsMutation({
 *   variables: {
 *      token: // value for 'token'
 *      otherPersons: // value for 'otherPersons'
 *   },
 * });
 */
export function useUpdateOtherPersonsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOtherPersonsMutation,
    UpdateOtherPersonsMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdateOtherPersonsMutation,
    UpdateOtherPersonsMutationVariables
  >(UpdateOtherPersonsDocument, options);
}
export type UpdateOtherPersonsMutationHookResult = ReturnType<
  typeof useUpdateOtherPersonsMutation
>;
export type UpdateOtherPersonsMutationResult = Apollo.MutationResult<UpdateOtherPersonsMutation>;
export type UpdateOtherPersonsMutationOptions = Apollo.BaseMutationOptions<
  UpdateOtherPersonsMutation,
  UpdateOtherPersonsMutationVariables
>;
export const SwapReservationsDocument = gql`
  mutation SwapReservations($a: Int!, $b: Int!) {
    swapReservations(a: $a, b: $b)
  }
`;
export type SwapReservationsMutationFn = Apollo.MutationFunction<
  SwapReservationsMutation,
  SwapReservationsMutationVariables
>;

/**
 * __useSwapReservationsMutation__
 *
 * To run a mutation, you first call `useSwapReservationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwapReservationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [swapReservationsMutation, { data, loading, error }] = useSwapReservationsMutation({
 *   variables: {
 *      a: // value for 'a'
 *      b: // value for 'b'
 *   },
 * });
 */
export function useSwapReservationsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SwapReservationsMutation,
    SwapReservationsMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    SwapReservationsMutation,
    SwapReservationsMutationVariables
  >(SwapReservationsDocument, options);
}
export type SwapReservationsMutationHookResult = ReturnType<
  typeof useSwapReservationsMutation
>;
export type SwapReservationsMutationResult = Apollo.MutationResult<SwapReservationsMutation>;
export type SwapReservationsMutationOptions = Apollo.BaseMutationOptions<
  SwapReservationsMutation,
  SwapReservationsMutationVariables
>;
export const ReservationModalDocument = gql`
  query ReservationModal($token: String!) {
    availableCapacity
    reservationForToken(token: $token) {
      ...ReservationFragment
    }
    areas {
      id
      displayName
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
export const BandApplcationsDocument = gql`
  query BandApplcations($id: ID!) {
    viewer {
      id
    }
    node(id: $id) {
      ... on Event {
        bandApplication {
          id
          bandname
          rating
          city
          genre
          genreCategory
          distance
          facebookLikes
          instagramFollower
          ...ContactedBy
          ...Rating
        }
      }
    }
  }
  ${ContactedByFragmentDoc}
  ${RatingFragmentDoc}
`;

/**
 * __useBandApplcationsQuery__
 *
 * To run a query within a React component, call `useBandApplcationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandApplcationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandApplcationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBandApplcationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    BandApplcationsQuery,
    BandApplcationsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<BandApplcationsQuery, BandApplcationsQueryVariables>(
    BandApplcationsDocument,
    options,
  );
}
export function useBandApplcationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BandApplcationsQuery,
    BandApplcationsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    BandApplcationsQuery,
    BandApplcationsQueryVariables
  >(BandApplcationsDocument, options);
}
export type BandApplcationsQueryHookResult = ReturnType<
  typeof useBandApplcationsQuery
>;
export type BandApplcationsLazyQueryHookResult = ReturnType<
  typeof useBandApplcationsLazyQuery
>;
export type BandApplcationsQueryResult = Apollo.QueryResult<
  BandApplcationsQuery,
  BandApplcationsQueryVariables
>;
export const EventsDocument = gql`
  query Events {
    events {
      id
      name
    }
  }
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<
  EventsQuery,
  EventsQueryVariables
>;
export const ProductListDocument = gql`
  query ProductList {
    productLists {
      id
      ...ProductList
    }
  }
  ${ProductListFragmentDoc}
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
      ...ProductList
    }
  }
  ${ProductListFragmentDoc}
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
export const ProductPrintDocument = gql`
  query ProductPrint {
    productLists {
      id
      emoji
      name
      product {
        id
        name
        price
        requiresDeposit
      }
    }
    config {
      tokenValue
    }
  }
`;

/**
 * __useProductPrintQuery__
 *
 * To run a query within a React component, call `useProductPrintQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductPrintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductPrintQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductPrintQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductPrintQuery,
    ProductPrintQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ProductPrintQuery, ProductPrintQueryVariables>(
    ProductPrintDocument,
    options,
  );
}
export function useProductPrintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductPrintQuery,
    ProductPrintQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ProductPrintQuery, ProductPrintQueryVariables>(
    ProductPrintDocument,
    options,
  );
}
export type ProductPrintQueryHookResult = ReturnType<
  typeof useProductPrintQuery
>;
export type ProductPrintLazyQueryHookResult = ReturnType<
  typeof useProductPrintLazyQuery
>;
export type ProductPrintQueryResult = Apollo.QueryResult<
  ProductPrintQuery,
  ProductPrintQueryVariables
>;
export const RevenueDocument = gql`
  query Revenue($after: DateTime!, $before: DateTime!) {
    productLists {
      id
      name
      salesNumbers(after: $after, before: $before) {
        count
        total
      }
    }
  }
`;

/**
 * __useRevenueQuery__
 *
 * To run a query within a React component, call `useRevenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useRevenueQuery(
  baseOptions: Apollo.QueryHookOptions<RevenueQuery, RevenueQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<RevenueQuery, RevenueQueryVariables>(
    RevenueDocument,
    options,
  );
}
export function useRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RevenueQuery,
    RevenueQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<RevenueQuery, RevenueQueryVariables>(
    RevenueDocument,
    options,
  );
}
export type RevenueQueryHookResult = ReturnType<typeof useRevenueQuery>;
export type RevenueLazyQueryHookResult = ReturnType<typeof useRevenueLazyQuery>;
export type RevenueQueryResult = Apollo.QueryResult<
  RevenueQuery,
  RevenueQueryVariables
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
export const OverviewAreasDocument = gql`
  query OverviewAreas {
    areas {
      id
      displayName
    }
  }
`;

/**
 * __useOverviewAreasQuery__
 *
 * To run a query within a React component, call `useOverviewAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverviewAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverviewAreasQuery({
 *   variables: {
 *   },
 * });
 */
export function useOverviewAreasQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OverviewAreasQuery,
    OverviewAreasQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<OverviewAreasQuery, OverviewAreasQueryVariables>(
    OverviewAreasDocument,
    options,
  );
}
export function useOverviewAreasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OverviewAreasQuery,
    OverviewAreasQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<OverviewAreasQuery, OverviewAreasQueryVariables>(
    OverviewAreasDocument,
    options,
  );
}
export type OverviewAreasQueryHookResult = ReturnType<
  typeof useOverviewAreasQuery
>;
export type OverviewAreasLazyQueryHookResult = ReturnType<
  typeof useOverviewAreasLazyQuery
>;
export type OverviewAreasQueryResult = Apollo.QueryResult<
  OverviewAreasQuery,
  OverviewAreasQueryVariables
>;
export const OverviewDocument = gql`
  query Overview($area: ID!, $day: Date!) {
    node(id: $area) {
      ... on Area {
        table {
          id
          displayName
          maxCapacity
          reservations(day: $day) {
            id
            ...OverviewReservation
          }
        }
      }
    }
  }
  ${OverviewReservationFragmentDoc}
`;

/**
 * __useOverviewQuery__
 *
 * To run a query within a React component, call `useOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverviewQuery({
 *   variables: {
 *      area: // value for 'area'
 *      day: // value for 'day'
 *   },
 * });
 */
export function useOverviewQuery(
  baseOptions: Apollo.QueryHookOptions<OverviewQuery, OverviewQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<OverviewQuery, OverviewQueryVariables>(
    OverviewDocument,
    options,
  );
}
export function useOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OverviewQuery,
    OverviewQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<OverviewQuery, OverviewQueryVariables>(
    OverviewDocument,
    options,
  );
}
export type OverviewQueryHookResult = ReturnType<typeof useOverviewQuery>;
export type OverviewLazyQueryHookResult = ReturnType<
  typeof useOverviewLazyQuery
>;
export type OverviewQueryResult = Apollo.QueryResult<
  OverviewQuery,
  OverviewQueryVariables
>;
export const ViewerContextProviderDocument = gql`
  query ViewerContextProvider {
    viewer {
      id
      profilePicture
      displayName
    }
  }
`;

/**
 * __useViewerContextProviderQuery__
 *
 * To run a query within a React component, call `useViewerContextProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerContextProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerContextProviderQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerContextProviderQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ViewerContextProviderQuery,
    ViewerContextProviderQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    ViewerContextProviderQuery,
    ViewerContextProviderQueryVariables
  >(ViewerContextProviderDocument, options);
}
export function useViewerContextProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ViewerContextProviderQuery,
    ViewerContextProviderQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ViewerContextProviderQuery,
    ViewerContextProviderQueryVariables
  >(ViewerContextProviderDocument, options);
}
export type ViewerContextProviderQueryHookResult = ReturnType<
  typeof useViewerContextProviderQuery
>;
export type ViewerContextProviderLazyQueryHookResult = ReturnType<
  typeof useViewerContextProviderLazyQuery
>;
export type ViewerContextProviderQueryResult = Apollo.QueryResult<
  ViewerContextProviderQuery,
  ViewerContextProviderQueryVariables
>;
