import {gql} from '@apollo/client';
import {
  Checkbox,
  Col,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Statistic,
  theme,
  Typography,
} from 'antd';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  useApplicationDetailsQuery,
  ApplicationDetailsQuery,
  useMarkAsContextedMutation,
  PreviouslyPlayed,
  BandRepertoireType,
} from 'types/graphql';
import Demo from './Demo';
import Rater from './Rater';
import Rating from './Rating';
import {GlobalOutlined} from '@ant-design/icons';
import styles from './BandApplicationDetails.module.css';
import BandApplicationTimeline from './BandApplicationTimeline';
import Clipboard from 'components/shared/Clipboard';

import {GENRE_CATEGORIES, GENRE_ICONS} from 'pages/booking/[event]';
import dynamic from 'next/dynamic';
import useViewerContext from 'utils/useViewerContext';
import NonMale from './NonMale';

const LazyGoogleMap = dynamic(() => import('./GoogleMaps'), {
  loading: () => <Skeleton.Image active className={styles.mapInner} />,
});

gql`
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

  fragment ContactedBy on BandApplication {
    contactedByViewer {
      id
      displayName
    }
  }

  mutation MarkAsContexted($id: ID!, $contacted: Boolean!) {
    markBandApplicationContacted(
      bandApplicationId: $id
      contacted: $contacted
    ) {
      id
      ...ContactedBy
    }
  }
`;

export default function BandApplicationDetails({
  bandApplicationId,
  onClose,
}: {
  bandApplicationId: string | null;
  onClose: () => void;
}) {
  const previousId = useRef(bandApplicationId);
  // using previous ID, during leave animation
  const id = bandApplicationId ?? previousId?.current;
  const {data} = useApplicationDetailsQuery({
    variables: {
      id: id!,
    },
    skip: !id,
  });

  useEffect(() => {
    if (bandApplicationId) {
      previousId.current = bandApplicationId;
    }
  }, [bandApplicationId]);

  return (
    <Modal
      title={
        <Skeleton
          paragraph={false}
          className={styles.skeletonTitle}
          loading={data?.node?.__typename !== 'BandApplication'}
        >
          {data?.node?.__typename === 'BandApplication' && (
            <div className={styles.titleGroup}>
              <img
                src={`/genre/${GENRE_ICONS.get(data?.node?.genreCategory)}`}
                width="32px"
                height="32px"
                alt="Genre"
              />
              <div>
                <Clipboard value={data?.node.bandname}>
                  <Typography.Title className={styles.title} level={4}>
                    {data?.node.bandname}
                  </Typography.Title>
                </Clipboard>
                <Typography.Text className={styles.subTitle} type="secondary">
                  {data?.node.genre ??
                    GENRE_CATEGORIES.get(data?.node.genreCategory)}
                </Typography.Text>
              </div>
            </div>
          )}
        </Skeleton>
      }
      width="80%"
      className={styles.modal}
      closable={true}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
      open={Boolean(bandApplicationId)}
    >
      <Row gutter={24}>
        {data?.node?.__typename === 'BandApplication' ? (
          <DrawerContent {...data?.node} />
        ) : (
          <>
            <Col span={12}>
              <div className={styles.map}>
                <Skeleton.Image active={true} className={styles.mapInner} />
              </div>
              <br />
              <Skeleton active={true} />
            </Col>
            <Col span={12}>
              <Skeleton active={true} title={false} />
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
}

type Props = Extract<
  ApplicationDetailsQuery['node'],
  {__typename?: 'BandApplication'}
>;

function DrawerContent(props: Props) {
  const [contacted] = useMarkAsContextedMutation();
  const {token} = theme.useToken();
  const viewer = useViewerContext();

  const onContact = useCallback(
    (c: boolean) =>
      contacted({
        variables: {
          contacted: c,
          id: props.id,
        },
        optimisticResponse: () => ({
          markBandApplicationContacted: {
            __typename: 'BandApplication',
            id: props.id,
            contactedByViewer: c ? viewer : null,
          },
        }),
      }),
    [contacted, props.id, viewer],
  );

  return (
    <>
      <Col span={12}>
        {props.demo && (
          <Demo
            demo={props.demo}
            demoEmbed={props.demoEmbed}
            demoEmbedType={props.demoEmbedType}
          />
        )}
        {props.hasPreviouslyPlayed && (
          <Typography.Title level={5}>
            Schonmal gespielt:&nbsp;
            <span className={styles.inlineHeading}>
              {PreviouslyPlayedText(props.hasPreviouslyPlayed)}
            </span>
          </Typography.Title>
        )}
        {props.repertoire && (
          <Typography.Title level={5}>
            Repertoire:&nbsp;
            <span className={styles.inlineHeading}>
              {BandRepertoire(props.repertoire)}
            </span>
          </Typography.Title>
        )}
        {props.numberOfArtists != null &&
          props.numberOfNonMaleArtists != null && (
            <Typography.Title level={5}>
              Bandgröße:&nbsp;
              <span className={styles.inlineHeading}>
                <NonMale
                  numberOfArtists={props.numberOfArtists}
                  numberOfNonMaleArtists={props.numberOfNonMaleArtists}
                />
              </span>
            </Typography.Title>
          )}
        {props.knowsKultFrom && (
          <>
            <Typography.Title level={5}>
              Woher kennt ihr das Kult?
            </Typography.Title>
            <Typography.Paragraph
              ellipsis={{rows: 5, expandable: true, symbol: 'mehr'}}
            >
              {props.knowsKultFrom}
            </Typography.Paragraph>
          </>
        )}
        {props.description && (
          <>
            <Typography.Title level={5}>Bandbeschreibung</Typography.Title>
            <Typography.Paragraph
              ellipsis={{rows: 5, expandable: true, symbol: 'mehr'}}
            >
              {props.description}
            </Typography.Paragraph>
          </>
        )}

        <Typography.Title level={5}>
          Anreise:&nbsp;
          <span className={styles.inlineHeading}>
            {props.city}
            {props.distance != null && <> ({props.distance.toFixed()} km)</>}
          </span>
        </Typography.Title>
        {props.latitude != null && props.longitude != null && (
          <div className={styles.map}>
            <LazyGoogleMap
              latitude={props.latitude}
              longitude={props.longitude}
            />
          </div>
        )}

        <Typography.Title level={5}>Kontakt</Typography.Title>
        {props.contactName}
        <br />
        {props.contactPhone}
        <br />
        <Popconfirm
          title="Band als kontaktiert markieren?"
          onConfirm={() => onContact(true)}
          okText="Ja"
          cancelText="Nein"
          disabled={props.contactedByViewer != null}
        >
          <Clipboard>{props.email}</Clipboard>&emsp;
        </Popconfirm>
        <br />
        <Checkbox
          onChange={(e) => onContact(e.target.checked)}
          checked={props.contactedByViewer != null}
        >
          Kontaktiert
        </Checkbox>
      </Col>
      <Col span={12}>
        {(props.website ||
          props.facebook ||
          props.instagram ||
          props.spotifyArtist) && (
          <Row className={styles.social}>
            {props.website && (
              <Col span={6}>
                <a href={props.website} target="_blank" rel="noreferrer">
                  <Statistic
                    valueStyle={{color: token.colorPrimary}}
                    value={' '}
                    prefix={<GlobalOutlined rev={undefined} color="blue" />}
                    title="Webseite"
                  />
                </a>
              </Col>
            )}
            {props.facebook && (
              <Col span={6}>
                <a href={props.facebook} target="_blank" rel="noreferrer">
                  <Statistic
                    valueStyle={{color: token.colorPrimary}}
                    value={props.facebookLikes ?? '?'}
                    title="Facebook"
                  />
                </a>
              </Col>
            )}
            {props.instagram && (
              <Col span={6}>
                <a
                  href={`https://instagram.com/${props.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Statistic
                    valueStyle={{color: token.colorPrimary}}
                    value={props.instagramFollower ?? '?'}
                    title="Instagram"
                  />
                </a>
              </Col>
            )}
            {props.spotifyArtist && (
              <Col span={6}>
                <a
                  href={`https://open.spotify.com/artist/${props.spotifyArtist}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Statistic
                    valueStyle={{color: token.colorPrimary}}
                    value={props.spotifyMonthlyListeners ?? ' '}
                    prefix={
                      props.spotifyMonthlyListeners ? null : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          width="23px"
                          style={{marginTop: 6}}
                        >
                          <path
                            fill="currentColor"
                            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                          />
                          <path
                            fill="white"
                            d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
                          />
                        </svg>
                      )
                    }
                    title="Spotify"
                  />
                </a>
              </Col>
            )}
          </Row>
        )}
        <Typography.Title level={5} className={styles.firstHeading}>
          Bewertung
        </Typography.Title>
        <Row>
          <Col span={8}>
            <Rater
              bandApplicationRating={props.bandApplicationRating}
              bandApplicationId={props.id}
              value={
                props.bandApplicationRating.find(
                  ({viewer: {id}}) => id === viewer?.id,
                )?.rating
              }
            />
          </Col>
          <Col span={8}>
            {props.rating && (
              <Rating
                rating={props.rating}
                bandApplicationRating={props.bandApplicationRating}
              />
            )}
          </Col>
        </Row>
        <BandApplicationTimeline
          id={props.id}
          createdAt={props.createdAt}
          pastApplications={props.pastApplications}
          pastPerformances={props.pastPerformances}
          comments={props.comments}
        />
      </Col>
    </>
  );
}

function PreviouslyPlayedText(text: PreviouslyPlayed): string {
  switch (text) {
    case PreviouslyPlayed.Yes:
      return 'Ja';
    case PreviouslyPlayed.OtherFormation:
      return 'In einer anderen Band';
    case PreviouslyPlayed.No:
      return 'Nein';
  }
}

function BandRepertoire(text: BandRepertoireType): string {
  switch (text) {
    case BandRepertoireType.ExclusivelyCoverSongs:
      return 'Nur Coversongs';
    case BandRepertoireType.MostlyCoverSongs:
      return 'Hauptsächlich Coversongs';
    case BandRepertoireType.MostlyOwnSongs:
      return 'Hauptsächlich eigene Songs';
    case BandRepertoireType.ExclusivelyOwnSongs:
      return 'Nur eigene Songs';
  }
}
