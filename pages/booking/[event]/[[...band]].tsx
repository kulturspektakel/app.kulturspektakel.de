import {Avatar, Checkbox, Table, Tooltip} from 'antd';
import React, {useMemo, useState} from 'react';
import Page from '../../../components/shared/Page';
import {gql} from '@apollo/client';
import {
  BandApplcationsQuery,
  GenreCategory,
  useBandApplcationsQuery,
  useMarkAsContextedMutation,
} from '../../../types/graphql';
import Rater from '../../../components/booking/Rater';
import BandApplicationDetails from '../../../components/booking/BandApplicationDetails';
import AutoSizer from 'react-virtualized-auto-sizer';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import useViewerContext from '../../../utils/useViewerContext';
import Rating from '../../../components/booking/Rating';

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
`;

type RecordType = Extract<
  BandApplcationsQuery['node'],
  {__typename?: 'Event'}
>['bandApplication'][number];

const GENRE_ICONS: Map<GenreCategory, string> = new Map([
  [GenreCategory.Pop, 'pop.svg'],
  [GenreCategory.Rock, 'rock.svg'],
  [GenreCategory.Indie, 'indie.svg'],
  [GenreCategory.HardrockMetalPunk, 'metal.svg'],
  [GenreCategory.FolkSingerSongwriterCountry, 'country.svg'],
  [GenreCategory.ElektroHipHop, 'hip_hop.svg'],
  [GenreCategory.BluesFunkJazzSoul, 'jazz.svg'],
  [GenreCategory.ReggaeSka, 'hippie.svg'],
  [GenreCategory.Other, 'vocal.svg'],
]);

const GENRE_CATEGORIES: Map<GenreCategory, string> = new Map([
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
  [GenreCategory.Other, 'andere Musikrichtung'],
]);

export default function Booking() {
  const router = useRouter();
  const {data, loading} = useBandApplcationsQuery({
    variables: {
      id: `Event:${router.query.event}`,
    },
  });
  const [selected, setSelected] = useState<string | null>(
    router.query.band ? String(router.query.band) : null,
  );
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {...router.query, band: selected},
    });
  }, [selected]);

  return (
    <Page>
      <AutoSizer>
        {({height, width}) => (
          <div style={{height, width}}>
            <MemoizedTable
              loading={loading}
              dataSource={
                data?.node?.__typename === 'Event'
                  ? data.node.bandApplication
                  : []
              }
              setSelected={setSelected}
              height={height - 40}
            />
          </div>
        )}
      </AutoSizer>
      {selected && (
        <BandApplicationDetails
          bandApplicationId={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </Page>
  );
}

const MemoizedTable = React.memo(
  ({
    setSelected,
    loading,
    dataSource,
    height,
  }: {
    dataSource: RecordType[];
    loading: boolean;
    setSelected: (id: string) => void;
    height: number;
  }) => {
    const viewer = useViewerContext();
    const [markContacted] = useMarkAsContextedMutation();
    const ids = useMemo(
      () =>
        dataSource?.reduce(
          (acc, cv, i) => acc.set(cv.id, i + 1),
          new Map<string, number>(),
        ) ?? new Map(),
      [dataSource],
    );

    return (
      <Table<RecordType>
        loading={loading}
        pagination={false}
        scroll={{y: height, x: 500}}
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
            align: 'center',
            width: 50,
            render: (id) => ids.get(id),
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
              <Tooltip
                title={GENRE_CATEGORIES.get(genreCategory)}
                placement="topRight"
              >
                <img
                  src={`/genre/${GENRE_ICONS.get(genreCategory)}`}
                  width="30px"
                />
              </Tooltip>
            ),
          },
          {
            key: 'bandname',
            title: 'Name',
            dataIndex: 'bandname',
            render: (_, {bandname, genre}) => (
              <>
                <strong>{bandname}</strong>
                {genre && (
                  <>
                    <br />
                    {genre}
                  </>
                )}
              </>
            ),
          },
          {
            key: 'city',
            title: 'Ort',
            width: 300,
            dataIndex: 'city',
            sorter: (a, b) => (a.distance ?? 0) - (b.distance ?? 0),
            render: (_, {city, distance}) => (
              <>
                {city}
                {distance && (
                  <>
                    <br />
                    <span style={{opacity: 0.5}}>
                      {distance.toFixed()}&thinsp;km
                    </span>
                  </>
                )}
              </>
            ),
          },
          {
            key: 'rating',
            title: 'Bewertung',
            width: 150,
            dataIndex: 'rating',
            sorter: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
            align: 'right',
            render: (_, {rating, bandApplicationRating}) =>
              rating ? (
                <Rating
                  rating={rating}
                  bandApplicationRating={bandApplicationRating}
                />
              ) : null,
          },
          {
            key: 'rater',
            title: '',
            dataIndex: 'rating',
            width: 150,
            render: (_, {id, bandApplicationRating}) => (
              <Rater
                bandApplicationId={id}
                defaultValue={
                  bandApplicationRating.find(
                    ({viewer: {id}}) => id === viewer?.id,
                  )?.rating
                }
              />
            ),
          },
          {
            key: 'avatars',
            title: '',
            dataIndex: 'rating',
            width: 150,
            render: (_, {id, bandApplicationRating}) => (
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
            ),
          },
          {
            key: 'contactedByViewer',
            title: 'Kontakt',
            dataIndex: 'contactedByViewer',
            width: 80,
            align: 'center',
            render: (_, {contactedByViewer, id}) => (
              <Tooltip
                title={
                  contactedByViewer
                    ? `Kontaktiert von ${contactedByViewer.displayName}`
                    : 'als kontaktiert markieren'
                }
                placement="topLeft"
              >
                <Checkbox
                  checked={Boolean(contactedByViewer)}
                  onChange={(e) =>
                    markContacted({
                      variables: {
                        contacted: e.target.checked,
                        id,
                      },
                      optimisticResponse: {
                        markBandApplicationContacted: {
                          __typename: 'BandApplication',
                          id,
                          contactedByViewer: e.target.checked ? viewer : null,
                        },
                      },
                    })
                  }
                />
              </Tooltip>
            ),
          },
        ]}
        dataSource={dataSource}
        rowKey="id"
      />
    );
  },
);
