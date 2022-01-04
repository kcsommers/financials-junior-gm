import { useEffect } from 'react';

export const useKeydown = (_code, _handler, _deps) => {
  useEffect(() => {
    const _keydown = (_event) => {
      if (_event.code === _code) {
        _handler();
      }
    };
    window.addEventListener('keydown', _keydown);
    return () => {
      window.removeEventListener('keydown', _keydown);
    };
  }, _deps || []);
};
