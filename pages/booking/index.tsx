import {gql} from '@apollo/client';
import {NextPageContext} from 'next';
import Router from 'next/router';
import {EventsQuery} from '../../types/graphql';
import {initializeApollo} from '../../utils/apollo';

export default function BookingIndex() {
  return null;
}

BookingIndex.getInitialProps = async ({
  query,
  res,
  pathname,
}: NextPageContext) => {
  const apollo = initializeApollo();
  const {data} = await apollo.query<EventsQuery>({
    query: gql`
      query Events {
        events {
          id
          name
        }
      }
    `,
  });
  const path = `${pathname}/${data.events[0].id}`;
  if (res) {
    res
      .writeHead(302, {
        Location: path,
      })
      .end();
  } else {
    Router.push(path);
  }

  return {
    event,
  };
};
