import {LinkOutlined} from '@ant-design/icons';
import {gql} from '@apollo/client';
import {Typography} from 'antd';
import React from 'react';
import {DemoEmbedType, DemoFragment} from 'types/graphql';

gql`
  fragment Demo on BandApplication {
    demo
    demoEmbed
    demoEmbedType
  }
`;

export default function Demo({demo, demoEmbed, demoEmbedType}: DemoFragment) {
  let embed: string | undefined;
  let height: string | number = 'auto';
  let borderRadius: number | undefined = undefined;

  switch (demoEmbedType) {
    case DemoEmbedType.YouTubeVideo:
      height = 'auto';
      borderRadius = 8;
      embed = `https://www.youtube.com/embed/${demoEmbed}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`;
      break;
    case DemoEmbedType.YouTubePlaylist:
      height = 'auto';
      borderRadius = 8;
      embed = `https://www.youtube.com/embed/videoseries?list=${demoEmbed}`;
      break;
    case DemoEmbedType.SpotifyAlbum:
      height = 352;
      embed = `https://open.spotify.com/embed/album/${demoEmbed}`;
      break;
    case DemoEmbedType.SpotifyTrack:
      height = 352;
      embed = `https://open.spotify.com/embed/track/${demoEmbed}`;
      break;
    case DemoEmbedType.SpotifyArtist:
      height = 352;
      embed = `https://open.spotify.com/embed/artist/${demoEmbed}`;
      break;
    case DemoEmbedType.BandcampAlbum:
      embed = `https://bandcamp.com/EmbeddedPlayer/album=${demoEmbed}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
      break;
    case DemoEmbedType.BandcampTrack:
      embed = `https://bandcamp.com/EmbeddedPlayer/track=${demoEmbed}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
      break;
    case DemoEmbedType.SoundcloudUrl:
      embed = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        demoEmbed ?? '',
      )}&auto_play=false`;
      break;
  }

  return (
    <>
      {embed && (
        <iframe
          src={embed}
          width="100%"
          height={height ?? 0}
          frameBorder="0"
          style={{
            borderRadius,
            aspectRatio: height === 'auto' ? '16 / 9' : undefined,
          }}
        />
      )}
      {!embed && <Typography.Title level={5}>Demo</Typography.Title>}
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
          <LinkOutlined rev={undefined} />
          &nbsp;
          {demo}
        </a>
      )}
    </>
  );
}
