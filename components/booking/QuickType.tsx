import {AutoComplete, Input, Modal} from 'antd';
import {BandApplcationsQuery} from 'kulturspektakel-utils/graphql';
import {useCallback, useEffect, useState} from 'react';
import styles from './QuickType.module.css';

export default function QuickType(props: {
  onSelect: (id: string) => void;
  data: Array<
    Extract<
      BandApplcationsQuery['node'],
      {__typename?: 'Event'}
    >['bandApplication'][number]
  >;
}) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setVisible((s) => !s);
      } else if (e.key === 'Escape') {
        setVisible(false);
      }
    };
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [setVisible]);

  const onSearch = useCallback(
    (query: string) => {
      if (query) {
        query = query.toLocaleLowerCase();
        setOptions(
          props.data
            .filter(
              (b) =>
                b.bandname.toLocaleLowerCase().startsWith(query) ||
                b.bandname.toLocaleLowerCase().includes(` ${query}`),
            )
            .map((b) => ({label: b.bandname, value: b.id}))
            .slice(0, 10),
        );
      } else {
        setOptions([]);
      }
    },
    [props.data, setOptions],
  );

  const onSelect = useCallback(
    (id: string) => {
      setVisible(false);
      props.onSelect(id);
    },
    [props.onSelect, setVisible],
  );

  if (!visible) {
    return null;
  }

  return (
    <Modal
      open={visible}
      transitionName=""
      maskTransitionName=""
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
      className={styles.quickType}
    >
      <AutoComplete
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        defaultActiveFirstOption
        style={{width: '100%'}}
        popupClassName={styles.popup}
      >
        <Input
          size="large"
          placeholder="Bandsuche..."
          ref={(input) => input && input.focus()}
        />
      </AutoComplete>
    </Modal>
  );
}
