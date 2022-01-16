import { StorageKeys } from '../constants';
import { UserRole } from '../models';

export const getUserRole = (): UserRole => {
  if (!navigator.cookieEnabled) {
    return;
  }
  return sessionStorage.getItem(StorageKeys.USER_ROLE_STORAGE_KEY) as UserRole;
};
