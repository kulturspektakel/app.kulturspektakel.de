import {LinkOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Typography} from 'antd';
import React from 'react';
import {DemoFragment} from '../../types/graphql';

gql`
  fragment Demo on BandApplication {
    demo
    demoEmbedUrl
  }
`;

export default function Demo({demo, demoEmbedUrl}: DemoFragment) {
  let domain: string | undefined;
  let height: string | number = 'auto';
  let borderRadius: number | undefined = undefined;

  if (demoEmbedUrl != null) {
    const url = new URL(demoEmbedUrl ?? '');
    domain = url.hostname.toLowerCase().split('.').slice(-2).join('.');
    switch (domain) {
      case 'youtube.com':
      case 'youtu.be':
        height = 'auto';
        borderRadius = 8;
        break;
      case 'spotify.com':
        height = 352;
        break;
    }
  }

  return (
    <>
      {demoEmbedUrl && (
        <iframe
          src={demoEmbedUrl}
          width="100%"
          height={height ?? 0}
          frameBorder="0"
          style={{
            borderRadius,
            aspectRatio: height === 'auto' ? '16 / 9' : undefined,
          }}
        />
      )}
      {!demoEmbedUrl && <Typography.Title level={5}>Demo</Typography.Title>}
      {demo && (
        <a
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'block',
          }}
          href={demo}
          target="_blank"
          rel="noreferrer"
        >
          <LinkOutlined />
          &nbsp;
          {demo}
        </a>
      )}
    </>
  );
}
