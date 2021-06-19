import {differenceInMinutes, isBefore, isAfter} from 'date-fns';
import {useCallback, useEffect, useState} from 'react';
import styles from './NowIndicator.module.css';
import {SLOT_LENGTH_MIN, SLOT_LENGTH_PX} from './Slots';
import {TH_MARGIN_RIGHT, TH_WIDTH} from './TableRow';

export default function NowIndicator(props: {startTime: Date; endTime: Date}) {
  const calcLeft = useCallback(() => {
    const now = new Date();
    // TODO: remove
    now.setDate(props.startTime.getDate());
    now.setMonth(props.startTime.getMonth());
    if (isBefore(now, props.startTime) || isAfter(now, props.endTime)) {
      return -1;
    }

    return (
      (differenceInMinutes(now, props.startTime) * SLOT_LENGTH_PX) /
        SLOT_LENGTH_MIN +
      TH_WIDTH +
      TH_MARGIN_RIGHT
    );
  }, [props.startTime, props.endTime]);

  const [left, setLeft] = useState(calcLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft(calcLeft());
    }, 60000);
    return () => clearInterval(interval);
  }, [calcLeft]);

  return <div className={styles.now} style={{left}} />;
}
