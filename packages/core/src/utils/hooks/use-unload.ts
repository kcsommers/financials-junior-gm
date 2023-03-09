import { useEffect, useRef } from 'react';

export const useUnload = (cb: () => void) => {
  const cbRef = useRef(cb);

  useEffect(() => {
    const onUnload = cbRef.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};
