import { StorageKeys } from '../constants';

export const isLoggedIn = (): boolean => {
  return (
    navigator.cookieEnabled &&
    sessionStorage.getItem(StorageKeys.LOGIN_STORAGE_KEY) === 'true'
  );
};
