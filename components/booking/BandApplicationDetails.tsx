import {gql} from '@apollo/client';
import {Col, Drawer, message, Popconfirm, Row, Statistic} from 'antd';
import React, {useState} from 'react';
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

gql`
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
  bandApplicationId: string;
  onClose: () => void;
}) {
  const {data} = useApplicationDetailsQuery({
    variables: {
      id: bandApplicationId,
    },
  });

  return (
    <Drawer
      title={
        data?.node?.__typename === 'BandApplication' ? data.node.bandname : ''
      }
      placement="right"
      width={400}
      closable={true}
      onClose={onClose}
      visible={Boolean(bandApplicationId)}
    >
      {data?.node?.__typename === 'BandApplication' ? (
        <DrawerContent {...data.node} />
      ) : null}
    </Drawer>
  );
}

function DrawerContent(
  props: Extract<
    ApplicationDetailsQuery['node'],
    {__typename?: 'BandApplication'}
  >,
) {
  const [contacted] = useMarkAsContextedMutation();
  const viewer = useViewerContext();
  return (
    <>
      {props.demo && <Demo demo={props.demo} />}
      <Row>
        {props.website && (
          <Col span={8}>
            <a href={props.website} target="_blank">
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
            <a href={props.facebook} target="_blank">
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
            <a href={`https://instagram.com/${props.instagram}`} target="_blank">
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
      <h4>Bewertung</h4>
      <Row>
        <Col span={8}>
          <Rater
            bandApplicationId={props.id}
            defaultValue={
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
        <div style={{display: 'flex'}}>
          <h4>Schonmal gespielt:</h4>&nbsp;
          {PreviouslyPlayedText(props.hasPreviouslyPlayed)}
        </div>
      )}
      {(props.numberOfArtists && props.numberOfNonMaleArtists) ? (
        <div style={{display: 'flex'}}>
          <h4>Bandgröße:</h4>&nbsp;{props.numberOfArtists} Personen (
          {(
            (props.numberOfArtists - props.numberOfNonMaleArtists) /
            props.numberOfArtists
          ).toLocaleString(undefined, {
            style: 'percent',
            maximumFractionDigits: 1,
          })}
          &nbsp;männlich)
        </div>
      ): undefined }

      {props.knowsKultFrom && (
        <>
          <h4>Woher kennt ihr das Kult?</h4>
          <EllipsisText>{props.knowsKultFrom}</EllipsisText>
        </>
      )}

      {props.description && (
        <>
          <h4>Bandbeschreibung</h4>
          <EllipsisText>{props.description}</EllipsisText>
        </>
      )}
      <h4>Kontakt</h4>
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
