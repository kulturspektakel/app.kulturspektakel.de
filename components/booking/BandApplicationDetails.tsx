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
        {props.numberOfArtists != null &&
          props.numberOfNonMaleArtists != null && (
            <Typography.Title level={5}>
              Bandgröße:&nbsp;
              <span className={styles.inlineHeading}>
                {props.numberOfArtists} Personen (
                {(
                  (props.numberOfArtists! - props.numberOfNonMaleArtists!) /
                  props.numberOfArtists!
                ).toLocaleString(undefined, {
                  style: 'percent',
                  maximumFractionDigits: 1,
                })}
                &nbsp;männlich)
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
        {(props.website || props.facebook || props.instagram) && (
          <Row className={styles.social}>
            {props.website && (
              <Col span={8}>
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
              <Col span={8}>
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
              <Col span={8}>
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
