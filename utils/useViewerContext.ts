import {gql, useSuspenseQuery} from '@apollo/client';
import {ViewerQuery} from 'types/graphql';

export const ViewerQ = gql`
  query Viewer {
    viewer {
      id
      displayName
      profilePicture
    }
  }
`;

export default function useViewerContext() {
  const {data} = useSuspenseQuery<ViewerQuery>(ViewerQ);
  return data.viewer;
}
