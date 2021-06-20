import styles from './TableRow.module.css';
import React from 'react';
import {differenceInMinutes} from 'date-fns';
import {SLOT_LENGTH_MIN, SLOT_LENGTH_PX} from './Slots';
import cx from 'classnames';

export const TH_WIDTH = 150;
export const TH_MARGIN_RIGHT = 20;

export default function TableRow({
  startTime,
  endTime,
  firstCell,
  cellRenderer,
  cells,
  style,
}: {
  startTime: Date;
  endTime: Date;
  firstCell: React.ReactElement<typeof FirstTableCell>;
  cellRenderer?: (index: number) => any;
  cells?: React.ReactNodeArray;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cx([styles.row, cellRenderer && styles.rowHead])}
      style={style}
    >
      {firstCell}

      {cells
        ? cells
        : Array(differenceInMinutes(endTime, startTime) / SLOT_LENGTH_MIN)
            .fill(null)
            .map((_, i) => (
              <div
                className={cx(styles.cell, styles.thead)}
                style={{width: SLOT_LENGTH_PX}}
                key={i}
              >
                {cellRenderer(i)}
              </div>
            ))}
    </div>
  );
}

export function FirstTableCell({
  style,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={styles.firstTableCell}
      style={{
        width: TH_WIDTH,
        marginRight: TH_MARGIN_RIGHT,
        ...style,
      }}
      {...props}
    />
  );
}
