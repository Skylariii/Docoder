import { useTick } from '@pixi/react';
import React from 'react';
export interface Tick {
  timeRef: React.MutableRefObject<number>;
  timeOut: number;
  callBack: Function;
  parameter?: any[];
  start: React.MutableRefObject<boolean>;
}

export default function useTicks(Config: Tick) {
  useTick((delta) => {
    const { timeOut, timeRef, parameter, callBack, start } = Config;
    if (!start.current) return;
    timeRef.current += delta;
    if (timeOut < timeRef.current) {
      parameter ? callBack(...parameter) : callBack();
      timeRef.current = 0;
    }
  });
}
