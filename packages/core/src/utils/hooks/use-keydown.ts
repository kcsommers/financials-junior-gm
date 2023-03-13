import { useEffect, useRef } from 'react';

export const useKeydown = (
  code: string,
  callback: () => void,
  isListening = true
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {}, []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.code === code) {
        savedCallback.current();
      }
    };
    if (isListening) {
      window.addEventListener('keydown', keydown);
    } else {
      window.removeEventListener('keydown', keydown);
    }
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [isListening]);
};
