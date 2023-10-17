import { useTick } from '@pixi/react';
import React, { useState } from 'react';
export interface Tick {
  timeRef: React.MutableRefObject<number>;
  timeOut: number;
  callBack: Function;
  parameter?: any[];
}
export interface Ticks {
  [key: string]: Tick;
}
export default function useTicks() {
  const [Ticks, setTicks] = useState<Ticks>({});
  useTick((delta) => {
    console.log(Ticks);
    Object.keys(Ticks).forEach((item) => {
      const { timeOut, timeRef, parameter, callBack } = Ticks[item];
      timeRef.current += delta;
      if (timeOut < timeRef.current) {
        parameter ? callBack(...parameter) : callBack();
        timeRef.current = 0;
      }
    });
  });
  return { Ticks, setTicks };
}
