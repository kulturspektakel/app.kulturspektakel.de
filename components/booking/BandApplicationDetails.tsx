import {gql, useApolloClient} from '@apollo/client';
import {
  Col,
  Drawer,
  message,
  Popconfirm,
  Row,
  Skeleton,
  Statistic,
  Tag,
  Tooltip,
} from 'antd';
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {useRouter} from 'next/router';

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
        numberOfArtists
        numberOfNonMaleArtists
        hasPreviouslyPlayed
        website
        pastApplications {
          event {
            id
            start
          }
        }
        pastPerformances {
          startTime
          event {
            id
            start
          }
          area {
            displayName
          }
        }
        ...Rating
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
    <Drawer
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
      placement="right"
      width={400}
      closable={true}
      onClose={onClose}
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
    </Drawer>
  );
}

type Props = Extract<
  ApplicationDetailsQuery['node'],
  {__typename?: 'BandApplication'}
>;

function DrawerContent(props: Props) {
  const [contacted] = useMarkAsContextedMutation();
  const viewer = useViewerContext();
  const {query} = useRouter();

  const history = useMemo<
    Array<Props['pastApplications'][number] | Props['pastPerformances'][number]>
  >(
    () =>
      [
        ...props.pastApplications.filter(
          (a) =>
            !props.pastPerformances.every((p) => p.event.id === a.event.id),
        ),
        ...props.pastPerformances,
      ].sort((a, b) => a.event.start.getTime() - b.event.start.getTime()),
    [props.pastApplications, props.pastPerformances],
  );

  return (
    <>
      {props.demo && <Demo demo={props.demo} />}
      <Row>
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
      <h4 className={styles.h4}>Bewertung</h4>
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
      <br />

      {props.hasPreviouslyPlayed && (
        <div className={styles.row}>
          <h4 className={styles.h4}>Schonmal gespielt:</h4>&nbsp;
          {PreviouslyPlayedText(props.hasPreviouslyPlayed)}
        </div>
      )}

      {history.length > 0 && (
        <div className={styles.row}>
          <h4 className={styles.h4}>Frühere Bewerbungen/Auftritte:</h4>
          <p>
            {history.map((o) => (
              <Tooltip
                key={o.event.id}
                title={
                  o.__typename === 'BandPlaying'
                    ? `${o.area.displayName}, ${o.startTime.toLocaleString(
                        'de-DE',
                        {
                          weekday: 'short',
                          minute: '2-digit',
                          hour: '2-digit',
                        },
                      )}`
                    : 'Bewerbung'
                }
              >
                <Tag
                  color={o.__typename === 'BandPlaying' ? 'blue' : undefined}
                >
                  {o.event.start.getFullYear()}
                </Tag>
              </Tooltip>
            ))}
          </p>
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
          <h4 className={styles.h4}>Woher kennt ihr das Kult?</h4>
          <EllipsisText>{props.knowsKultFrom}</EllipsisText>
        </>
      )}

      {props.description && (
        <>
          <h4 className={styles.h4}>Bandbeschreibung</h4>
          <EllipsisText>{props.description}</EllipsisText>
        </>
      )}
      <h4 className={styles.h4}>Kontakt</h4>
      <p>
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
          <a
            href={`mailto:${props.email}`}
            onClick={() => {
              message.info(`${props.email} in Zwischenablage kopiert`);
              navigator.clipboard.writeText(props.email);
            }}
          >
            {props.email}
          </a>
        </Popconfirm>
      </p>
    </>
  );
}

function EllipsisText(props: {children?: string}) {
  const [expanded, setExpanded] = useState(false);
  const words = props.children?.split(' ') ?? [];

  return expanded || words.length < 60 ? (
    <p>{props.children}</p>
  ) : (
    <p>
      {words.slice(0, 50).join(' ')}
      &nbsp;<a onClick={() => setExpanded(true)}>mehr…</a>
    </p>
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
