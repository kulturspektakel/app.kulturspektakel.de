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
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Date: {input: Date; output: Date};
  DateTime: {input: Date; output: Date};
};

export type Area = Node & {
  __typename?: 'Area';
  bandsPlaying: Array<BandPlaying>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  openingHour: Array<OpeningHour>;
  themeColor: Scalars['String']['output'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date']['input'];
};

export type AreaOpeningHourArgs = {
  day?: InputMaybe<Scalars['Date']['input']>;
};

export type Asset = {
  copyright?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  bandApplicationRating: Array<BandApplicationRating>;
  bandname: Scalars['String']['output'];
  city: Scalars['String']['output'];
  comments: BandApplicationCommentsConnection;
  contactName: Scalars['String']['output'];
  contactPhone: Scalars['String']['output'];
  contactedByViewer?: Maybe<Viewer>;
  createdAt: Scalars['DateTime']['output'];
  demo?: Maybe<Scalars['String']['output']>;
  demoEmbed?: Maybe<Scalars['String']['output']>;
  demoEmbedType?: Maybe<DemoEmbedType>;
  demoEmbedUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  event: Event;
  eventId: Scalars['ID']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  facebookLikes?: Maybe<Scalars['Int']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: Maybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  instagramFollower?: Maybe<Scalars['Int']['output']>;
  knowsKultFrom?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  numberOfArtists?: Maybe<Scalars['Int']['output']>;
  numberOfNonMaleArtists?: Maybe<Scalars['Int']['output']>;
  pastApplications: Array<BandApplication>;
  pastPerformances: Array<BandPlaying>;
  rating?: Maybe<Scalars['Float']['output']>;
  repertoire?: Maybe<BandRepertoireType>;
  spotifyArtist?: Maybe<Scalars['String']['output']>;
  spotifyMonthlyListeners?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type BandApplicationCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type BandApplicationComment = Node & {
  __typename?: 'BandApplicationComment';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: Viewer;
};

export type BandApplicationCommentInput = {
  bandApplicationId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
};

export type BandApplicationCommentsConnection = {
  __typename?: 'BandApplicationCommentsConnection';
  edges: Array<BandApplicationCommentsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BandApplicationCommentsConnectionEdge = {
  __typename?: 'BandApplicationCommentsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: BandApplicationComment;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int']['output'];
  viewer: Viewer;
};

export type BandApplicationUpdateInput = {
  contacted?: InputMaybe<Scalars['Boolean']['input']>;
  instagramFollower?: InputMaybe<Scalars['Int']['input']>;
};

export type BandPlaying = Node & {
  __typename?: 'BandPlaying';
  area: Area;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  event: Event;
  eventId: Scalars['ID']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photo?: Maybe<PixelImage>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  soundcloud?: Maybe<Scalars['String']['output']>;
  spotify?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export enum BandRepertoireType {
  ExclusivelyCoverSongs = 'ExclusivelyCoverSongs',
  ExclusivelyOwnSongs = 'ExclusivelyOwnSongs',
  MostlyCoverSongs = 'MostlyCoverSongs',
  MostlyOwnSongs = 'MostlyOwnSongs',
}

export type Billable = {
  salesNumbers: Array<SalesNumber>;
};

export type BillableSalesNumbersArgs = {
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
};

export type Board = {
  __typename?: 'Board';
  chair: Scalars['String']['output'];
  deputy: Scalars['String']['output'];
  deputy2: Scalars['String']['output'];
  observer: Scalars['String']['output'];
  observer2: Scalars['String']['output'];
  secretary: Scalars['String']['output'];
  treasurer: Scalars['String']['output'];
};

export type Card = Node &
  Transactionable & {
    __typename?: 'Card';
    id: Scalars['ID']['output'];
    transactions: CardTransactionConnection;
  };

export type CardTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CardTransactionType>;
};

export type CardStatus = {
  __typename?: 'CardStatus';
  balance: Scalars['Int']['output'];
  cardId: Scalars['ID']['output'];
  deposit: Scalars['Int']['output'];
  hasNewerTransactions?: Maybe<Scalars['Boolean']['output']>;
  recentTransactions?: Maybe<Array<Transaction>>;
};

export type CardTransaction = Transaction & {
  __typename?: 'CardTransaction';
  Order: Array<Order>;
  balanceAfter: Scalars['Int']['output'];
  balanceBefore: Scalars['Int']['output'];
  cardId: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  depositAfter: Scalars['Int']['output'];
  depositBefore: Scalars['Int']['output'];
  deviceTime: Scalars['DateTime']['output'];
  transactionType: CardTransactionType;
};

export type CardTransactionConnection = {
  __typename?: 'CardTransactionConnection';
  /** This includes money made from deposit */
  balanceTotal: Scalars['Int']['output'];
  data: Array<CardTransaction>;
  depositIn: Scalars['Int']['output'];
  depositOut: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  uniqueCards: Scalars['Int']['output'];
};

export enum CardTransactionType {
  Cashout = 'Cashout',
  Charge = 'Charge',
  TopUp = 'TopUp',
}

export type Config = {
  __typename?: 'Config';
  board: Board;
  depositValue: Scalars['Int']['output'];
};

export type CreateBandApplicationInput = {
  bandname: Scalars['String']['input'];
  city: Scalars['String']['input'];
  contactName: Scalars['String']['input'];
  contactPhone: Scalars['String']['input'];
  demo?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  facebook?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: InputMaybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: InputMaybe<HeardAboutBookingFrom>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  knowsKultFrom?: InputMaybe<Scalars['String']['input']>;
  numberOfArtists?: InputMaybe<Scalars['Int']['input']>;
  numberOfNonMaleArtists?: InputMaybe<Scalars['Int']['input']>;
  repertoire?: InputMaybe<BandRepertoireType>;
  spotifyArtist?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
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
    id: Scalars['ID']['output'];
    lastSeen?: Maybe<Scalars['DateTime']['output']>;
    productList?: Maybe<ProductList>;
    salesNumbers: Array<SalesNumber>;
    softwareVersion?: Maybe<Scalars['String']['output']>;
    transactions: CardTransactionConnection;
  };

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
};

export type DeviceTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CardTransactionType>;
};

export enum DeviceType {
  ContactlessTerminal = 'CONTACTLESS_TERMINAL',
  Ipad = 'IPAD',
}

export type Event = Node & {
  __typename?: 'Event';
  bandApplication: Array<BandApplication>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']['output']>;
  bandApplicationStart?: Maybe<Scalars['DateTime']['output']>;
  bandsPlaying: EventBandsPlayingConnection;
  description?: Maybe<Scalars['String']['output']>;
  djApplicationEnd?: Maybe<Scalars['DateTime']['output']>;
  djApplicationStart?: Maybe<Scalars['DateTime']['output']>;
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  media: EventMediaConnection;
  name: Scalars['String']['output'];
  poster?: Maybe<PixelImage>;
  start: Scalars['DateTime']['output'];
};

export type EventBandsPlayingArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type EventMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type EventBandsPlayingConnection = {
  __typename?: 'EventBandsPlayingConnection';
  edges: Array<EventBandsPlayingConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventBandsPlayingConnectionEdge = {
  __typename?: 'EventBandsPlayingConnectionEdge';
  cursor: Scalars['String']['output'];
  node: BandPlaying;
};

export type EventMediaConnection = {
  __typename?: 'EventMediaConnection';
  edges: Array<EventMediaConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventMediaConnectionEdge = {
  __typename?: 'EventMediaConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Asset;
};

export enum EventType {
  Kulturspektakel = 'Kulturspektakel',
  Locker = 'Locker',
  Other = 'Other',
}

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
  name: Scalars['String']['output'];
  productListId: Scalars['ID']['output'];
  salesNumbers: Array<SalesNumber>;
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
};

export type MissingTransaction = Transaction & {
  __typename?: 'MissingTransaction';
  balanceAfter: Scalars['Int']['output'];
  balanceBefore: Scalars['Int']['output'];
  depositAfter: Scalars['Int']['output'];
  depositBefore: Scalars['Int']['output'];
  numberOfMissingTransactions: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBandApplication: BandApplication;
  createBandApplicationComment: BandApplication;
  createOrder: Order;
  deleteBandApplicationComment: BandApplication;
  markBandApplicationContacted: BandApplication;
  rateBandApplication: BandApplication;
  updateBandApplication: BandApplication;
  updateDeviceProductList: Device;
  upsertProductList: ProductList;
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
  eventId: Scalars['ID']['input'];
};

export type MutationCreateBandApplicationCommentArgs = {
  input: BandApplicationCommentInput;
};

export type MutationCreateOrderArgs = {
  deposit: Scalars['Int']['input'];
  deviceTime: Scalars['DateTime']['input'];
  payment: OrderPayment;
  products: Array<OrderItemInput>;
};

export type MutationDeleteBandApplicationCommentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID']['input'];
  contacted: Scalars['Boolean']['input'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUpdateBandApplicationArgs = {
  bandApplicationId: Scalars['ID']['input'];
  data?: InputMaybe<BandApplicationUpdateInput>;
};

export type MutationUpdateDeviceProductListArgs = {
  deviceId: Scalars['ID']['input'];
  productListId: Scalars['ID']['input'];
};

export type MutationUpsertProductListArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<ProductInput>>;
};

export type News = Node & {
  __typename?: 'News';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type NuclinoPage = Node & {
  __typename?: 'NuclinoPage';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedUser: NuclinoUser;
  title: Scalars['String']['output'];
};

export type NuclinoSearchResult = {
  __typename?: 'NuclinoSearchResult';
  highlight?: Maybe<Scalars['String']['output']>;
  page: NuclinoPage;
};

export type NuclinoUser = {
  __typename?: 'NuclinoUser';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type ObfuscatedBandApplication = {
  __typename?: 'ObfuscatedBandApplication';
  applicationTime: Scalars['DateTime']['output'];
  obfuscatedEmail: Scalars['String']['output'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  endTime: Scalars['DateTime']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  deposit: Scalars['Int']['output'];
  deviceId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['Int']['output'];
  items: Array<OrderItem>;
  payment: OrderPayment;
  total: Scalars['Int']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  amount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  perUnitPrice: Scalars['Int']['output'];
  productList?: Maybe<ProductList>;
};

export type OrderItemInput = {
  amount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  perUnitPrice: Scalars['Int']['input'];
  productListId?: InputMaybe<Scalars['Int']['input']>;
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

export type Page = Node & {
  __typename?: 'Page';
  bottom?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  left?: Maybe<Scalars['String']['output']>;
  right?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PixelImage = Asset & {
  __typename?: 'PixelImage';
  copyright?: Maybe<Scalars['String']['output']>;
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  scaledUri: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type PixelImageScaledUriArgs = {
  height?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export enum PreviouslyPlayed {
  No = 'No',
  OtherFormation = 'OtherFormation',
  Yes = 'Yes',
}

export type Product = Billable &
  Node & {
    __typename?: 'Product';
    additives: Array<ProductAdditives>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    price: Scalars['Int']['output'];
    productListId: Scalars['ID']['output'];
    requiresDeposit: Scalars['Boolean']['output'];
    salesNumbers: Array<SalesNumber>;
  };

export type ProductSalesNumbersArgs = {
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
};

export type ProductAdditives = {
  __typename?: 'ProductAdditives';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ProductInput = {
  additives: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  requiresDeposit: Scalars['Boolean']['input'];
};

export type ProductList = Billable &
  Node & {
    __typename?: 'ProductList';
    active: Scalars['Boolean']['output'];
    description?: Maybe<Scalars['String']['output']>;
    emoji?: Maybe<Scalars['String']['output']>;
    historicalProducts: Array<HistoricalProduct>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    product: Array<Product>;
    salesNumbers: Array<SalesNumber>;
  };

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  bandPlaying?: Maybe<BandPlaying>;
  cardStatus: CardStatus;
  checkDuplicateApplication?: Maybe<ObfuscatedBandApplication>;
  config: Config;
  crewCalendar: Array<VEvent>;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use `eventsConnection` instead. */
  events: Array<Event>;
  eventsConnection: QueryEventsConnection;
  findBandPlaying: Array<BandPlaying>;
  news: QueryNewsConnection;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  nuclinoPages: Array<NuclinoSearchResult>;
  productAdditives: Array<ProductAdditives>;
  productLists: Array<ProductList>;
  spotifyArtist: Array<SpotifyArtist>;
  transactions: Transactions;
  viewer?: Maybe<Viewer>;
};

export type QueryBandPlayingArgs = {
  eventId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
};

export type QueryCardStatusArgs = {
  payload: Scalars['String']['input'];
};

export type QueryCheckDuplicateApplicationArgs = {
  bandname: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
};

export type QueryCrewCalendarArgs = {
  includePastEvents?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryDevicesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String']['input'];
};

export type QueryEventsArgs = {
  hasBandsPlaying?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<EventType>;
};

export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasBandsPlaying?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<EventType>;
};

export type QueryFindBandPlayingArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type QueryNewsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryNuclinoPagesArgs = {
  query: Scalars['String']['input'];
};

export type QueryProductAdditivesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryProductListsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuerySpotifyArtistArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type QueryEventsConnection = {
  __typename?: 'QueryEventsConnection';
  edges: Array<QueryEventsConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryEventsConnectionEdge = {
  __typename?: 'QueryEventsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type QueryNewsConnection = {
  __typename?: 'QueryNewsConnection';
  edges: Array<QueryNewsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QueryNewsConnectionEdge = {
  __typename?: 'QueryNewsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: News;
};

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int']['output'];
  payment: OrderPayment;
  timeSeries: Array<TimeSeries>;
  total: Scalars['Float']['output'];
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: InputMaybe<TimeGrouping>;
};

export type SpotifyArtist = {
  __typename?: 'SpotifyArtist';
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum TimeGrouping {
  Day = 'Day',
  Hour = 'Hour',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type Transaction = {
  balanceAfter: Scalars['Int']['output'];
  balanceBefore: Scalars['Int']['output'];
  depositAfter: Scalars['Int']['output'];
  depositBefore: Scalars['Int']['output'];
};

export type Transactionable = {
  transactions: CardTransactionConnection;
};

export type TransactionableTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CardTransactionType>;
};

export type Transactions = Transactionable & {
  __typename?: 'Transactions';
  transactions: CardTransactionConnection;
};

export type TransactionsTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CardTransactionType>;
};

export type VEvent = {
  __typename?: 'VEvent';
  comment?: Maybe<Scalars['String']['output']>;
  end: Scalars['DateTime']['output'];
  location?: Maybe<Scalars['String']['output']>;
  start: Scalars['DateTime']['output'];
  summary: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Viewer = Node & {
  __typename?: 'Viewer';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
};

export type ApplicationDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
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
        repertoire?: BandRepertoireType | null;
        spotifyArtist?: string | null;
        spotifyMonthlyListeners?: number | null;
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
    | {__typename: 'News'}
    | {__typename: 'NuclinoPage'}
    | {__typename: 'Page'}
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
  id: Scalars['ID']['input'];
  contacted: Scalars['Boolean']['input'];
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
  id: Scalars['ID']['input'];
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
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
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

export type ProductAdditivesQueryVariables = Exact<{[key: string]: never}>;

export type ProductAdditivesQuery = {
  __typename?: 'Query';
  productAdditives: Array<{
    __typename?: 'ProductAdditives';
    id: string;
    displayName: string;
  }>;
};

export type DeviceTransactionsQueryVariables = Exact<{
  deviceID: Scalars['ID']['input'];
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
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Page'}
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
    additives: Array<{__typename?: 'ProductAdditives'; id: string}>;
  }>;
};

export type ProductListQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type ProductListQuery = {
  __typename?: 'Query';
  productList?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {__typename?: 'Event'}
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Page'}
    | {__typename?: 'Product'}
    | {
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
          additives: Array<{__typename?: 'ProductAdditives'; id: string}>;
        }>;
      }
    | {__typename?: 'Viewer'}
    | null;
  productAdditives: Array<{
    __typename?: 'ProductAdditives';
    id: string;
    displayName: string;
  }>;
};

export type UpsertProductListMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<ProductInput> | ProductInput>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
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
      additives: Array<{__typename?: 'ProductAdditives'; id: string}>;
    }>;
  };
};

export type ProductRowFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  price: number;
  requiresDeposit: boolean;
  additives: Array<{__typename?: 'ProductAdditives'; id: string}>;
};

export type RevenueDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
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
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Page'}
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
  id: Scalars['ID']['input'];
}>;

export type BandApplcationsQuery = {
  __typename?: 'Query';
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
          instagramFollower?: number | null;
          facebookLikes?: number | null;
          spotifyMonthlyListeners?: number | null;
          numberOfArtists?: number | null;
          numberOfNonMaleArtists?: number | null;
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
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Page'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type CardInfoQueryVariables = Exact<{
  cardID: Scalars['ID']['input'];
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
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Page'}
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
  productListId: Scalars['ID']['input'];
  deviceId: Scalars['ID']['input'];
}>;

export type UpdateDeviceListMutation = {
  __typename?: 'Mutation';
  updateDeviceProductList: {
    __typename?: 'Device';
    id: string;
    productList?: {__typename?: 'ProductList'; id: string; name: string} | null;
  };
};

export type ProductListsQueryVariables = Exact<{[key: string]: never}>;

export type ProductListsQuery = {
  __typename?: 'Query';
  productLists: Array<{
    __typename?: 'ProductList';
    id: string;
    emoji?: string | null;
    name: string;
    active: boolean;
  }>;
};

export type CreateProductListMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type CreateProductListMutation = {
  __typename?: 'Mutation';
  upsertProductList: {__typename?: 'ProductList'; id: string};
};

export type PublicProductPrintQueryVariables = Exact<{[key: string]: never}>;

export type PublicProductPrintQuery = {
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
      additives: Array<{__typename?: 'ProductAdditives'; id: string}>;
    }>;
  }>;
  config: {__typename?: 'Config'; depositValue: number};
  productAdditives: Array<{
    __typename?: 'ProductAdditives';
    id: string;
    displayName: string;
  }>;
};

export type RevenueQueryVariables = Exact<{
  after: Scalars['DateTime']['input'];
  before: Scalars['DateTime']['input'];
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

export type ViewerQueryVariables = Exact<{[key: string]: never}>;

export type ViewerQuery = {
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
    additives {
      id
    }
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
        repertoire
        spotifyArtist
        spotifyMonthlyListeners
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
export function useApplicationDetailsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ApplicationDetailsQuery,
    ApplicationDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
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
export type ApplicationDetailsSuspenseQueryHookResult = ReturnType<
  typeof useApplicationDetailsSuspenseQuery
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
export const ProductAdditivesDocument = gql`
  query ProductAdditives {
    productAdditives {
      id
      displayName
    }
  }
`;

/**
 * __useProductAdditivesQuery__
 *
 * To run a query within a React component, call `useProductAdditivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAdditivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAdditivesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductAdditivesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductAdditivesQuery,
    ProductAdditivesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ProductAdditivesQuery, ProductAdditivesQueryVariables>(
    ProductAdditivesDocument,
    options,
  );
}
export function useProductAdditivesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductAdditivesQuery,
    ProductAdditivesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    ProductAdditivesQuery,
    ProductAdditivesQueryVariables
  >(ProductAdditivesDocument, options);
}
export function useProductAdditivesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ProductAdditivesQuery,
    ProductAdditivesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
    ProductAdditivesQuery,
    ProductAdditivesQueryVariables
  >(ProductAdditivesDocument, options);
}
export type ProductAdditivesQueryHookResult = ReturnType<
  typeof useProductAdditivesQuery
>;
export type ProductAdditivesLazyQueryHookResult = ReturnType<
  typeof useProductAdditivesLazyQuery
>;
export type ProductAdditivesSuspenseQueryHookResult = ReturnType<
  typeof useProductAdditivesSuspenseQuery
>;
export type ProductAdditivesQueryResult = Apollo.QueryResult<
  ProductAdditivesQuery,
  ProductAdditivesQueryVariables
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
export function useDeviceTransactionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    DeviceTransactionsQuery,
    DeviceTransactionsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
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
export type DeviceTransactionsSuspenseQueryHookResult = ReturnType<
  typeof useDeviceTransactionsSuspenseQuery
>;
export type DeviceTransactionsQueryResult = Apollo.QueryResult<
  DeviceTransactionsQuery,
  DeviceTransactionsQueryVariables
>;
export const ProductListDocument = gql`
  query ProductList($id: ID!) {
    productList: node(id: $id) {
      ... on ProductList {
        ...ProductList
      }
    }
    productAdditives {
      id
      displayName
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductListQuery(
  baseOptions: Apollo.QueryHookOptions<
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
export function useProductListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ProductListQuery,
    ProductListQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<ProductListQuery, ProductListQueryVariables>(
    ProductListDocument,
    options,
  );
}
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<
  typeof useProductListLazyQuery
>;
export type ProductListSuspenseQueryHookResult = ReturnType<
  typeof useProductListSuspenseQuery
>;
export type ProductListQueryResult = Apollo.QueryResult<
  ProductListQuery,
  ProductListQueryVariables
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
export function useRevenueDetailsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RevenueDetailsQuery,
    RevenueDetailsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
    RevenueDetailsQuery,
    RevenueDetailsQueryVariables
  >(RevenueDetailsDocument, options);
}
export type RevenueDetailsQueryHookResult = ReturnType<
  typeof useRevenueDetailsQuery
>;
export type RevenueDetailsLazyQueryHookResult = ReturnType<
  typeof useRevenueDetailsLazyQuery
>;
export type RevenueDetailsSuspenseQueryHookResult = ReturnType<
  typeof useRevenueDetailsSuspenseQuery
>;
export type RevenueDetailsQueryResult = Apollo.QueryResult<
  RevenueDetailsQuery,
  RevenueDetailsQueryVariables
>;
export const BandApplcationsDocument = gql`
  query BandApplcations($id: ID!) {
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
          instagramFollower
          facebookLikes
          spotifyMonthlyListeners
          numberOfArtists
          numberOfNonMaleArtists
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
export function useBandApplcationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    BandApplcationsQuery,
    BandApplcationsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
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
export type BandApplcationsSuspenseQueryHookResult = ReturnType<
  typeof useBandApplcationsSuspenseQuery
>;
export type BandApplcationsQueryResult = Apollo.QueryResult<
  BandApplcationsQuery,
  BandApplcationsQueryVariables
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
export function useCardInfoSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CardInfoQuery,
    CardInfoQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<CardInfoQuery, CardInfoQueryVariables>(
    CardInfoDocument,
    options,
  );
}
export type CardInfoQueryHookResult = ReturnType<typeof useCardInfoQuery>;
export type CardInfoLazyQueryHookResult = ReturnType<
  typeof useCardInfoLazyQuery
>;
export type CardInfoSuspenseQueryHookResult = ReturnType<
  typeof useCardInfoSuspenseQuery
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
export function useDevicesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    DevicesQuery,
    DevicesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<DevicesQuery, DevicesQueryVariables>(
    DevicesDocument,
    options,
  );
}
export type DevicesQueryHookResult = ReturnType<typeof useDevicesQuery>;
export type DevicesLazyQueryHookResult = ReturnType<typeof useDevicesLazyQuery>;
export type DevicesSuspenseQueryHookResult = ReturnType<
  typeof useDevicesSuspenseQuery
>;
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
export const ProductListsDocument = gql`
  query ProductLists {
    productLists {
      id
      emoji
      name
      active
    }
  }
`;

/**
 * __useProductListsQuery__
 *
 * To run a query within a React component, call `useProductListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductListsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductListsQuery,
    ProductListsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ProductListsQuery, ProductListsQueryVariables>(
    ProductListsDocument,
    options,
  );
}
export function useProductListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductListsQuery,
    ProductListsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ProductListsQuery, ProductListsQueryVariables>(
    ProductListsDocument,
    options,
  );
}
export function useProductListsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ProductListsQuery,
    ProductListsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<ProductListsQuery, ProductListsQueryVariables>(
    ProductListsDocument,
    options,
  );
}
export type ProductListsQueryHookResult = ReturnType<
  typeof useProductListsQuery
>;
export type ProductListsLazyQueryHookResult = ReturnType<
  typeof useProductListsLazyQuery
>;
export type ProductListsSuspenseQueryHookResult = ReturnType<
  typeof useProductListsSuspenseQuery
>;
export type ProductListsQueryResult = Apollo.QueryResult<
  ProductListsQuery,
  ProductListsQueryVariables
>;
export const CreateProductListDocument = gql`
  mutation CreateProductList($name: String!) {
    upsertProductList(name: $name) {
      id
    }
  }
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
export const PublicProductPrintDocument = gql`
  query PublicProductPrint {
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
        additives {
          id
        }
      }
    }
    config {
      depositValue
    }
    productAdditives {
      id
      displayName
    }
  }
`;

/**
 * __usePublicProductPrintQuery__
 *
 * To run a query within a React component, call `usePublicProductPrintQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProductPrintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProductPrintQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicProductPrintQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >(PublicProductPrintDocument, options);
}
export function usePublicProductPrintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >(PublicProductPrintDocument, options);
}
export function usePublicProductPrintSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<
    PublicProductPrintQuery,
    PublicProductPrintQueryVariables
  >(PublicProductPrintDocument, options);
}
export type PublicProductPrintQueryHookResult = ReturnType<
  typeof usePublicProductPrintQuery
>;
export type PublicProductPrintLazyQueryHookResult = ReturnType<
  typeof usePublicProductPrintLazyQuery
>;
export type PublicProductPrintSuspenseQueryHookResult = ReturnType<
  typeof usePublicProductPrintSuspenseQuery
>;
export type PublicProductPrintQueryResult = Apollo.QueryResult<
  PublicProductPrintQuery,
  PublicProductPrintQueryVariables
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
export function useRevenueSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RevenueQuery,
    RevenueQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<RevenueQuery, RevenueQueryVariables>(
    RevenueDocument,
    options,
  );
}
export type RevenueQueryHookResult = ReturnType<typeof useRevenueQuery>;
export type RevenueLazyQueryHookResult = ReturnType<typeof useRevenueLazyQuery>;
export type RevenueSuspenseQueryHookResult = ReturnType<
  typeof useRevenueSuspenseQuery
>;
export type RevenueQueryResult = Apollo.QueryResult<
  RevenueQuery,
  RevenueQueryVariables
>;
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      id
      displayName
      profilePicture
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
export function useViewerSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ViewerQuery,
    ViewerQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useSuspenseQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    options,
  );
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerSuspenseQueryHookResult = ReturnType<
  typeof useViewerSuspenseQuery
>;
export type ViewerQueryResult = Apollo.QueryResult<
  ViewerQuery,
  ViewerQueryVariables
>;
