import {Button, Popover} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
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

function EmojiPickerContent(props: {onSelect: (e: any) => void}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    import('emoji-mart').then((EmojiMart) => {
      new EmojiMart.Picker({
        // @ts-ignore
        data,
        ref,
        onEmojiSelect: props.onSelect,
      });
    });
  }, [ref]);
  return <div ref={ref} />;
}
