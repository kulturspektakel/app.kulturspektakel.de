import {gql} from '@apollo/client';
import {Avatar, AvatarProps} from 'antd';
import {AvatarFragment} from '../../types/graphql';

gql`
  fragment Avatar on Viewer {
    displayName
    profilePicture
  }
`;

export default function ViewerAvatar({
  displayName,
  profilePicture,
  ...props
}: AvatarProps & AvatarFragment) {
  return (
    <Avatar src={profilePicture} {...props}>
      {displayName
        .split(' ')
        .map((n) => n.substr(0, 1).toLocaleUpperCase())
        .join('')}
    </Avatar>
  );
}
