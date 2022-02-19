import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
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
  availability: Array<TableAvailability>;
  availableTables: Scalars['Int'];
  bandsPlaying: Array<Band>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  openingHour: Array<OpeningHour>;
  table: Array<Table>;
  themeColor: Scalars['String'];
};

export type AreaAvailabilityArgs = {
  day: Scalars['Date'];
  partySize: Scalars['Int'];
};

export type AreaAvailableTablesArgs = {
  time?: InputMaybe<Scalars['DateTime']>;
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type AreaOpeningHourArgs = {
  day?: InputMaybe<Scalars['Date']>;
};

export type Band = {
  __typename?: 'Band';
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  bandApplicationRating: Array<BandApplicationRating>;
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  contactedByViewer?: Maybe<Viewer>;
  demo?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  facebookLikes?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: Maybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  instagramFollower?: Maybe<Scalars['Int']>;
  knowsKultFrom?: Maybe<Scalars['String']>;
  numberOfArtists?: Maybe<Scalars['Int']>;
  numberOfNonMaleArtists?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  website?: Maybe<Scalars['String']>;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int'];
  viewer: Viewer;
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
  bandApplicationDeadline: Scalars['DateTime'];
  reservationStart: Scalars['DateTime'];
  tokenValue: Scalars['Int'];
};

export type CreateBandApplicationInput = {
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  demo: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: InputMaybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: InputMaybe<HeardAboutBookingFrom>;
  instagram?: InputMaybe<Scalars['String']>;
  knowsKultFrom?: InputMaybe<Scalars['String']>;
  numberOfArtists: Scalars['Int'];
  numberOfNonMaleArtists: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type Device = Billable & {
  __typename?: 'Device';
  id: Scalars['ID'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  productList?: Maybe<ProductList>;
  salesNumbers: SalesNumber;
};

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Event = Node & {
  __typename?: 'Event';
  bandApplication: Array<BandApplication>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  bandsPlaying: Array<Band>;
  end: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
};

export enum GenreCategory {
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  ElektroHipHop = 'Elektro_HipHop',
  FolkSingerSongwriterCountry = 'Folk_SingerSongwriter_Country',
  HardrockMetalPunk = 'Hardrock_Metal_Punk',
  Indie = 'Indie',
  Other = 'Other',
  Pop = 'Pop',
  ReggaeSka = 'Reggae_Ska',
  Rock = 'Rock',
}

export enum HeardAboutBookingFrom {
  BYon = 'BYon',
  Facebook = 'Facebook',
  Friends = 'Friends',
  Instagram = 'Instagram',
  Newspaper = 'Newspaper',
  Website = 'Website',
}

export type HistoricalProduct = Billable & {
  __typename?: 'HistoricalProduct';
  name: Scalars['String'];
  productListId: Scalars['Int'];
  salesNumbers: SalesNumber;
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelReservation?: Maybe<Scalars['Boolean']>;
  checkInReservation?: Maybe<Reservation>;
  confirmReservation?: Maybe<Reservation>;
  createBandApplication?: Maybe<BandApplication>;
  createOrder?: Maybe<Order>;
  createReservation?: Maybe<Reservation>;
  markBandApplicationContacted?: Maybe<BandApplication>;
  rateBandApplication?: Maybe<BandApplication>;
  requestReservation: Scalars['Boolean'];
  swapReservations?: Maybe<Scalars['Boolean']>;
  updateReservation?: Maybe<Reservation>;
  updateReservationOtherPersons?: Maybe<Reservation>;
  upsertProductList?: Maybe<ProductList>;
};

export type MutationCancelReservationArgs = {
  token: Scalars['String'];
};

export type MutationCheckInReservationArgs = {
  checkedInPersons: Scalars['Int'];
  id: Scalars['Int'];
};

export type MutationConfirmReservationArgs = {
  token: Scalars['String'];
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
};

export type MutationCreateOrderArgs = {
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  payment: OrderPayment;
  products: Array<OrderItemInput>;
};

export type MutationCreateReservationArgs = {
  endTime: Scalars['DateTime'];
  note?: InputMaybe<Scalars['String']>;
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  startTime: Scalars['DateTime'];
  tableId: Scalars['ID'];
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
};

export type MutationRequestReservationArgs = {
  areaId: Scalars['ID'];
  endTime: Scalars['DateTime'];
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  startTime: Scalars['DateTime'];
  tableType?: InputMaybe<TableType>;
};

export type MutationSwapReservationsArgs = {
  a: Scalars['Int'];
  b: Scalars['Int'];
};

export type MutationUpdateReservationArgs = {
  checkedInPersons?: InputMaybe<Scalars['Int']>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  note?: InputMaybe<Scalars['String']>;
  primaryPerson?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  tableId?: InputMaybe<Scalars['ID']>;
};

export type MutationUpdateReservationOtherPersonsArgs = {
  otherPersons: Array<Scalars['String']>;
  token: Scalars['String'];
};

export type MutationUpsertProductListArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductInput>>;
};

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars['ID'];
};

export type NuclinoPage = {
  __typename?: 'NuclinoPage';
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NuclinoSearchResult = {
  __typename?: 'NuclinoSearchResult';
  highlight: Scalars['String'];
  page: NuclinoPage;
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  deposit: Scalars['Int'];
  deviceId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  items: Array<OrderItem>;
  payment: OrderPayment;
  total?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productList?: Maybe<ProductList>;
};

export type OrderItemInput = {
  amount: Scalars['Int'];
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productListId?: InputMaybe<Scalars['Int']>;
};

export enum OrderPayment {
  Bon = 'BON',
  Cash = 'CASH',
  FreeBand = 'FREE_BAND',
  FreeCrew = 'FREE_CREW',
  KultCard = 'KULT_CARD',
  SumUp = 'SUM_UP',
  Voucher = 'VOUCHER',
}

export enum PreviouslyPlayed {
  No = 'No',
  OtherFormation = 'OtherFormation',
  Yes = 'Yes',
}

export type Product = Billable & {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  productListId: Scalars['Int'];
  requiresDeposit: Scalars['Boolean'];
  salesNumbers: SalesNumber;
};

export type ProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit?: InputMaybe<Scalars['Boolean']>;
};

export type ProductList = Billable & {
  __typename?: 'ProductList';
  active: Scalars['Boolean'];
  emoji?: Maybe<Scalars['String']>;
  historicalProducts: Array<HistoricalProduct>;
  id: Scalars['Int'];
  name: Scalars['String'];
  product: Array<Product>;
  salesNumbers: SalesNumber;
};

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  availableCapacity: Scalars['Int'];
  config?: Maybe<Config>;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
  node?: Maybe<Node>;
  nuclinoPage?: Maybe<NuclinoPage>;
  nuclinoPages: Array<NuclinoSearchResult>;
  productList?: Maybe<ProductList>;
  productLists: Array<ProductList>;
  reservationForToken?: Maybe<Reservation>;
  reservationsByPerson: Array<ReservationByPerson>;
  viewer?: Maybe<Viewer>;
};

export type QueryAvailableCapacityArgs = {
  time?: InputMaybe<Scalars['DateTime']>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryNuclinoPageArgs = {
  id: Scalars['ID'];
};

export type QueryNuclinoPagesArgs = {
  query: Scalars['String'];
};

export type QueryProductListArgs = {
  id: Scalars['Int'];
};

export type QueryReservationForTokenArgs = {
  token: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  alternativeTables: Array<Maybe<Table>>;
  availableToCheckIn: Scalars['Int'];
  checkInTime?: Maybe<Scalars['DateTime']>;
  checkedInPersons: Scalars['Int'];
  endTime: Scalars['DateTime'];
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  reservationsFromSamePerson: Array<Reservation>;
  startTime: Scalars['DateTime'];
  status: ReservationStatus;
  swappableWith: Array<Maybe<Reservation>>;
  table: Table;
  tableId: Scalars['String'];
  token: Scalars['String'];
};

export type ReservationByPerson = {
  __typename?: 'ReservationByPerson';
  email: Scalars['String'];
  reservations: Array<Reservation>;
};

export enum ReservationStatus {
  CheckedIn = 'CheckedIn',
  Confirmed = 'Confirmed',
  Pending = 'Pending',
}

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  timeSeries: Array<TimeSeries>;
  total: Scalars['Float'];
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: InputMaybe<TimeGrouping>;
};

export type Table = Node & {
  __typename?: 'Table';
  area: Area;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  maxCapacity: Scalars['Int'];
  reservations: Array<Reservation>;
  type: TableType;
};

export type TableReservationsArgs = {
  day?: InputMaybe<Scalars['Date']>;
};

export type TableAvailability = {
  __typename?: 'TableAvailability';
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
  tableType: TableType;
};

export enum TableType {
  Island = 'ISLAND',
  Table = 'TABLE',
}

export enum TimeGrouping {
  Day = 'Day',
  Hour = 'Hour',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Viewer = Node & {
  __typename?: 'Viewer';
  displayName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type ApplicationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ApplicationDetailsQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {
        __typename?: 'BandApplication';
        id: string;
        bandname: string;
        instagram?: string | null;
        instagramFollower?: number | null;
        facebook?: string | null;
        facebookLikes?: number | null;
        description?: string | null;
        knowsKultFrom?: string | null;
        heardAboutBookingFrom?: HeardAboutBookingFrom | null;
        contactName: string;
        contactPhone: string;
        email: string;
        demo?: string | null;
        numberOfArtists?: number | null;
        numberOfNonMaleArtists?: number | null;
        hasPreviouslyPlayed?: PreviouslyPlayed | null;
        website?: string | null;
        rating?: number | null;
        bandApplicationRating: Array<{
          __typename?: 'BandApplicationRating';
          rating: number;
          viewer: {
            __typename?: 'Viewer';
            id: string;
            displayName: string;
            profilePicture?: string | null;
          };
        }>;
      }
    | {__typename?: 'Event'}
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
    | null;
};

export type ContactedByFragment = {
  __typename?: 'BandApplication';
  contactedByViewer?: {
    __typename?: 'Viewer';
    id: string;
    displayName: string;
  } | null;
};

export type MarkAsContextedMutationVariables = Exact<{
  id: Scalars['ID'];
  contacted: Scalars['Boolean'];
}>;

export type MarkAsContextedMutation = {
  __typename?: 'Mutation';
  markBandApplicationContacted?: {
    __typename?: 'BandApplication';
    id: string;
    contactedByViewer?: {
      __typename?: 'Viewer';
      id: string;
      displayName: string;
    } | null;
  } | null;
};

export type BandApplicationRatingMutationVariables = Exact<{
  id: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
}>;

export type BandApplicationRatingMutation = {
  __typename?: 'Mutation';
  rateBandApplication?: {
    __typename?: 'BandApplication';
    id: string;
    rating?: number | null;
    bandApplicationRating: Array<{
      __typename?: 'BandApplicationRating';
      rating: number;
      viewer: {
        __typename?: 'Viewer';
        id: string;
        displayName: string;
        profilePicture?: string | null;
      };
    }>;
  } | null;
};

export type ProductListFragment = {
  __typename?: 'ProductList';
  id: number;
  name: string;
  emoji?: string | null;
  active: boolean;
  product: Array<{
    __typename?: 'Product';
    id: number;
    name: string;
    price: number;
    requiresDeposit: boolean;
  }>;
};

export type UpsertProductListMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  emoji?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductInput> | ProductInput>;
  active?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpsertProductListMutation = {
  __typename?: 'Mutation';
  upsertProductList?: {
    __typename?: 'ProductList';
    id: number;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: number;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  } | null;
};

export type ProductRowFragment = {
  __typename?: 'Product';
  id: number;
  name: string;
  price: number;
  requiresDeposit: boolean;
};

export type RevenueDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
  grouping: TimeGrouping;
}>;

export type RevenueDetailsQuery = {
  __typename?: 'Query';
  productList?: {
    __typename?: 'ProductList';
    id: number;
    name: string;
    salesNumbers: {
      __typename?: 'SalesNumber';
      timeSeries: Array<{__typename?: 'TimeSeries'; time: Date; value: number}>;
    };
    historicalProducts: Array<{
      __typename?: 'HistoricalProduct';
      name: string;
      salesNumbers: {__typename?: 'SalesNumber'; count: number; total: number};
    }>;
  } | null;
};

export type SlotsQueryVariables = Exact<{
  day?: InputMaybe<Scalars['Date']>;
}>;

export type SlotsQuery = {
  __typename?: 'Query';
  areas: Array<{
    __typename?: 'Area';
    id: string;
    displayName: string;
    themeColor: string;
    table: Array<{
      __typename?: 'Table';
      id: string;
      displayName: string;
      maxCapacity: number;
      reservations: Array<{
        __typename?: 'Reservation';
        id: number;
        startTime: Date;
        endTime: Date;
        primaryPerson: string;
        otherPersons: Array<string>;
        status: ReservationStatus;
        checkedInPersons: number;
        checkInTime?: Date | null;
        token: string;
      }>;
    }>;
    openingHour: Array<{
      __typename?: 'OpeningHour';
      startTime: Date;
      endTime: Date;
    }>;
  }>;
};

export type TableRowFragment = {
  __typename?: 'Reservation';
  id: number;
  startTime: Date;
  endTime: Date;
  primaryPerson: string;
  otherPersons: Array<string>;
  status: ReservationStatus;
  checkedInPersons: number;
  checkInTime?: Date | null;
  token: string;
};

export type CreateModalQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type CreateModalQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'}
    | {
        __typename?: 'Table';
        id: string;
        maxCapacity: number;
        displayName: string;
        area: {
          __typename?: 'Area';
          id: string;
          displayName: string;
          openingHour: Array<{
            __typename?: 'OpeningHour';
            startTime: Date;
            endTime: Date;
          }>;
        };
        reservations: Array<{
          __typename?: 'Reservation';
          startTime: Date;
          endTime: Date;
        }>;
      }
    | {__typename?: 'Viewer'}
    | null;
};

export type CreateReservationMutationVariables = Exact<{
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']> | Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  note?: InputMaybe<Scalars['String']>;
  tableId: Scalars['ID'];
}>;

export type CreateReservationMutation = {
  __typename?: 'Mutation';
  createReservation?: {__typename?: 'Reservation'; id: number} | null;
};

export type ReservationFragmentFragment = {
  __typename?: 'Reservation';
  id: number;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  checkedInPersons: number;
  primaryPerson: string;
  primaryEmail: string;
  otherPersons: Array<string>;
  note?: string | null;
  availableToCheckIn: number;
  reservationsFromSamePerson: Array<{
    __typename?: 'Reservation';
    id: number;
    startTime: Date;
    endTime: Date;
    otherPersons: Array<string>;
    table: {
      __typename?: 'Table';
      id: string;
      area: {__typename?: 'Area'; id: string; displayName: string};
    };
  }>;
  alternativeTables: Array<{
    __typename?: 'Table';
    id: string;
    displayName: string;
    area: {__typename?: 'Area'; id: string; displayName: string};
  } | null>;
  table: {
    __typename?: 'Table';
    id: string;
    displayName: string;
    maxCapacity: number;
    reservations: Array<{
      __typename?: 'Reservation';
      id: number;
      startTime: Date;
      endTime: Date;
      status: ReservationStatus;
    }>;
    area: {
      __typename?: 'Area';
      id: string;
      displayName: string;
      openingHour: Array<{
        __typename?: 'OpeningHour';
        startTime: Date;
        endTime: Date;
      }>;
    };
  };
  swappableWith: Array<{
    __typename?: 'Reservation';
    id: number;
    primaryPerson: string;
    status: ReservationStatus;
    table: {__typename?: 'Table'; id: string; displayName: string};
  } | null>;
};

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['Int'];
  persons?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  tableId?: InputMaybe<Scalars['ID']>;
  primaryPerson?: InputMaybe<Scalars['String']>;
}>;

export type UpdateReservationMutation = {
  __typename?: 'Mutation';
  updateReservation?: {
    __typename?: 'Reservation';
    id: number;
    startTime: Date;
    endTime: Date;
    status: ReservationStatus;
    checkedInPersons: number;
    primaryPerson: string;
    primaryEmail: string;
    otherPersons: Array<string>;
    note?: string | null;
    availableToCheckIn: number;
    reservationsFromSamePerson: Array<{
      __typename?: 'Reservation';
      id: number;
      startTime: Date;
      endTime: Date;
      otherPersons: Array<string>;
      table: {
        __typename?: 'Table';
        id: string;
        area: {__typename?: 'Area'; id: string; displayName: string};
      };
    }>;
    alternativeTables: Array<{
      __typename?: 'Table';
      id: string;
      displayName: string;
      area: {__typename?: 'Area'; id: string; displayName: string};
    } | null>;
    table: {
      __typename?: 'Table';
      id: string;
      displayName: string;
      maxCapacity: number;
      reservations: Array<{
        __typename?: 'Reservation';
        id: number;
        startTime: Date;
        endTime: Date;
        status: ReservationStatus;
      }>;
      area: {
        __typename?: 'Area';
        id: string;
        displayName: string;
        openingHour: Array<{
          __typename?: 'OpeningHour';
          startTime: Date;
          endTime: Date;
        }>;
      };
    };
    swappableWith: Array<{
      __typename?: 'Reservation';
      id: number;
      primaryPerson: string;
      status: ReservationStatus;
      table: {__typename?: 'Table'; id: string; displayName: string};
    } | null>;
  } | null;
};

export type CancelReservationMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type CancelReservationMutation = {
  __typename?: 'Mutation';
  cancelReservation?: boolean | null;
};

export type UpdateOtherPersonsMutationVariables = Exact<{
  token: Scalars['String'];
  otherPersons: Array<Scalars['String']> | Scalars['String'];
}>;

export type UpdateOtherPersonsMutation = {
  __typename?: 'Mutation';
  updateReservationOtherPersons?: {
    __typename?: 'Reservation';
    id: number;
    startTime: Date;
    endTime: Date;
    status: ReservationStatus;
    checkedInPersons: number;
    primaryPerson: string;
    primaryEmail: string;
    otherPersons: Array<string>;
    note?: string | null;
    availableToCheckIn: number;
    reservationsFromSamePerson: Array<{
      __typename?: 'Reservation';
      id: number;
      startTime: Date;
      endTime: Date;
      otherPersons: Array<string>;
      table: {
        __typename?: 'Table';
        id: string;
        area: {__typename?: 'Area'; id: string; displayName: string};
      };
    }>;
    alternativeTables: Array<{
      __typename?: 'Table';
      id: string;
      displayName: string;
      area: {__typename?: 'Area'; id: string; displayName: string};
    } | null>;
    table: {
      __typename?: 'Table';
      id: string;
      displayName: string;
      maxCapacity: number;
      reservations: Array<{
        __typename?: 'Reservation';
        id: number;
        startTime: Date;
        endTime: Date;
        status: ReservationStatus;
      }>;
      area: {
        __typename?: 'Area';
        id: string;
        displayName: string;
        openingHour: Array<{
          __typename?: 'OpeningHour';
          startTime: Date;
          endTime: Date;
        }>;
      };
    };
    swappableWith: Array<{
      __typename?: 'Reservation';
      id: number;
      primaryPerson: string;
      status: ReservationStatus;
      table: {__typename?: 'Table'; id: string; displayName: string};
    } | null>;
  } | null;
};

export type SwapReservationsMutationVariables = Exact<{
  a: Scalars['Int'];
  b: Scalars['Int'];
}>;

export type SwapReservationsMutation = {
  __typename?: 'Mutation';
  swapReservations?: boolean | null;
};

export type ReservationModalQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type ReservationModalQuery = {
  __typename?: 'Query';
  availableCapacity: number;
  reservationForToken?: {
    __typename?: 'Reservation';
    id: number;
    startTime: Date;
    endTime: Date;
    status: ReservationStatus;
    checkedInPersons: number;
    primaryPerson: string;
    primaryEmail: string;
    otherPersons: Array<string>;
    note?: string | null;
    availableToCheckIn: number;
    reservationsFromSamePerson: Array<{
      __typename?: 'Reservation';
      id: number;
      startTime: Date;
      endTime: Date;
      otherPersons: Array<string>;
      table: {
        __typename?: 'Table';
        id: string;
        area: {__typename?: 'Area'; id: string; displayName: string};
      };
    }>;
    alternativeTables: Array<{
      __typename?: 'Table';
      id: string;
      displayName: string;
      area: {__typename?: 'Area'; id: string; displayName: string};
    } | null>;
    table: {
      __typename?: 'Table';
      id: string;
      displayName: string;
      maxCapacity: number;
      reservations: Array<{
        __typename?: 'Reservation';
        id: number;
        startTime: Date;
        endTime: Date;
        status: ReservationStatus;
      }>;
      area: {
        __typename?: 'Area';
        id: string;
        displayName: string;
        openingHour: Array<{
          __typename?: 'OpeningHour';
          startTime: Date;
          endTime: Date;
        }>;
      };
    };
    swappableWith: Array<{
      __typename?: 'Reservation';
      id: number;
      primaryPerson: string;
      status: ReservationStatus;
      table: {__typename?: 'Table'; id: string; displayName: string};
    } | null>;
  } | null;
  areas: Array<{__typename?: 'Area'; id: string; displayName: string}>;
};

export type RatingFragment = {
  __typename?: 'BandApplication';
  rating?: number | null;
  bandApplicationRating: Array<{
    __typename?: 'BandApplicationRating';
    rating: number;
    viewer: {
      __typename?: 'Viewer';
      id: string;
      displayName: string;
      profilePicture?: string | null;
    };
  }>;
};

export type BandApplcationsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type BandApplcationsQuery = {
  __typename?: 'Query';
  viewer?: {__typename?: 'Viewer'; id: string} | null;
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {
        __typename?: 'Event';
        bandApplication: Array<{
          __typename?: 'BandApplication';
          id: string;
          bandname: string;
          rating?: number | null;
          city: string;
          genre?: string | null;
          genreCategory: GenreCategory;
          distance?: number | null;
          facebookLikes?: number | null;
          instagramFollower?: number | null;
          contactedByViewer?: {
            __typename?: 'Viewer';
            id: string;
            displayName: string;
          } | null;
          bandApplicationRating: Array<{
            __typename?: 'BandApplicationRating';
            rating: number;
            viewer: {
              __typename?: 'Viewer';
              id: string;
              displayName: string;
              profilePicture?: string | null;
            };
          }>;
        }>;
      }
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
    | null;
};

export type EventsQueryVariables = Exact<{[key: string]: never}>;

export type EventsQuery = {
  __typename?: 'Query';
  events: Array<{__typename?: 'Event'; id: string; name: string}>;
};

export type ProductListQueryVariables = Exact<{[key: string]: never}>;

export type ProductListQuery = {
  __typename?: 'Query';
  productLists: Array<{
    __typename?: 'ProductList';
    id: number;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: number;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  }>;
};

export type CreateProductListMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateProductListMutation = {
  __typename?: 'Mutation';
  upsertProductList?: {
    __typename?: 'ProductList';
    id: number;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: number;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  } | null;
};

export type ProductPrintQueryVariables = Exact<{[key: string]: never}>;

export type ProductPrintQuery = {
  __typename?: 'Query';
  productLists: Array<{
    __typename?: 'ProductList';
    id: number;
    emoji?: string | null;
    name: string;
    product: Array<{
      __typename?: 'Product';
      id: number;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  }>;
  config?: {__typename?: 'Config'; tokenValue: number} | null;
};

export type RevenueQueryVariables = Exact<{
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
}>;

export type RevenueQuery = {
  __typename?: 'Query';
  events: Array<{
    __typename?: 'Event';
    id: string;
    name: string;
    start: Date;
    end: Date;
  }>;
  productLists: Array<{
    __typename?: 'ProductList';
    id: number;
    name: string;
    salesNumbers: {__typename?: 'SalesNumber'; count: number; total: number};
  }>;
};

export type OverlapQueryVariables = Exact<{[key: string]: never}>;

export type OverlapQuery = {
  __typename?: 'Query';
  reservationsByPerson: Array<{
    __typename?: 'ReservationByPerson';
    email: string;
    reservations: Array<{
      __typename?: 'Reservation';
      id: number;
      status: ReservationStatus;
      startTime: Date;
      endTime: Date;
      otherPersons: Array<string>;
      primaryPerson: string;
      table: {
        __typename?: 'Table';
        id: string;
        displayName: string;
        area: {__typename?: 'Area'; id: string; displayName: string};
      };
    }>;
  }>;
};

export type OverviewReservationFragment = {
  __typename?: 'Reservation';
  id: number;
  status: ReservationStatus;
  startTime: Date;
  endTime: Date;
  primaryPerson: string;
  otherPersons: Array<string>;
  checkedInPersons: number;
};

export type OverviewAreasQueryVariables = Exact<{[key: string]: never}>;

export type OverviewAreasQuery = {
  __typename?: 'Query';
  areas: Array<{__typename?: 'Area'; id: string; displayName: string}>;
};

export type OverviewQueryVariables = Exact<{
  area: Scalars['ID'];
  day: Scalars['Date'];
}>;

export type OverviewQuery = {
  __typename?: 'Query';
  node?:
    | {
        __typename?: 'Area';
        table: Array<{
          __typename?: 'Table';
          id: string;
          displayName: string;
          maxCapacity: number;
          reservations: Array<{
            __typename?: 'Reservation';
            id: number;
            status: ReservationStatus;
            startTime: Date;
            endTime: Date;
            primaryPerson: string;
            otherPersons: Array<string>;
            checkedInPersons: number;
          }>;
        }>;
      }
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'}
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
    | null;
};

export type ViewerContextProviderQueryVariables = Exact<{[key: string]: never}>;

export type ViewerContextProviderQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    profilePicture?: string | null;
    displayName: string;
  } | null;
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
    active
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
        numberOfArtists
        numberOfNonMaleArtists
        hasPreviouslyPlayed
        website
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
export type MarkAsContextedMutationResult =
  Apollo.MutationResult<MarkAsContextedMutation>;
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
export type BandApplicationRatingMutationResult =
  Apollo.MutationResult<BandApplicationRatingMutation>;
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
export type UpsertProductListMutationResult =
  Apollo.MutationResult<UpsertProductListMutation>;
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
export type CreateReservationMutationResult =
  Apollo.MutationResult<CreateReservationMutation>;
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
export type UpdateReservationMutationResult =
  Apollo.MutationResult<UpdateReservationMutation>;
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
export type CancelReservationMutationResult =
  Apollo.MutationResult<CancelReservationMutation>;
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
export type UpdateOtherPersonsMutationResult =
  Apollo.MutationResult<UpdateOtherPersonsMutation>;
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
export type SwapReservationsMutationResult =
  Apollo.MutationResult<SwapReservationsMutation>;
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
export type CreateProductListMutationResult =
  Apollo.MutationResult<CreateProductListMutation>;
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
    events {
      id
      name
      start
      end
    }
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
