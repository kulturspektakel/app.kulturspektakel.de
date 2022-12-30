import {gql} from '@apollo/client';
import {Rate} from 'antd';
import React from 'react';
import {useBandApplicationRatingMutation} from '../../types/graphql';

gql`
  mutation BandApplicationRating($id: ID!, $rating: Int) {
    rateBandApplication(bandApplicationId: $id, rating: $rating) {
      id
      ...Rating
    }
  }
`;

export default function Rater({
  bandApplicationId,
  value,
}: {
  bandApplicationId: string;
  value?: number;
}) {
  const [rate] = useBandApplicationRatingMutation();
  return (
    <>
      <Rate
        count={4}
        value={value}
        style={{color: '#1890ff'}}
        onChange={(rating) =>
          rate({
            variables: {
              id: bandApplicationId,
              rating: rating === 0 ? null : rating,
            },
          })
        }
      />
    </>
  );
}
