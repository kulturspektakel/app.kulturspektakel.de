import {Tag} from 'antd';
import {differenceInMinutes, isPast} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {ReservationStatus} from '../../types/graphql';

export default function StatusBadge(props: {
  status: ReservationStatus;
  startTime: Date;
  endTime: Date;
  showAll?: boolean;
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(differenceInMinutes(new Date(), props.startTime));
    }, 10000);
    return () => clearInterval(interval);
  }, [props.startTime]);

  if (isPast(props.endTime)) {
    return <Tag color="red">Abgelaufen</Tag>;
  } else if (props.status === 'CheckedIn') {
    return <Tag color="green">Eingecheckt</Tag>;
  } else if (props.status === 'Confirmed' && time > 15) {
    return <Tag color="gold">Überfällig</Tag>;
  } else if (props.status === 'Confirmed' && props.showAll) {
    return <Tag color="green">Bestätigt</Tag>;
  } else if (props.status === 'Cleared' && props.showAll) {
    return <Tag color="red">Storniert</Tag>;
  } else if (props.status === 'Pending') {
    return <Tag color="yellow">Unbestätigt</Tag>;
  }

  return null;
}
