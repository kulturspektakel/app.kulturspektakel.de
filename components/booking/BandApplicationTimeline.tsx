import {DeleteOutlined, MailTwoTone} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Form, Input, Timeline, Tooltip, Typography} from 'antd';
import React, {useCallback, useMemo, useState} from 'react';
import {
  BandApplicationTimelineFragment,
  useBandApplicationCommentDeleteMutation,
  useBandApplicationCommentMutation,
} from '../../types/graphql';
import useViewerContext from '../../utils/useViewerContext';
import RelativeDate from '../shared/RelativeDate';
import ViewerAvatar from '../shared/ViewerAvatar';

gql`
  fragment BandApplicationTimeline on BandApplication {
    id
    createdAt
    pastApplications {
      event {
        id
        start
        name
      }
      rating
      contactedByViewer {
        displayName
      }
      comments {
        edges {
          node {
            ...Comment
          }
        }
      }
    }
    pastPerformances {
      startTime
      event {
        id
        start
        name
      }
      area {
        displayName
      }
    }
    comments {
      edges {
        node {
          ...Comment
        }
      }
    }
  }

  mutation BandApplicationComment($id: ID!, $comment: String!) {
    createBandApplicationComment(bandApplicationId: $id, comment: $comment) {
      ...Comment
    }
  }

  mutation BandApplicationCommentDelete($id: ID!) {
    deleteBandApplicationComment(id: $id)
  }

  fragment Comment on BandApplicationComment {
    id
    comment
    createdAt
    user {
      displayName
      profilePicture
    }
  }
`;

export default function BandApplicationTimeline(
  props: BandApplicationTimelineFragment,
) {
  const [comment, commentResult] = useBandApplicationCommentMutation();
  const [del, deleteResult] = useBandApplicationCommentDeleteMutation();
  const [val, setVal] = useState('');
  const viewer = useViewerContext;

  const history = useMemo<
    Array<
      | BandApplicationTimelineFragment['pastApplications'][number]
      | BandApplicationTimelineFragment['pastPerformances'][number]
    >
  >(
    () =>
      [
        ...props.pastApplications.filter(
          (a) =>
            !props.pastPerformances.every((p) => p.event.id === a.event.id),
        ),
        ...props.pastPerformances,
      ].sort((a, b) => b.event.start.getTime() - a.event.start.getTime()),
    [props.pastApplications, props.pastPerformances],
  );

  const onSubmit = useCallback(async () => {
    if (!val) {
      setVal('');
      return;
    }
    await comment({
      variables: {
        id: props.id,
        comment: val,
      },
      optimisticResponse: () => {},
    });
    setVal('');
  }, [comment, props.id, val]);

  return (
    <>
      <br />
      <Timeline>
        <Timeline.Item dot={<ViewerAvatar />}>
          <Form onFinish={onSubmit}>
            <Input.TextArea
              onChange={(e) => setVal(e.target.value)}
              disabled={commentResult.loading}
              onPressEnter={onSubmit}
              placeholder="Kommentar schreiben..."
            />
            <Button
              loading={commentResult.loading}
              type="primary"
              size="small"
              htmlType="submit"
            >
              Kommentieren
            </Button>
          </Form>
        </Timeline.Item>
        {props.comments.edges?.map(({node}) => (
          <Timeline.Item
            key={node.id}
            dot={
              <Tooltip title="Name">
                <ViewerAvatar />
              </Tooltip>
            }
          >
            <Typography.Text type="secondary">
              <RelativeDate date={new Date()} />
              &nbsp;
              {node.user.id === viewer!.id && (
                <Tooltip title="Kommentar löschen">
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size="small"
                    loading={deleteResult.loading}
                  />
                </Tooltip>
              )}
            </Typography.Text>
            <p>{node.comment}</p>
          </Timeline.Item>
        ))}

        {history.map((o) => (
          <Timeline.Item
            key={o.event.id}
            color={o.__typename === 'BandPlaying' ? 'blue' : 'gray'}
          >
            {o.__typename === 'BandPlaying' ? (
              <>
                <strong>Auftritt {o.event.name}</strong>
                <br />
                <Typography.Text type="secondary">
                  {o.startTime.toLocaleString('de-DE', {
                    weekday: 'long',
                    minute: '2-digit',
                    hour: '2-digit',
                    timeZone: 'Europe/Berlin',
                  })}{' '}
                  Uhr: {o.area.displayName}
                </Typography.Text>
              </>
            ) : (
              <>
                <strong>Bewerbung {o.event.name}</strong>

                {o.__typename === 'BandApplication' && (
                  <Typography.Text type="secondary">
                    {o.rating != null && (
                      <>
                        <br />
                        Bewertung:{' '}
                        {(Math.round(o.rating * 100) / 100).toFixed(2)}
                      </>
                    )}

                    {o.contactedByViewer != null && (
                      <>
                        <br />
                        <MailTwoTone />
                        &nbsp;Kontaktiert von {o.contactedByViewer.displayName}
                      </>
                    )}
                  </Typography.Text>
                )}
              </>
            )}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}
