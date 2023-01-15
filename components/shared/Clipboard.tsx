import {Tooltip, Typography} from 'antd';
import React, {useCallback} from 'react';
import {useState} from 'react';

type State = 'default' | 'clicked' | 'copied';

export default function Clipboard(props: {
  children: React.ReactNode;
  value?: string;
  onCopy?: () => void;
}) {
  const [state, setState] = useState<State>('default');
  const onClick = useCallback(() => {
    setState('clicked');
    navigator.clipboard.writeText(props.value ?? String(props.children));
    if (props.onCopy) {
      props.onCopy();
    }
  }, [props]);

  return (
    <Tooltip
      title={
        state === 'clicked'
          ? 'Kopiert'
          : state === 'default'
          ? 'In Zwischenablage kopieren'
          : null
      }
      afterOpenChange={(visible) => {
        if (!visible) {
          setTimeout(() => setState('default'), 200);
        }
      }}
    >
      <Typography.Link onClick={onClick}>{props.children}</Typography.Link>
    </Tooltip>
  );
}
