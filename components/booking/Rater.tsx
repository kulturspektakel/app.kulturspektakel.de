import {Input, Rate} from 'antd';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import styles from './GuestInput.module.css';

export default function Rater({}: {bandApplicationId: string}) {
  return (
    <>
      <Rate count={4} />
    </>
  );
}
