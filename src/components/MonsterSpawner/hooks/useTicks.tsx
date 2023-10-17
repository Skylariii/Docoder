import { useTick } from '@pixi/react';
import React, { useRef } from 'react';
export interface Tick {
  timeRef: React.MutableRefObject<number>;
  timeOut: number;
  callBack: Function;
  parameter?: any[];
}
export default function useTicks() {
  const Ticks = useRef<Tick[]>([]);
  useTick((delta) => {
    Ticks.current.forEach((item) => {
      item.timeRef.current += delta;
      if (item.timeOut < item.timeRef.current) {
        item.parameter ? item.callBack(...item.parameter) : item.callBack();
        item.timeRef.current = 0;
      }
    });
  });
  return Ticks;
}
