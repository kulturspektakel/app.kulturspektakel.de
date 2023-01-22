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
  Date: Date;
  DateTime: Date;
};

export type Area = Node & {
  __typename?: 'Area';
  bandsPlaying: Array<BandPlaying>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  openingHour: Array<OpeningHour>;
  themeColor: Scalars['String'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type AreaOpeningHourArgs = {
  day?: InputMaybe<Scalars['Date']>;
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  bandApplicationRating: Array<BandApplicationRating>;
  bandname: Scalars['String'];
  city: Scalars['String'];
  comments: BandApplicationCommentsConnection;
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  contactedByViewer?: Maybe<Viewer>;
  createdAt: Scalars['DateTime'];
  demo?: Maybe<Scalars['String']>;
  demoEmbed?: Maybe<Scalars['String']>;
  demoEmbedType?: Maybe<DemoEmbedType>;
  demoEmbedUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  event: Event;
  eventId: Scalars['ID'];
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
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  numberOfArtists?: Maybe<Scalars['Int']>;
  numberOfNonMaleArtists?: Maybe<Scalars['Int']>;
  pastApplications: Array<BandApplication>;
  pastPerformances: Array<BandPlaying>;
  rating?: Maybe<Scalars['Float']>;
  website?: Maybe<Scalars['String']>;
};

export type BandApplicationCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BandApplicationComment = Node & {
  __typename?: 'BandApplicationComment';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: Viewer;
};

export type BandApplicationCommentInput = {
  bandApplicationId: Scalars['ID'];
  comment: Scalars['String'];
};

export type BandApplicationCommentsConnection = {
  __typename?: 'BandApplicationCommentsConnection';
  edges: Array<BandApplicationCommentsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BandApplicationCommentsConnectionEdge = {
  __typename?: 'BandApplicationCommentsConnectionEdge';
  cursor: Scalars['String'];
  node: BandApplicationComment;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int'];
  viewer: Viewer;
};

export type BandPlaying = Node & {
  __typename?: 'BandPlaying';
  area: Area;
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  event: Event;
  eventId: Scalars['ID'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type Billable = {
  salesNumbers: Array<SalesNumber>;
};

export type BillableSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Board = {
  __typename?: 'Board';
  chair: Scalars['String'];
  deputy: Scalars['String'];
  deputy2: Scalars['String'];
  observer: Scalars['String'];
  observer2: Scalars['String'];
  secretary: Scalars['String'];
  treasurer: Scalars['String'];
};

export type Card = Node &
  Transactionable & {
    __typename?: 'Card';
    id: Scalars['ID'];
    transactions: CardTransactionConnection;
  };

export type CardTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export type CardStatus = {
  __typename?: 'CardStatus';
  balance: Scalars['Int'];
  cardId: Scalars['ID'];
  deposit: Scalars['Int'];
  hasNewerTransactions?: Maybe<Scalars['Boolean']>;
  recentTransactions?: Maybe<Array<Transaction>>;
};

export type CardTransaction = Transaction & {
  __typename?: 'CardTransaction';
  Order: Array<Order>;
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  cardId: Scalars['String'];
  clientId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  transactionType: CardTransactionType;
};

export type CardTransactionConnection = {
  __typename?: 'CardTransactionConnection';
  /** This includes money made from deposit */
  balanceTotal: Scalars['Int'];
  data: Array<CardTransaction>;
  depositIn: Scalars['Int'];
  depositOut: Scalars['Int'];
  totalCount: Scalars['Int'];
  uniqueCards: Scalars['Int'];
};

export enum CardTransactionType {
  Cashout = 'Cashout',
  Charge = 'Charge',
  TopUp = 'TopUp',
}

export type Config = {
  __typename?: 'Config';
  board: Board;
  depositValue: Scalars['Int'];
};

export type CreateBandApplicationInput = {
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  demo?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: InputMaybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: InputMaybe<HeardAboutBookingFrom>;
  instagram?: InputMaybe<Scalars['String']>;
  knowsKultFrom?: InputMaybe<Scalars['String']>;
  numberOfArtists?: InputMaybe<Scalars['Int']>;
  numberOfNonMaleArtists?: InputMaybe<Scalars['Int']>;
  website?: InputMaybe<Scalars['String']>;
};

export enum DemoEmbedType {
  BandcampAlbum = 'BandcampAlbum',
  BandcampTrack = 'BandcampTrack',
  SoundcloudUrl = 'SoundcloudUrl',
  SpotifyAlbum = 'SpotifyAlbum',
  SpotifyArtist = 'SpotifyArtist',
  SpotifyTrack = 'SpotifyTrack',
  Unresolvable = 'Unresolvable',
  YouTubePlaylist = 'YouTubePlaylist',
  YouTubeVideo = 'YouTubeVideo',
}

export type Device = Billable &
  Node &
  Transactionable & {
    __typename?: 'Device';
    id: Scalars['ID'];
    lastSeen?: Maybe<Scalars['DateTime']>;
    productList?: Maybe<ProductList>;
    salesNumbers: Array<SalesNumber>;
    softwareVersion?: Maybe<Scalars['String']>;
    transactions: CardTransactionConnection;
  };

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type DeviceTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export enum DeviceType {
  ContactlessTerminal = 'CONTACTLESS_TERMINAL',
  Ipad = 'IPAD',
}

export type Event = Node & {
  __typename?: 'Event';
  bandApplication: Array<BandApplication>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  bandsPlaying: Array<BandPlaying>;
  djApplicationEnd?: Maybe<Scalars['DateTime']>;
  end: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
};

export enum GenreCategory {
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  Dj = 'DJ',
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
  productListId: Scalars['ID'];
  salesNumbers: Array<SalesNumber>;
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type MissingTransaction = Transaction & {
  __typename?: 'MissingTransaction';
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
  numberOfMissingTransactions: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBandApplication: BandApplication;
  createBandApplicationComment: BandApplication;
  createOrder: Order;
  deleteBandApplicationComment: BandApplication;
  markBandApplicationContacted: BandApplication;
  rateBandApplication: BandApplication;
  updateDeviceProductList: Device;
  upsertProductList: ProductList;
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
};

export type MutationCreateBandApplicationCommentArgs = {
  input: BandApplicationCommentInput;
};

export type MutationCreateOrderArgs = {
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  payment: OrderPayment;
  products: Array<OrderItemInput>;
};

export type MutationDeleteBandApplicationCommentArgs = {
  id: Scalars['ID'];
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
};

export type MutationUpdateDeviceProductListArgs = {
  deviceId: Scalars['ID'];
  productListId: Scalars['ID'];
};

export type MutationUpsertProductListArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductInput>>;
};

export type Node = {
  id: Scalars['ID'];
};

export type NuclinoPage = Node & {
  __typename?: 'NuclinoPage';
  content: Scalars['String'];
  id: Scalars['ID'];
  lastUpdatedAt: Scalars['DateTime'];
  lastUpdatedUser: NuclinoUser;
  title: Scalars['String'];
};

export type NuclinoSearchResult = {
  __typename?: 'NuclinoSearchResult';
  highlight?: Maybe<Scalars['String']>;
  page: NuclinoPage;
};

export type NuclinoUser = {
  __typename?: 'NuclinoUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
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
  deviceId?: Maybe<Scalars['ID']>;
  id: Scalars['Int'];
  items: Array<OrderItem>;
  payment: OrderPayment;
  total: Scalars['Int'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  amount: Scalars['Int'];
  id: Scalars['ID'];
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export enum PreviouslyPlayed {
  No = 'No',
  OtherFormation = 'OtherFormation',
  Yes = 'Yes',
}

export type Product = Billable &
  Node & {
    __typename?: 'Product';
    id: Scalars['ID'];
    name: Scalars['String'];
    price: Scalars['Int'];
    productListId: Scalars['ID'];
    requiresDeposit: Scalars['Boolean'];
    salesNumbers: Array<SalesNumber>;
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

export type ProductList = Billable &
  Node & {
    __typename?: 'ProductList';
    active: Scalars['Boolean'];
    emoji?: Maybe<Scalars['String']>;
    historicalProducts: Array<HistoricalProduct>;
    id: Scalars['ID'];
    name: Scalars['String'];
    product: Array<Product>;
    salesNumbers: Array<SalesNumber>;
  };

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  cardStatus: CardStatus;
  config: Config;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  nuclinoPages: Array<NuclinoSearchResult>;
  productLists: Array<ProductList>;
  transactions: Transactions;
  viewer?: Maybe<Viewer>;
};

export type QueryCardStatusArgs = {
  payload: Scalars['String'];
};

export type QueryDevicesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type QueryNuclinoPagesArgs = {
  query: Scalars['String'];
};

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  payment: OrderPayment;
  timeSeries: Array<TimeSeries>;
  total: Scalars['Float'];
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: InputMaybe<TimeGrouping>;
};

export enum TimeGrouping {
  Day = 'Day',
  Hour = 'Hour',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Transaction = {
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
};

export type Transactionable = {
  transactions: CardTransactionConnection;
};

export type TransactionableTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export type Transactions = Transactionable & {
  __typename?: 'Transactions';
  transactions: CardTransactionConnection;
};

export type TransactionsTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
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
    | {__typename: 'Area'}
    | {
        __typename: 'BandApplication';
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
        city: string;
        distance?: number | null;
        numberOfArtists?: number | null;
        numberOfNonMaleArtists?: number | null;
        hasPreviouslyPlayed?: PreviouslyPlayed | null;
        website?: string | null;
        genre?: string | null;
        genreCategory: GenreCategory;
        demoEmbed?: string | null;
        demoEmbedType?: DemoEmbedType | null;
        latitude?: number | null;
        longitude?: number | null;
        rating?: number | null;
        createdAt: Date;
        contactedByViewer?: {__typename?: 'Viewer'; id: string} | null;
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
        pastApplications: Array<{
          __typename?: 'BandApplication';
          rating?: number | null;
          id: string;
          event: {__typename?: 'Event'; id: string; start: Date; name: string};
          contactedByViewer?: {
            __typename?: 'Viewer';
            displayName: string;
          } | null;
          comments: {
            __typename?: 'BandApplicationCommentsConnection';
            totalCount: number;
            edges: Array<{
              __typename?: 'BandApplicationCommentsConnectionEdge';
              node: {
                __typename?: 'BandApplicationComment';
                id: string;
                comment: string;
                createdAt: Date;
                user: {
                  __typename?: 'Viewer';
                  id: string;
                  displayName: string;
                  profilePicture?: string | null;
                };
              };
            }>;
          };
        }>;
        pastPerformances: Array<{
          __typename?: 'BandPlaying';
          startTime: Date;
          event: {__typename?: 'Event'; id: string; start: Date; name: string};
          area: {__typename?: 'Area'; displayName: string};
        }>;
        comments: {
          __typename?: 'BandApplicationCommentsConnection';
          totalCount: number;
          edges: Array<{
            __typename?: 'BandApplicationCommentsConnectionEdge';
            node: {
              __typename?: 'BandApplicationComment';
              id: string;
              comment: string;
              createdAt: Date;
              user: {
                __typename?: 'Viewer';
                id: string;
                displayName: string;
                profilePicture?: string | null;
              };
            };
          }>;
        };
      }
    | {__typename: 'BandApplicationComment'}
    | {__typename: 'BandPlaying'}
    | {__typename: 'Card'}
    | {__typename: 'Device'}
    | {__typename: 'Event'}
    | {__typename: 'NuclinoPage'}
    | {__typename: 'Product'}
    | {__typename: 'ProductList'}
    | {__typename: 'Viewer'}
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
  markBandApplicationContacted: {
    __typename?: 'BandApplication';
    id: string;
    contactedByViewer?: {
      __typename?: 'Viewer';
      id: string;
      displayName: string;
    } | null;
  };
};

export type BandApplicationTimelineFragment = {
  __typename?: 'BandApplication';
  id: string;
  createdAt: Date;
  pastApplications: Array<{
    __typename?: 'BandApplication';
    rating?: number | null;
    id: string;
    event: {__typename?: 'Event'; id: string; start: Date; name: string};
    contactedByViewer?: {__typename?: 'Viewer'; displayName: string} | null;
    comments: {
      __typename?: 'BandApplicationCommentsConnection';
      totalCount: number;
      edges: Array<{
        __typename?: 'BandApplicationCommentsConnectionEdge';
        node: {
          __typename?: 'BandApplicationComment';
          id: string;
          comment: string;
          createdAt: Date;
          user: {
            __typename?: 'Viewer';
            id: string;
            displayName: string;
            profilePicture?: string | null;
          };
        };
      }>;
    };
  }>;
  pastPerformances: Array<{
    __typename?: 'BandPlaying';
    startTime: Date;
    event: {__typename?: 'Event'; id: string; start: Date; name: string};
    area: {__typename?: 'Area'; displayName: string};
  }>;
  comments: {
    __typename?: 'BandApplicationCommentsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'BandApplicationCommentsConnectionEdge';
      node: {
        __typename?: 'BandApplicationComment';
        id: string;
        comment: string;
        createdAt: Date;
        user: {
          __typename?: 'Viewer';
          id: string;
          displayName: string;
          profilePicture?: string | null;
        };
      };
    }>;
  };
};

export type BandApplicationCommentMutationVariables = Exact<{
  input: BandApplicationCommentInput;
}>;

export type BandApplicationCommentMutation = {
  __typename?: 'Mutation';
  createBandApplicationComment: {
    __typename?: 'BandApplication';
    id: string;
    comments: {
      __typename?: 'BandApplicationCommentsConnection';
      totalCount: number;
      edges: Array<{
        __typename?: 'BandApplicationCommentsConnectionEdge';
        node: {
          __typename?: 'BandApplicationComment';
          id: string;
          comment: string;
          createdAt: Date;
          user: {
            __typename?: 'Viewer';
            id: string;
            displayName: string;
            profilePicture?: string | null;
          };
        };
      }>;
    };
  };
};

export type BandApplicationCommentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type BandApplicationCommentDeleteMutation = {
  __typename?: 'Mutation';
  deleteBandApplicationComment: {
    __typename?: 'BandApplication';
    id: string;
    comments: {
      __typename?: 'BandApplicationCommentsConnection';
      totalCount: number;
      edges: Array<{
        __typename?: 'BandApplicationCommentsConnectionEdge';
        node: {
          __typename?: 'BandApplicationComment';
          id: string;
          comment: string;
          createdAt: Date;
          user: {
            __typename?: 'Viewer';
            id: string;
            displayName: string;
            profilePicture?: string | null;
          };
        };
      }>;
    };
  };
};

export type CommentsFragment = {
  __typename?: 'BandApplication';
  id: string;
  comments: {
    __typename?: 'BandApplicationCommentsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'BandApplicationCommentsConnectionEdge';
      node: {
        __typename?: 'BandApplicationComment';
        id: string;
        comment: string;
        createdAt: Date;
        user: {
          __typename?: 'Viewer';
          id: string;
          displayName: string;
          profilePicture?: string | null;
        };
      };
    }>;
  };
};

export type DemoFragment = {
  __typename?: 'BandApplication';
  demo?: string | null;
  demoEmbed?: string | null;
  demoEmbedType?: DemoEmbedType | null;
};

export type GoogleMapsFragment = {
  __typename?: 'BandApplication';
  latitude?: number | null;
  longitude?: number | null;
};

export type BandApplicationRatingMutationVariables = Exact<{
  id: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
}>;

export type BandApplicationRatingMutation = {
  __typename?: 'Mutation';
  rateBandApplication: {
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
  };
};

export type DeviceTransactionsQueryVariables = Exact<{
  deviceID: Scalars['ID'];
}>;

export type DeviceTransactionsQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {
        __typename?: 'Device';
        transactions: {
          __typename?: 'CardTransactionConnection';
          data: Array<{
            __typename?: 'CardTransaction';
            deviceTime: Date;
            balanceAfter: number;
            balanceBefore: number;
            depositBefore: number;
            depositAfter: number;
            cardId: string;
            transactionType: CardTransactionType;
            clientId: string;
          }>;
        };
      }
    | {__typename?: 'Event'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type ProductListFragment = {
  __typename?: 'ProductList';
  id: string;
  name: string;
  emoji?: string | null;
  active: boolean;
  product: Array<{
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    requiresDeposit: boolean;
  }>;
};

export type UpsertProductListMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  emoji?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductInput> | ProductInput>;
  active?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpsertProductListMutation = {
  __typename?: 'Mutation';
  upsertProductList: {
    __typename?: 'ProductList';
    id: string;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  };
};

export type ProductRowFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  price: number;
  requiresDeposit: boolean;
};

export type RevenueDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
  grouping: TimeGrouping;
}>;

export type RevenueDetailsQuery = {
  __typename?: 'Query';
  productList?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {__typename?: 'Event'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {
        __typename?: 'ProductList';
        id: string;
        name: string;
        salesNumbers: Array<{
          __typename?: 'SalesNumber';
          payment: OrderPayment;
          timeSeries: Array<{
            __typename?: 'TimeSeries';
            time: Date;
            value: number;
          }>;
        }>;
        historicalProducts: Array<{
          __typename?: 'HistoricalProduct';
          name: string;
          salesNumbers: Array<{
            __typename?: 'SalesNumber';
            count: number;
            total: number;
            payment: OrderPayment;
          }>;
        }>;
      }
    | {__typename?: 'Viewer'}
    | null;
};

export type AvatarFragment = {
  __typename?: 'Viewer';
  displayName: string;
  profilePicture?: string | null;
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
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
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
          comments: {
            __typename?: 'BandApplicationCommentsConnection';
            totalCount: number;
          };
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
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type EventsQueryVariables = Exact<{[key: string]: never}>;

export type EventsQuery = {
  __typename?: 'Query';
  events: Array<{__typename?: 'Event'; id: string; name: string}>;
};

export type CardInfoQueryVariables = Exact<{
  cardID: Scalars['ID'];
}>;

export type CardInfoQuery = {
  __typename?: 'Query';
  config: {__typename?: 'Config'; depositValue: number};
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {
        __typename?: 'Card';
        id: string;
        transactions: {
          __typename?: 'CardTransactionConnection';
          balanceTotal: number;
          data: Array<{
            __typename?: 'CardTransaction';
            clientId: string;
            transactionType: CardTransactionType;
            balanceAfter: number;
            balanceBefore: number;
            depositAfter: number;
            depositBefore: number;
            deviceTime: Date;
            Order: Array<{
              __typename?: 'Order';
              total: number;
              items: Array<{
                __typename?: 'OrderItem';
                amount: number;
                name: string;
                productList?: {
                  __typename?: 'ProductList';
                  emoji?: string | null;
                  name: string;
                } | null;
              }>;
            }>;
          }>;
        };
      }
    | {__typename?: 'Device'}
    | {__typename?: 'Event'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type DevicesQueryVariables = Exact<{[key: string]: never}>;

export type DevicesQuery = {
  __typename?: 'Query';
  devices: Array<{
    __typename?: 'Device';
    id: string;
    lastSeen?: Date | null;
    softwareVersion?: string | null;
    productList?: {__typename?: 'ProductList'; id: string; name: string} | null;
  }>;
  productLists: Array<{
    __typename?: 'ProductList';
    id: string;
    name: string;
    active: boolean;
  }>;
};

export type UpdateDeviceListMutationVariables = Exact<{
  productListId: Scalars['ID'];
  deviceId: Scalars['ID'];
}>;

export type UpdateDeviceListMutation = {
  __typename?: 'Mutation';
  updateDeviceProductList: {
    __typename?: 'Device';
    id: string;
    productList?: {__typename?: 'ProductList'; id: string; name: string} | null;
  };
};

export type ProductListQueryVariables = Exact<{[key: string]: never}>;

export type ProductListQuery = {
  __typename?: 'Query';
  productLists: Array<{
    __typename?: 'ProductList';
    id: string;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: string;
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
  upsertProductList: {
    __typename?: 'ProductList';
    id: string;
    name: string;
    emoji?: string | null;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  };
};

export type ProductPrintQueryVariables = Exact<{[key: string]: never}>;

export type ProductPrintQuery = {
  __typename?: 'Query';
  productLists: Array<{
    __typename?: 'ProductList';
    id: string;
    emoji?: string | null;
    name: string;
    active: boolean;
    product: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      requiresDeposit: boolean;
    }>;
  }>;
  config: {__typename?: 'Config'; depositValue: number};
};

export type RevenueQueryVariables = Exact<{
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
}>;

export type RevenueQuery = {
  __typename?: 'Query';
  config: {__typename?: 'Config'; depositValue: number};
  events: Array<{
    __typename?: 'Event';
    id: string;
    name: string;
    start: Date;
    end: Date;
  }>;
  productLists: Array<{
    __typename?: 'ProductList';
    id: string;
    name: string;
    salesNumbers: Array<{
      __typename?: 'SalesNumber';
      count: number;
      total: number;
      payment: OrderPayment;
    }>;
  }>;
  transactions: {
    __typename?: 'Transactions';
    topUps: {
      __typename?: 'CardTransactionConnection';
      balanceTotal: number;
      totalCount: number;
      depositIn: number;
      depositOut: number;
    };
    cashouts: {
      __typename?: 'CardTransactionConnection';
      balanceTotal: number;
      totalCount: number;
      depositIn: number;
      depositOut: number;
    };
    charges: {
      __typename?: 'CardTransactionConnection';
      balanceTotal: number;
      totalCount: number;
      depositIn: number;
      depositOut: number;
    };
    transactions: {
      __typename?: 'CardTransactionConnection';
      depositIn: number;
      depositOut: number;
      uniqueCards: number;
    };
  };
};

export type ViewerContextProviderQueryVariables = Exact<{[key: string]: never}>;

export type ViewerContextProviderQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    displayName: string;
    profilePicture?: string | null;
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
export const AvatarFragmentDoc = gql`
  fragment Avatar on Viewer {
    displayName
    profilePicture
  }
`;
export const CommentsFragmentDoc = gql`
  fragment Comments on BandApplication {
    id
    comments {
      totalCount
      edges {
        node {
          id
          comment
          createdAt
          user {
            id
            ...Avatar
          }
        }
      }
    }
  }
  ${AvatarFragmentDoc}
`;
export const BandApplicationTimelineFragmentDoc = gql`
  fragment BandApplicationTimeline on BandApplication {
    id
    createdAt
    pastApplications {
      event {
        id
        start
        name
      }
      rating
      contactedByViewer {
        displayName
      }
      ...Comments
    }
    pastPerformances {
      startTime
      event {
        id
        start
        name
      }
      area {
        displayName
      }
    }
    ...Comments
  }
  ${CommentsFragmentDoc}
`;
export const DemoFragmentDoc = gql`
  fragment Demo on BandApplication {
    demo
    demoEmbed
    demoEmbedType
  }
`;
export const GoogleMapsFragmentDoc = gql`
  fragment GoogleMaps on BandApplication {
    latitude
    longitude
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
export const ApplicationDetailsDocument = gql`
  query ApplicationDetails($id: ID!) {
    node(id: $id) {
      __typename
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
        city
        distance
        numberOfArtists
        numberOfNonMaleArtists
        hasPreviouslyPlayed
        contactedByViewer {
          id
        }
        website
        genre
        genreCategory
        ...Demo
        ...GoogleMaps
        ...Rating
        ...BandApplicationTimeline
      }
    }
  }
  ${DemoFragmentDoc}
  ${GoogleMapsFragmentDoc}
  ${RatingFragmentDoc}
  ${BandApplicationTimelineFragmentDoc}
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
export const BandApplicationCommentDocument = gql`
  mutation BandApplicationComment($input: BandApplicationCommentInput!) {
    createBandApplicationComment(input: $input) {
      ...Comments
    }
  }
  ${CommentsFragmentDoc}
`;
export type BandApplicationCommentMutationFn = Apollo.MutationFunction<
  BandApplicationCommentMutation,
  BandApplicationCommentMutationVariables
>;

/**
 * __useBandApplicationCommentMutation__
 *
 * To run a mutation, you first call `useBandApplicationCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandApplicationCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandApplicationCommentMutation, { data, loading, error }] = useBandApplicationCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBandApplicationCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BandApplicationCommentMutation,
    BandApplicationCommentMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    BandApplicationCommentMutation,
    BandApplicationCommentMutationVariables
  >(BandApplicationCommentDocument, options);
}
export type BandApplicationCommentMutationHookResult = ReturnType<
  typeof useBandApplicationCommentMutation
>;
export type BandApplicationCommentMutationResult =
  Apollo.MutationResult<BandApplicationCommentMutation>;
export type BandApplicationCommentMutationOptions = Apollo.BaseMutationOptions<
  BandApplicationCommentMutation,
  BandApplicationCommentMutationVariables
>;
export const BandApplicationCommentDeleteDocument = gql`
  mutation BandApplicationCommentDelete($id: ID!) {
    deleteBandApplicationComment(id: $id) {
      ...Comments
    }
  }
  ${CommentsFragmentDoc}
`;
export type BandApplicationCommentDeleteMutationFn = Apollo.MutationFunction<
  BandApplicationCommentDeleteMutation,
  BandApplicationCommentDeleteMutationVariables
>;

/**
 * __useBandApplicationCommentDeleteMutation__
 *
 * To run a mutation, you first call `useBandApplicationCommentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandApplicationCommentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandApplicationCommentDeleteMutation, { data, loading, error }] = useBandApplicationCommentDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBandApplicationCommentDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BandApplicationCommentDeleteMutation,
    BandApplicationCommentDeleteMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    BandApplicationCommentDeleteMutation,
    BandApplicationCommentDeleteMutationVariables
  >(BandApplicationCommentDeleteDocument, options);
}
export type BandApplicationCommentDeleteMutationHookResult = ReturnType<
  typeof useBandApplicationCommentDeleteMutation
>;
export type BandApplicationCommentDeleteMutationResult =
  Apollo.MutationResult<BandApplicationCommentDeleteMutation>;
export type BandApplicationCommentDeleteMutationOptions =
  Apollo.BaseMutationOptions<
    BandApplicationCommentDeleteMutation,
    BandApplicationCommentDeleteMutationVariables
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
export const DeviceTransactionsDocument = gql`
  query DeviceTransactions($deviceID: ID!) {
    node(id: $deviceID) {
      ... on Device {
        transactions(limit: 25) {
          data {
            deviceTime
            balanceAfter
            balanceBefore
            depositBefore
            depositAfter
            cardId
            transactionType
            clientId
          }
        }
      }
    }
  }
`;

/**
 * __useDeviceTransactionsQuery__
 *
 * To run a query within a React component, call `useDeviceTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeviceTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeviceTransactionsQuery({
 *   variables: {
 *      deviceID: // value for 'deviceID'
 *   },
 * });
 */
export function useDeviceTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    DeviceTransactionsQuery,
    DeviceTransactionsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    DeviceTransactionsQuery,
    DeviceTransactionsQueryVariables
  >(DeviceTransactionsDocument, options);
}
export function useDeviceTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DeviceTransactionsQuery,
    DeviceTransactionsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    DeviceTransactionsQuery,
    DeviceTransactionsQueryVariables
  >(DeviceTransactionsDocument, options);
}
export type DeviceTransactionsQueryHookResult = ReturnType<
  typeof useDeviceTransactionsQuery
>;
export type DeviceTransactionsLazyQueryHookResult = ReturnType<
  typeof useDeviceTransactionsLazyQuery
>;
export type DeviceTransactionsQueryResult = Apollo.QueryResult<
  DeviceTransactionsQuery,
  DeviceTransactionsQueryVariables
>;
export const UpsertProductListDocument = gql`
  mutation UpsertProductList(
    $id: ID
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
    $id: ID!
    $after: DateTime!
    $before: DateTime!
    $grouping: TimeGrouping!
  ) {
    productList: node(id: $id) {
      ... on ProductList {
        id
        name
        salesNumbers(after: $after, before: $before) {
          timeSeries(grouping: $grouping) {
            time
            value
          }
          payment
        }
        historicalProducts {
          name
          salesNumbers(after: $after, before: $before) {
            count
            total
            payment
          }
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
          comments {
            totalCount
          }
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
export const CardInfoDocument = gql`
  query CardInfo($cardID: ID!) {
    config {
      depositValue
    }
    node(id: $cardID) {
      ... on Card {
        id
        transactions {
          balanceTotal
          data {
            clientId
            transactionType
            balanceAfter
            balanceBefore
            depositAfter
            depositBefore
            deviceTime
            Order {
              total
              items {
                amount
                name
                productList {
                  emoji
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useCardInfoQuery__
 *
 * To run a query within a React component, call `useCardInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardInfoQuery({
 *   variables: {
 *      cardID: // value for 'cardID'
 *   },
 * });
 */
export function useCardInfoQuery(
  baseOptions: Apollo.QueryHookOptions<CardInfoQuery, CardInfoQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<CardInfoQuery, CardInfoQueryVariables>(
    CardInfoDocument,
    options,
  );
}
export function useCardInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CardInfoQuery,
    CardInfoQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<CardInfoQuery, CardInfoQueryVariables>(
    CardInfoDocument,
    options,
  );
}
export type CardInfoQueryHookResult = ReturnType<typeof useCardInfoQuery>;
export type CardInfoLazyQueryHookResult = ReturnType<
  typeof useCardInfoLazyQuery
>;
export type CardInfoQueryResult = Apollo.QueryResult<
  CardInfoQuery,
  CardInfoQueryVariables
>;
export const DevicesDocument = gql`
  query Devices {
    devices(type: CONTACTLESS_TERMINAL) {
      id
      lastSeen
      softwareVersion
      productList {
        id
        name
      }
    }
    productLists {
      id
      name
      active
    }
  }
`;

/**
 * __useDevicesQuery__
 *
 * To run a query within a React component, call `useDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDevicesQuery(
  baseOptions?: Apollo.QueryHookOptions<DevicesQuery, DevicesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<DevicesQuery, DevicesQueryVariables>(
    DevicesDocument,
    options,
  );
}
export function useDevicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DevicesQuery,
    DevicesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<DevicesQuery, DevicesQueryVariables>(
    DevicesDocument,
    options,
  );
}
export type DevicesQueryHookResult = ReturnType<typeof useDevicesQuery>;
export type DevicesLazyQueryHookResult = ReturnType<typeof useDevicesLazyQuery>;
export type DevicesQueryResult = Apollo.QueryResult<
  DevicesQuery,
  DevicesQueryVariables
>;
export const UpdateDeviceListDocument = gql`
  mutation UpdateDeviceList($productListId: ID!, $deviceId: ID!) {
    updateDeviceProductList(
      productListId: $productListId
      deviceId: $deviceId
    ) {
      id
      productList {
        id
        name
      }
    }
  }
`;
export type UpdateDeviceListMutationFn = Apollo.MutationFunction<
  UpdateDeviceListMutation,
  UpdateDeviceListMutationVariables
>;

/**
 * __useUpdateDeviceListMutation__
 *
 * To run a mutation, you first call `useUpdateDeviceListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeviceListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeviceListMutation, { data, loading, error }] = useUpdateDeviceListMutation({
 *   variables: {
 *      productListId: // value for 'productListId'
 *      deviceId: // value for 'deviceId'
 *   },
 * });
 */
export function useUpdateDeviceListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDeviceListMutation,
    UpdateDeviceListMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdateDeviceListMutation,
    UpdateDeviceListMutationVariables
  >(UpdateDeviceListDocument, options);
}
export type UpdateDeviceListMutationHookResult = ReturnType<
  typeof useUpdateDeviceListMutation
>;
export type UpdateDeviceListMutationResult =
  Apollo.MutationResult<UpdateDeviceListMutation>;
export type UpdateDeviceListMutationOptions = Apollo.BaseMutationOptions<
  UpdateDeviceListMutation,
  UpdateDeviceListMutationVariables
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
      active
      product {
        id
        name
        price
        requiresDeposit
      }
    }
    config {
      depositValue
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
    config {
      depositValue
    }
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
        payment
      }
    }
    transactions {
      topUps: transactions(after: $after, before: $before, type: TopUp) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      cashouts: transactions(after: $after, before: $before, type: Cashout) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      charges: transactions(after: $after, before: $before, type: Charge) {
        balanceTotal
        totalCount
        depositIn
        depositOut
      }
      transactions(after: $after, before: $before) {
        depositIn
        depositOut
        uniqueCards
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
export const ViewerContextProviderDocument = gql`
  query ViewerContextProvider {
    viewer {
      id
      ...Avatar
    }
  }
  ${AvatarFragmentDoc}
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
