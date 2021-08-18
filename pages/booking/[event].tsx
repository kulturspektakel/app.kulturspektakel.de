import {Avatar, Table, Tooltip} from 'antd';
import React, {useState} from 'react';
import Page from '../../components/shared/Page';
import {gql} from '@apollo/client';
import {
  BandApplcationsQuery,
  GenreCategory,
  useBandApplcationsQuery,
} from '../../types/graphql';
import Rater from '../../components/booking/Rater';
import BandApplicationDetails from '../../components/booking/BandApplicationDetails';
import AutoSizer from 'react-virtualized-auto-sizer';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

gql`
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
          facebookLikes
          instagramFollower
          bandApplicationRating {
            viewer {
              id
              displayName
              profilePicture
            }
            rating
          }
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

  if (data?.node.__typename !== 'Event') {
    return null;
  }
  return (
    <Page>
      <BandApplicationDetails
        bandApplicationId={selected}
        onClose={() => setSelected(null)}
      />
      <div style={{flexGrow: 1, width: '100%', height: '100%'}}>
        <Table<RecordType>
          loading={loading}
          pagination={false}
          scroll={{y: 1000}}
          onRow={(r) => ({
            onClick: () => setSelected(r.id),
          })}
          size="small"
          columns={[
            {
              title: '',
              dataIndex: 'genreCategory',
              align: 'center',
              width: 50,
              render: (_, __, index) => index + 1,
            },
            {
              title: '',
              width: 50,
              dataIndex: 'genreCategory',
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
              title: 'Ort',
              dataIndex: 'city',
              sorter: (a, b) => a.distance - b.distance,
              render: (_, {city, distance}) => (
                <>
                  {city}
                  {distance && (
                    <>
                      <br />
                      {distance.toFixed()}&thinsp;km
                    </>
                  )}
                </>
              ),
            },
            {
              title: 'Bewertung',
              dataIndex: 'rating',
              sorter: (a, b) => a.rating - b.rating,
              align: 'right',
              render: (_, {rating}) => <span>{rating?.toFixed(2)}</span>,
            },
            {
              title: '',
              dataIndex: 'rating',
              width: 150,
              render: (_, {id}) => <Rater bandApplicationId={id} />,
            },
            {
              title: '',
              dataIndex: 'rating',
              width: 150,
              render: (_, {id, bandApplicationRating}) => (
                <Avatar.Group>
                  {bandApplicationRating.map((r) => (
                    <Tooltip title={r.viewer.displayName} placement="topLeft">
                      <Avatar
                        key={r.viewer.id}
                        src={r.viewer.profilePicture}
                        size="small"
                      />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              ),
            },
          ]}
          dataSource={data.node.bandApplication}
          rowKey="id"
        />
      </div>
    </Page>
  );
}
