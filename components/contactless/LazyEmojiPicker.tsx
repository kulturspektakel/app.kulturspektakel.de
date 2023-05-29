import data from '@emoji-mart/data';
import React, {useEffect, useRef} from 'react';
import {Picker} from 'emoji-mart';

export default function LazyEmojiPicker(props: {onSelect: (e: any) => void}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    new Picker({
      data,
      ref,
      onEmojiSelect: props.onSelect,
    });
  }, [props.onSelect, ref]);
  return <div ref={ref} />;
}
