import Select from 'antd/lib/select';
import React from 'react';
import styles from './GuestInput.module.css';

export default function GuestInput({
  value,
  maxCapacity,
  onChange,
  disabled,
}: {
  maxCapacity: number;
  value: string[];
  onChange: (guests: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <Select
      disabled={disabled}
      value={value}
      tokenSeparators={[',']}
      mode="tags"
      className={styles.select}
      onChange={(e) => onChange(e)}
      maxTagCount={maxCapacity}
      dropdownClassName={styles.dropdown}
      placeholder={`max. ${maxCapacity} Personen`}
    />
  );
}
