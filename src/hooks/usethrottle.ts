import { useCallback, useEffect, useRef } from 'react';
function useThrottle(fn: Function, delay: number, dep = []) {
  const {
    current
  }: {
    current: {
      fn: Function;
      timer?: number;
    };
  } = useRef({ fn, timer: 0 });
  useEffect(
    function a() {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args: any[]) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn(...args);
    }
  }, dep);
}

export default useThrottle;
