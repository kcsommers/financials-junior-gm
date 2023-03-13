import { isClientSide } from '../../utils/is-client-side';
import { StorageKeys } from './storage-keys.constants';

export const isLoggedIn = (): boolean => {
  return (
    isClientSide() &&
    navigator.cookieEnabled &&
    sessionStorage.getItem(StorageKeys.LOGIN_STORAGE_KEY) === 'true'
  );
};
