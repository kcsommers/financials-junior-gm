import { useEffect } from 'react';

export const useKeydown = (code: string, handler: () => void, deps?: any[]) => {
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.code === code) {
        handler();
      }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, deps || []);
};
