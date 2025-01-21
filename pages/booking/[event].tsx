import {Avatar, Table, Tag, theme, Tooltip, Typography} from 'antd';
import React, {useMemo, useRef, useState} from 'react';
import {gql} from '@apollo/client';
import {
  BandApplcationsQuery,
  GenreCategory,
  useBandApplcationsQuery,
} from 'types/graphql';
import Rater from 'components/booking/Rater';
import BandApplicationDetails from 'components/booking/BandApplicationDetails';
import {useRouter} from 'next/router';
import Rating from 'components/booking/Rating';
import {CommentOutlined} from '@ant-design/icons';
import QuickType from 'components/booking/QuickType';
import useResizeObserver from '@react-hook/resize-observer';
import useViewerContext from 'utils/useViewerContext';
import {FireFilled} from '@ant-design/icons';
import NonMale from 'components/booking/NonMale';
import Center from 'components/booking/Center';

gql`
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
  query BandApplcations($id: ID!) {
    bandApplicationTags
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
          tags
          ...ContactedBy
          ...Rating
        }
      }
    }
  }
`;

type RecordType = Extract<
  BandApplcationsQuery['node'],
  {__typename?: 'Event'}
>['bandApplication'][number];

export const GENRE_ICONS: Map<GenreCategory, string> = new Map([
  [GenreCategory.Pop, 'pop.svg'],
  [GenreCategory.Rock, 'rock.svg'],
  [GenreCategory.Indie, 'indie.svg'],
  [GenreCategory.HardrockMetalPunk, 'metal.svg'],
  [GenreCategory.FolkSingerSongwriterCountry, 'country.svg'],
  [GenreCategory.ElektroHipHop, 'hip_hop.svg'],
  [GenreCategory.BluesFunkJazzSoul, 'jazz.svg'],
  [GenreCategory.ReggaeSka, 'hippie.svg'],
  [GenreCategory.Dj, 'disco.svg'],
  [GenreCategory.Other, 'vocal.svg'],
]);

export const GENRE_CATEGORIES: Map<GenreCategory, string> = new Map([
  [GenreCategory.Pop, 'Pop'],
  [GenreCategory.Rock, 'Rock'],
  [GenreCategory.Indie, 'Indie'],
  [GenreCategory.HardrockMetalPunk, 'Hardrock / Metal / Punk'],
  [
    GenreCategory.FolkSingerSongwriterCountry,
    'Folk / Singer/Songwriter / Country',
  ],
  [GenreCategory.ElektroHipHop, 'Elektro / Hip-Hop'],
  [GenreCategory.BluesFunkJazzSoul, 'Blues / Funk / Jazz / Soul'],
  [GenreCategory.ReggaeSka, 'Reggae / Ska'],
  [GenreCategory.Dj, 'DJ'],
  [GenreCategory.Other, 'andere Musikrichtung'],
]);

const useSize = (target: React.MutableRefObject<HTMLDivElement | null>) => {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export default function Booking() {
  const router = useRouter();
  const {data, loading} = useBandApplcationsQuery({
    variables: {
      id: `Event:${router.query.event}`,
    },
  });
  const [selected, setSelected] = useState<string | null>(null);

  const dataSource =
    data?.node?.__typename === 'Event' ? data.node.bandApplication : [];

  const target = useRef<HTMLDivElement>(null);
  const size = useSize(target);

  return (
    <div style={{width: '100%', height: '100vh'}} ref={target}>
      <QuickType data={dataSource} onSelect={setSelected} />
      <MemoizedTable
        tags={data?.bandApplicationTags ?? []}
        loading={loading}
        dataSource={dataSource}
        setSelected={setSelected}
        height={(size?.height ?? 0) - 40}
      />
      <BandApplicationDetails
        bandApplicationId={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

const getMax = (dataSource: RecordType[], value: keyof RecordType) =>
  dataSource.reduce<number>(
    (max, cv) => Math.max((cv[value] as number) ?? 0, max),
    0,
  );

type Maxima = {
  instagramFollower: number;
  facebookLikes: number;
  spotifyMonthlyListeners: number;
};

// probably could use memoization here
const popularityScore = (maxima: Maxima, record: RecordType) => {
  return Math.pow(
    Object.keys(maxima).reduce(
      (acc, key) =>
        acc +
        (record[key as keyof Maxima] as number) / maxima[key as keyof Maxima],
      0,
    ) /
      Math.max(
        Object.keys(maxima).reduce(
          (acc, key) => acc + (record[key as keyof Maxima] ? 1 : 0),
          0,
        ),
        1,
      ),
    1 / 6,
  );
};

const MemoizedTable = React.memo(
  ({
    setSelected,
    loading,
    dataSource,
    height,
    tags,
  }: {
    dataSource: RecordType[];
    loading: boolean;
    setSelected: (id: string) => void;
    height: number;
    tags: string[];
  }) => {
    const {token} = theme.useToken();
    const ids = useMemo(
      () =>
        dataSource?.reduce(
          (acc, cv, i) => acc.set(cv.id, i + 1),
          new Map<string, number>(),
        ) ?? new Map(),
      [dataSource],
    );
    const viewer = useViewerContext();

    const maxima = useMemo(
      () => ({
        instagramFollower: getMax(dataSource, 'instagramFollower'),
        facebookLikes: getMax(dataSource, 'facebookLikes'),
        spotifyMonthlyListeners: getMax(dataSource, 'spotifyMonthlyListeners'),
      }),
      [dataSource],
    );

    return (
      <Table<RecordType>
        loading={loading}
        pagination={false}
        virtual
        scroll={{y: height}}
        onRow={(r) => ({
          onClick: (e) =>
            !new Set(['path', 'input']).has(
              (e.target as any).tagName.toLowerCase(),
            ) && setSelected(r.id),
        })}
        size="small"
        columns={[
          {
            key: 'index',
            title: '',
            dataIndex: 'id',
            width: 50,
            render: (id) => <Center align="center">{ids.get(id)}</Center>,
          },
          {
            key: 'genreCategory',
            title: '',
            width: 50,
            dataIndex: 'genreCategory',
            filterMultiple: true,
            filters: Array.from(GENRE_CATEGORIES.entries()).map(
              ([value, text]) => ({text, value}),
            ),
            onFilter: (value, {genreCategory}) => value === genreCategory,
            render: (_, {genreCategory}) => (
              <Center align="center">
                <Tooltip
                  title={GENRE_CATEGORIES.get(genreCategory)}
                  placement="topRight"
                >
                  <img
                    src={`/genre/${GENRE_ICONS.get(genreCategory)}`}
                    width="32px"
                    height="32px"
                    alt="Genre"
                  />
                </Tooltip>
              </Center>
            ),
          },
          {
            key: 'bandname',
            title: 'Name',
            dataIndex: 'bandname',
            render: (
              _,
              {bandname, genre, numberOfArtists, numberOfNonMaleArtists},
            ) => (
              <>
                <strong>{bandname}</strong>
                {numberOfArtists != null &&
                numberOfNonMaleArtists != null &&
                numberOfNonMaleArtists > 0 ? (
                  <>
                    &nbsp;
                    <Tooltip
                      title={
                        <NonMale
                          numberOfArtists={numberOfArtists}
                          numberOfNonMaleArtists={numberOfNonMaleArtists}
                        />
                      }
                    >
                      ⚧️
                    </Tooltip>
                  </>
                ) : null}
                {genre && (
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {genre}
                  </div>
                )}
              </>
            ),
          },
          {
            key: 'city',
            title: 'Ort',
            width: 200,
            dataIndex: 'city',
            sorter: (a, b) => (a.distance ?? 0) - (b.distance ?? 0),
            render: (_, {city, distance}) => (
              <>
                {city}
                {distance && (
                  <>
                    <br />
                    <Typography.Text type="secondary">
                      {distance.toFixed()}&thinsp;km
                    </Typography.Text>
                  </>
                )}
              </>
            ),
          },
          {
            key: 'popularity',
            title: 'Popularität',
            align: 'center',
            width: 100,
            sorter: (a, b) =>
              popularityScore(maxima, a) > popularityScore(maxima, b) ? 1 : -1,
            render: (_, record) => (
              <Center align="center">
                <FireFilled
                  style={{
                    transform: `scale(${popularityScore(maxima, record) * 2})`,
                    color: `hsl(${
                      220 + popularityScore(maxima, record) * 120
                    }, 100%, 50%)`,
                  }}
                />
              </Center>
            ),
          },
          {
            key: 'rating',
            title: 'Bewertung',
            width: 120,
            dataIndex: 'rating',
            sorter: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
            align: 'right',
            render: (_, {rating, bandApplicationRating}) =>
              rating ? (
                <Center>
                  <Rating
                    rating={rating}
                    bandApplicationRating={bandApplicationRating}
                  />
                </Center>
              ) : null,
          },
          {
            key: 'rater',
            title: '',
            dataIndex: 'rating',
            width: 150,
            render: (_, {id, bandApplicationRating}) => (
              <Center>
                <Rater
                  bandApplicationRating={bandApplicationRating}
                  bandApplicationId={id}
                  value={
                    bandApplicationRating.find(
                      ({viewer: {id}}) => id === viewer?.id,
                    )?.rating
                  }
                />
              </Center>
            ),
          },
          {
            key: 'avatars',
            title: '',
            dataIndex: 'rating',
            width: 150,
            render: (_, {bandApplicationRating}) => (
              <Center>
                <Avatar.Group>
                  {bandApplicationRating.map((r) => (
                    <Tooltip
                      key={r.viewer.id}
                      title={r.viewer.displayName}
                      placement="topLeft"
                    >
                      <Avatar src={r.viewer.profilePicture} size="small" />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </Center>
            ),
          },
          // {
          //   key: 'comments',
          //   dataIndex: 'comments',
          //   width: 50,
          //   render: (_, {comments}) =>
          //     comments.totalCount > 0 ? (
          //       <Center>
          //         <Tooltip
          //           title={`${comments.totalCount} Kommentar${
          //             comments.totalCount !== 1 ? 'e' : ''
          //           }`}
          //           placement="left"
          //         >
          //           <CommentOutlined
          //             style={{fontSize: 20, color: token.colorPrimary}}
          //             rev={undefined}
          //           />
          //         </Tooltip>
          //       </Center>
          //     ) : null,
          // },
          {
            key: 'tags',
            dataIndex: 'tags',
            width: 150,
            title: 'Tags',
            filterMultiple: true,
            filters: tags.map((tag) => ({text: tag, value: tag})),
            onFilter: (value, {tags}) => tags.some((t) => t === value),
            render: (_, {tags}) => (
              <Center>
                <span>
                  {tags.map((tag) => (
                    <Tag onClick={() => {}} key={tag} color="blue">
                      {tag}
                    </Tag>
                  ))}
                </span>
              </Center>
            ),
          },
        ]}
        dataSource={dataSource}
        rowKey="id"
      />
    );
  },
);

MemoizedTable.displayName = 'MemoizedTable';
