import {Avatar, AvatarProps} from 'antd';
import useViewerContext from '../../utils/useViewerContext';

export default function ViewerAvatar(props: AvatarProps) {
  const viewer = useViewerContext();

  if (!viewer) {
    return null;
  }

  return (
    <Avatar src={viewer.profilePicture} {...props}>
      {viewer.displayName
        .split(' ')
        .map((n) => n.substr(0, 1).toLocaleUpperCase())
        .join('')}
    </Avatar>
  );
}
