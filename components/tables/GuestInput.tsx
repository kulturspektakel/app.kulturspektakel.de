import Select from 'antd/lib/select';
import React from 'react';
import styles from './GuestInput.module.css';

export default function GuestInput({
  value,
  maxCapacity,
  onChange,
}: {
  maxCapacity: number;
  value: string[];
  onChange: (guests: string[]) => void;
}) {
  return (
    <Select
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
