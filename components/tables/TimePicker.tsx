import {Select} from 'antd';
import {add} from 'date-fns';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import React from 'react';
import {SLOT_LENGTH_MIN} from './Slots';

export default function TimePicker({
  min,
  max,
  selected,
  onChange,
}: {
  selected: Date;
  min: Date;
  max: Date;
  onChange: (value: Date) => void;
}) {
  return (
    <Select
      value={selected.toISOString()}
      onChange={(value) => onChange(new Date(value))}
    >
      {Array(differenceInMinutes(max, min) / SLOT_LENGTH_MIN + 1)
        .fill(null)
        .map((_, i) => {
          const time = add(min, {minutes: SLOT_LENGTH_MIN * i});
          return (
            <Select.Option value={time.toISOString()} key={i}>
              {time.toLocaleTimeString('de', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Berlin',
              })}{' '}
              Uhr
            </Select.Option>
          );
        })}
    </Select>
  );
}
