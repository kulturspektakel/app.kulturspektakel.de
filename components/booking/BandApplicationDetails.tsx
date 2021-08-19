import {gql} from '@apollo/client';
import {Col, Drawer, Popconfirm, Row, Statistic} from 'antd';
import React, {useState} from 'react';
import {
  useApplicationDetailsQuery,
  ApplicationDetailsQuery,
} from '../../types/graphql';
import Demo from './Demo';

gql`
  query ApplicationDetails($id: ID!) {
    node(id: $id) {
      ... on BandApplication {
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
      }
    }
  }

  # mutation MarkAsContexted($id: ID!) {

  # }
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
  return (
    <>
      <Demo demo={props.demo} />
      <Row>
        <Col span={12}>
          {props.facebook && (
            <a href={props.facebook} target="_blank">
              <Statistic value={props.facebookLikes ?? '?'} title="Facebook" />
            </a>
          )}
        </Col>
        <Col span={12}>
          {props.instagram && (
            <a href={`https://instagram.com/${props.instagram}`}>
              <Statistic
                value={props.instagramFollower ?? '?'}
                title="Instagram"
              />
            </a>
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
          onConfirm={() => {}}
          okText="Ja"
          cancelText="Nein"
        >
          <a href={`mailto:${props.email}`}>{props.email}</a>
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
