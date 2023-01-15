import {gql} from '@apollo/client';
import {
  Col,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import React, {useEffect, useRef} from 'react';
import {
  useApplicationDetailsQuery,
  ApplicationDetailsQuery,
  useMarkAsContextedMutation,
  PreviouslyPlayed,
} from '../../types/graphql';
import useViewerContext from '../../utils/useViewerContext';
import Demo from './Demo';
import Rater from './Rater';
import Rating from './Rating';
import {GlobalOutlined} from '@ant-design/icons';
import styles from './BandApplicationDetails.module.css';
import BandApplicationTimeline from './BandApplicationTimeline';
import Clipboard from '../shared/Clipboard';

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
        distance
        city
        numberOfArtists
        numberOfNonMaleArtists
        hasPreviouslyPlayed
        website

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
        data?.node?.__typename === 'BandApplication' ? (
          data?.node.bandname
        ) : (
          <Skeleton
            title={true}
            paragraph={false}
            active={true}
            className={styles.skeletonTitle}
          />
        )
      }
      width="80%"
      className={styles.modal}
      closable={true}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
      open={Boolean(bandApplicationId)}
    >
      {data?.node?.__typename === 'BandApplication' ? (
        <DrawerContent {...data?.node} />
      ) : (
        <>
          <Skeleton.Image active={true} className={styles.skeletonImage} />
          <Skeleton active={true} />
        </>
      )}
    </Modal>
  );
}

type Props = Extract<
  ApplicationDetailsQuery['node'],
  {__typename?: 'BandApplication'}
>;

function DrawerContent(props: Props) {
  const [contacted] = useMarkAsContextedMutation();
  const viewer = useViewerContext();

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          {props.demo && <Demo demo={props.demo} />}
          <Row className={styles.social}>
            {props.website && (
              <Col span={8}>
                <a href={props.website} target="_blank" rel="noreferrer">
                  <Statistic
                    valueStyle={{color: '#1890ff'}}
                    value={' '}
                    prefix={<GlobalOutlined color="blue" />}
                    title="Webseite"
                  />
                </a>
              </Col>
            )}
            {props.facebook && (
              <Col span={8}>
                <a href={props.facebook} target="_blank" rel="noreferrer">
                  <Statistic
                    valueStyle={{color: '#1890ff'}}
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
                    valueStyle={{color: '#1890ff'}}
                    value={props.instagramFollower ?? '?'}
                    title="Instagram"
                  />
                </a>
              </Col>
            )}
          </Row>
          <br />
          {props.hasPreviouslyPlayed && (
            <div className={styles.row}>
              <h4 className={styles.h4}>Schonmal gespielt:</h4>&nbsp;
              {PreviouslyPlayedText(props.hasPreviouslyPlayed)}
            </div>
          )}
          {props.numberOfArtists != null &&
            props.numberOfNonMaleArtists != null && (
              <div className={styles.row}>
                <h4 className={styles.h4}>Bandgröße:</h4>&nbsp;
                {props.numberOfArtists} Personen (
                {(
                  (props.numberOfArtists! - props.numberOfNonMaleArtists!) /
                  props.numberOfArtists!
                ).toLocaleString(undefined, {
                  style: 'percent',
                  maximumFractionDigits: 1,
                })}
                &nbsp;männlich)
              </div>
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
          <Typography.Title level={5}>Kontakt</Typography.Title>
          {props.contactName}
          <br />
          {props.contactPhone}
          <br />
          <Popconfirm
            title="Band als kontaktiert markieren?"
            onConfirm={() =>
              contacted({
                variables: {
                  contacted: true,
                  id: props.id,
                },
                optimisticResponse: {
                  markBandApplicationContacted: {
                    __typename: 'BandApplication',
                    id: props.id,
                    contactedByViewer: viewer,
                  },
                },
              })
            }
            onCancel={() =>
              contacted({
                variables: {
                  contacted: false,
                  id: props.id,
                },
              })
            }
            okText="Ja"
            cancelText="Nein"
          >
            <Clipboard>{props.email}</Clipboard>
          </Popconfirm>
        </Col>
        <Col span={12}>
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
          <BandApplicationTimeline {...props} />
        </Col>
      </Row>
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
