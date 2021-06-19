import {gql} from '@apollo/client';
import {Statistic, Tooltip} from 'antd';
import React from 'react';
import {NumbersFragment} from '../../types/graphql';
import styles from './Numbers.module.css';

export default function Numbers(props: {data: NumbersFragment}) {
  return (
    <div className={styles.row}>
      <Tooltip
        placement="bottom"
        title="Anzahl der aktuell anwesenden Personen"
      >
        <Statistic
          title="Personen"
          value={props.data.currentCapacity}
          className={styles.item}
        />
      </Tooltip>
      <Tooltip
        placement="bottom"
        title="Anzahl der freien Plätze für spontane Gäste."
      >
        <Statistic
          title="Frei"
          value={props.data.availableCapacity}
          className={styles.item}
        />
      </Tooltip>
      <Tooltip placement="bottomLeft" title="Maximal zugelassene Personenzahl">
        <Statistic
          title="Kapazität"
          value={props.data.maxCapacity}
          className={styles.item}
        />
      </Tooltip>
    </div>
  );
}
