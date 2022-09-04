import {Button, Popover} from 'antd';
import {useEffect, useRef, useState} from 'react';
import styles from './EmojiPicker.module.css';
import data from '@emoji-mart/data';

export default function EmojiPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (emoji: string | null) => void;
}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pickerVisible) {
      import('emoji-mart').then((EmojiMart) => {
        new EmojiMart.Picker({
          // @ts-ignore
          data,
          ref,
          onEmojiSelect: ({native}: any) => {
            setPickerVisible(false);
            onChange(native ?? null);
          },
        });
      });
    } else {
      ref.current = null;
    }
  }, [pickerVisible]);

  return (
    <Popover
      className={styles.root}
      placement="topLeft"
      visible={pickerVisible}
      onVisibleChange={setPickerVisible}
      overlayClassName={styles.overlay}
      destroyTooltipOnHide
      content={<div ref={ref} style={{width: 300, height: 300}} />}
      trigger="click"
    >
      <Button
        shape="circle"
        icon={value || '-'}
        size="large"
        onClick={() => setPickerVisible(!pickerVisible)}
      />
    </Popover>
  );
}
