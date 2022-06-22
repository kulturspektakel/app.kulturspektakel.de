import {Tooltip} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInCalendarDays,
} from 'date-fns';

function relativeDate(date: Date) {
  const now = new Date();
  const mins = differenceInMinutes(now, date);
  if (mins < 2) {
    return 'gerade eben';
  } else if (mins < 91) {
    return `vor ${mins} Minuten`;
  }
  const hours = differenceInHours(now, date);
  if (hours < 24) {
    return `vor ${hours} Stunden`;
  }
  const days = differenceInCalendarDays(now, date);
  if (days < 7) {
    return `vor ${days} Tagen`;
  }
  return null;
}

function useRelativeDate(date: Date) {
  const [res, setRes] = useState(relativeDate(date));
  useEffect(() => {
    const interval = setInterval(() => {
      setRes(relativeDate(date));
    }, 10000);
    return clearInterval(interval);
  }, [res, setRes]);

  return res;
}

export default function RelativeDate(props: {date: Date}) {
  const d = useRelativeDate(props.date);
  const full = useMemo(
    () =>
      props.date.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Berlin',
      }),
    [props.date],
  );

  if (d) {
    return <Tooltip title={full}>{d}</Tooltip>;
  }

  return <>{full}</>;
}
