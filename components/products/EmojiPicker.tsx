import {Button, Popover, Spin} from 'antd';
import React, {useState} from 'react';
import styles from './EmojiPicker.module.css';
import dynamic from 'next/dynamic';

export default function EmojiPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (emoji: string | null) => void;
}) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <Popover
      className={styles.root}
      placement="topLeft"
      open={pickerVisible}
      onOpenChange={setPickerVisible}
      overlayClassName={styles.overlay}
      content={
        <EmojiPickerContent
          onSelect={({native}: any) => {
            setPickerVisible(false);
            onChange(native ?? null);
          }}
        />
      }
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

const EmojiPickerContent = dynamic(() => import('./LazyEmojiPicker'), {
  loading: () => (
    <div className={styles.spin}>
      <Spin />
    </div>
  ),
});
