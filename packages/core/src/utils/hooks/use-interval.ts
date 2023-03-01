import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  const reset = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(savedCallback.current, delay);
    }
  };

  return { intervalRef, reset };
};
