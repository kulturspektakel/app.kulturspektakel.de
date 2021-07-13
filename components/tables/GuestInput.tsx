import {Input} from 'antd';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
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
  const [v, sV] = useState(value);
  useEffect(() => sV(value), [value]);

  const change = useCallback(
    (i: number, val: string) => {
      const newValue = [...v];
      newValue[i] = val;
      for (let j = newValue.length - 1; j >= 0; j--) {
        if (!newValue[j]) {
          newValue.pop();
        } else {
          break;
        }
      }
      sV(newValue);
    },
    [v, sV],
  );

  const update = useCallback(() => onChange(v), [v, onChange]);
  return (
    <>
      {Array(Math.min(v.length + 1, maxCapacity))
        .fill(null)
        .map((_, i) => (
          <Input
            className={styles.input}
            key={`guest${i}`}
            disabled={disabled}
            value={v[i]}
            placeholder={`Gast ${i + 1}`}
            onChange={(e) => change(i, e.target.value)}
            onBlur={update}
          />
        ))}
    </>
  );
}
