import {Statistic, Tooltip} from 'antd';

export default function Rating(props: {
  rating: number;
  bandApplicationRating: Array<{
    rating: number;
    viewer: {
      displayName: string;
    };
  }>;
}) {
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
        valueStyle={{color: '#1890ff', fontSize: '1.5em'}}
        precision={2}
        value={props.rating}
      />
    </Tooltip>
  );
}
