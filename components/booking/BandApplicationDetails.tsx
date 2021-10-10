import {gql} from '@apollo/client';
import {Col, Drawer, message, Popconfirm, Row, Statistic, Tooltip} from 'antd';
import React, {useState} from 'react';
import {
  useApplicationDetailsQuery,
  ApplicationDetailsQuery,
  useMarkAsContextedMutation,
} from '../../types/graphql';
import useViewerContext from '../../utils/useViewerContext';
import Demo from './Demo';
import Rater from './Rater';
import Rating from './Rating';

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
      id: `BandApplication:${bandApplicationId}`,
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
      <Demo demo={props.demo} />
      <Row>
        <Col span={8}>
          <Tooltip
            placement="bottomLeft"
            title={
              <>
                {props.numberOfNonMaleArtists} nicht männlich
                <br />
                {props.numberOfArtists - props.numberOfNonMaleArtists} männlich
              </>
            }
          >
            <Statistic value={props.numberOfArtists} title="Personen" />
          </Tooltip>
        </Col>
        {props.facebook && (
          <Col span={8}>
            <a href={props.facebook} target="_blank">
              <Statistic value={props.facebookLikes ?? '?'} title="Facebook" />
            </a>
          </Col>
        )}
        {props.instagram && (
          <Col span={8}>
            <a href={`https://instagram.com/${props.instagram}`}>
              <Statistic
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
                ({viewer: {id}}) => id === viewer.id,
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
  const words = props.children.split(' ');

  return expanded || words.length < 60 ? (
    <p>{props.children}</p>
  ) : (
    <p>
      {words.slice(0, 50).join(' ')}
      &nbsp;<a onClick={() => setExpanded(true)}>mehr…</a>
    </p>
  );
}
