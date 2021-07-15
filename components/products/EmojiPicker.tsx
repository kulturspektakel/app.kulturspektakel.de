import {Button, Popover} from 'antd';
import {Picker} from 'emoji-mart';
import {useState} from 'react';
import styles from './EmojiPicker.module.css';
import 'emoji-mart/css/emoji-mart.css';

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
      visible={pickerVisible}
      onVisibleChange={setPickerVisible}
      overlayClassName={styles.overlay}
      content={
        <Picker
          color="#4591F7"
          title=""
          showSkinTones={false}
          style={{border: 0}}
          exclude={['recent']}
          showPreview={false}
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