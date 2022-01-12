import { useEffect, useCallback, useRef, useState } from 'react';

export const useInterval = (callback, delay, immediate) => {
  const savedCallback = useRef<any>();

  const intervalId = useRef(0);

  const [isRunning, setIsRunning] = useState(!!immediate);

  const clear = useCallback(() => {
    window.clearInterval(intervalId.current);
  }, []);

  const toggleInterval = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const resetInterval = useCallback(() => {
    if (intervalId.current) {
      clear();
    }

    if (!isRunning) {
      return;
    }

    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      intervalId.current = window.setInterval(tick, delay);
    }
  }, [clear, isRunning, delay]);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    resetInterval();
  }, [isRunning, clear, resetInterval]);

  // cleanup
  useEffect(() => {
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, []);

  return [resetInterval, toggleInterval as any, isRunning];
};
