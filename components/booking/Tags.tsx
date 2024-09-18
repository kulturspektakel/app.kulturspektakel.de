import {gql} from '@apollo/client';
import {Select, Tag} from 'antd';
import type {SelectProps} from 'antd';
import {useCallback, useState} from 'react';
import {useAddTagMutation, useRemoveTagMutation} from 'types/graphql';

gql`
  mutation AddTag($tag: String!, $bandApplicationId: ID!) {
    addBandApplicationTag(tag: $tag, bandApplicationId: $bandApplicationId) {
      id
      tags
    }
  }

  mutation RemoveTag($tag: String!, $bandApplicationId: ID!) {
    removeBandApplicationTag(tag: $tag, bandApplicationId: $bandApplicationId) {
      id
      tags
    }
  }
`;

export default function Tags({
  tags,
  options,
  bandApplicationId,
}: {
  tags: string[];
  options: string[];
  bandApplicationId: string;
}) {
  const [add, {loading: addLoading}] = useAddTagMutation();
  const [remove, {loading: removeLoading}] = useRemoveTagMutation({});

  const onDeselect = useCallback(
    (tag: string) =>
      remove({
        variables: {
          bandApplicationId,
          tag,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeBandApplicationTag: {
            __typename: 'BandApplication',
            id: bandApplicationId,
            tags: tags.filter((t) => t !== tag),
          },
        },
      }),
    [remove, bandApplicationId, tags],
  );

  const onSelect = useCallback(
    (tag: string) =>
      add({
        variables: {
          bandApplicationId,
          tag,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addBandApplicationTag: {
            __typename: 'BandApplication',
            id: bandApplicationId,
            tags: [...tags, tag],
          },
        },
      }),
    [add, bandApplicationId, tags],
  );

  return (
    <Select
      mode="tags"
      style={{width: '100%'}}
      onDeselect={onDeselect}
      onSelect={onSelect}
      tokenSeparators={[',', ' ']}
      options={options.map((tag) => ({label: tag, value: tag}))}
      defaultValue={tags}
      value={tags}
      tagRender={({label, onClose}) => (
        <Tag closable color="blue" onClose={onClose}>
          {label}
        </Tag>
      )}
    />
  );
}
