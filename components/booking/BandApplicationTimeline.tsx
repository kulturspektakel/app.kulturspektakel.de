import {DeleteOutlined, MailTwoTone, SendOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Button, Form, Input, Timeline, Tooltip, Typography} from 'antd';
import React, {useCallback, useMemo, useState} from 'react';
import {
  BandApplicationTimelineFragment,
  useBandApplicationCommentDeleteMutation,
  useBandApplicationCommentMutation,
} from 'types/graphql';
import RelativeDate from 'components/shared/RelativeDate';
import ViewerAvatar from 'components/shared/ViewerAvatar';
import useViewerContext from 'utils/useViewerContext';

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
      ...Comments
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
    ...Comments
  }

  mutation BandApplicationComment($input: BandApplicationCommentInput!) {
    createBandApplicationComment(input: $input) {
      ...Comments
    }
  }

  mutation BandApplicationCommentDelete($id: ID!) {
    deleteBandApplicationComment(id: $id) {
      ...Comments
    }
  }

  fragment Comments on BandApplication {
    id
    comments {
      totalCount
      edges {
        node {
          id
          comment
          createdAt
          user {
            id
            ...Avatar
          }
        }
      }
    }
  }
`;

export default function BandApplicationTimeline(
  props: BandApplicationTimelineFragment,
) {
  const [comment, commentResult] = useBandApplicationCommentMutation();
  const [del, deleteResult] = useBandApplicationCommentDeleteMutation();
  const [val, setVal] = useState('');
  const viewer = useViewerContext();

  const history = useMemo<
    Array<
      | BandApplicationTimelineFragment['pastApplications'][number]
      | BandApplicationTimelineFragment['pastPerformances'][number]
    >
  >(
    () =>
      [...props.pastApplications, ...props.pastPerformances].sort(
        (a, b) => b.event.start.getTime() - a.event.start.getTime(),
      ),
    [props.pastApplications, props.pastPerformances],
  );

  const onSubmit = useCallback(async () => {
    if (!val) {
      setVal('');
      return;
    }
    await comment({
      variables: {
        input: {
          bandApplicationId: props.id,
          comment: val,
        },
      },
    });
    setVal('');
  }, [comment, props.id, val]);

  return (
    <>
      <br />
      <br />
      <Timeline style={{paddingLeft: 10}}>
        <Timeline.Item dot={<ViewerAvatar {...viewer!} />}>
          <Form onFinish={onSubmit} style={{position: 'relative'}}>
            <Input.TextArea
              onChange={(e) => setVal(e.target.value)}
              disabled={commentResult.loading}
              onPressEnter={onSubmit}
              placeholder="Kommentar schreiben..."
              rows={3}
              value={val}
            />
            <Button
              style={{position: 'absolute', right: 8, bottom: 8}}
              loading={commentResult.loading}
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<SendOutlined rev={undefined} />}
            />
          </Form>
        </Timeline.Item>
        {props.comments.edges?.map(({node}) => (
          <Timeline.Item key={node.id} dot={<ViewerAvatar {...node.user} />}>
            <Typography.Text strong>{node.user.displayName}</Typography.Text>
            &nbsp;
            <Typography.Text type="secondary">
              <RelativeDate date={node.createdAt} />
              &nbsp;
              {node.user.id === viewer!.id && (
                <Tooltip title="Kommentar löschen">
                  <Button
                    type="ghost"
                    icon={<DeleteOutlined rev={undefined} />}
                    size="small"
                    loading={deleteResult.loading}
                    onClick={() =>
                      del({
                        variables: {
                          id: node.id,
                        },
                      })
                    }
                  />
                </Tooltip>
              )}
            </Typography.Text>
            <Typography.Paragraph>{node.comment}</Typography.Paragraph>
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
                        Bewertung: ★
                        {(Math.round(o.rating * 100) / 100).toFixed(2)}
                      </>
                    )}

                    {o.contactedByViewer != null && (
                      <>
                        <br />
                        <MailTwoTone rev={undefined} />
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
