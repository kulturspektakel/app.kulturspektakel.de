import {gql} from '@apollo/client';
import {Drawer, Input, Rate} from 'antd';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {
  useApplicationDetailsQuery,
  ApplicationDetailsQuery,
} from '../../types/graphql';
import styles from './GuestInput.module.css';

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
      }
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
  return <>{props.description}</>;
}
