import {Statistic, theme, Tooltip} from 'antd';

export default function Rating(props: {
  rating: number;
  bandApplicationRating: Array<{
    rating: number;
    viewer: {
      displayName: string;
    };
  }>;
}) {
  const {token} = theme.useToken();

  return (
    <Tooltip
      title={props.bandApplicationRating.map((r) => (
        <div key={r.viewer.displayName}>
          {Array.apply(null, Array(4)).map((_, i) =>
            r.rating > i ? '★' : '☆',
          )}
          &nbsp;
          {r.viewer.displayName}
        </div>
      ))}
      placement="topRight"
    >
      <Statistic
        style={{display: 'inline-block'}}
        valueStyle={{color: token.colorPrimary, fontSize: '1.5em'}}
        precision={2}
        value={props.rating}
      />
    </Tooltip>
  );
}
