import React from 'react';

export default function Demo({demo}: {demo: string}) {
  const url = new URL(demo);
  const domain = url.hostname.toLowerCase().split('.').slice(-2).join('.');
  const path = url.pathname.split('/');
  let embed = null;
  let height = null;
  switch (domain) {
    case 'youtube.com':
      height = 225;
      switch (path[1]) {
        case 'watch':
          embed = `https://www.youtube.com/embed/${url.searchParams.get(
            'v',
          )}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`;
          break;
        case 'user':
        case 'channel':
        case 'c':
          embed = `https://www.youtube.com/embed/videoseries?list=${path[2]}`;
          // https://www.youtube.com/embed/videoseries?list=PLLeykLlB1Bft1ib18y4KxXQXdK2EoLgut
          break;
        case 'playlist':
          embed = `https://www.youtube.com/embed/videoseries?list=${url.searchParams.get(
            'list',
          )}`;
          break;
        default:
        // probably a vanity URL
      }

      break;
    case 'youtu.be':
      height = 225;
      embed = `https://www.youtube.com/embed/${path[1]}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`;
      break;
    case 'bandcamp.com':
      const match = url.hostname.match(/([^.]+)\.bandcamp\.com/i);
      if (match && match?.length > 1) {
      }
      // <iframe style="border: 0; width: 400px; height: 241px;" src="https://bandcamp.com/EmbeddedPlayer/album=2867773323/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless></iframe>
      break;
    case 'soundcloud.com':
      embed = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        demo,
      )}&auto_play=false&show_artwork=false`;
      height = 400;
      break;
    case 'spotify.com':
      embed = `https://open.spotify.com/embed${url.pathname}`;
      height = 300;

      break;
  }

  return (
    <>
      {embed && (
        <iframe
          src={embed}
          width="400"
          height={height ?? 0}
          frameBorder="0"
          style={{borderRadius: 10}}
        />
      )}
      <p>
        {!embed && <h4>Demo</h4>}
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
          {demo}
        </a>
      </p>
    </>
  );
}
