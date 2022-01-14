import { StorageKeys, UserRole } from '../../auth';

export const getUserRole = (): UserRole => {
  if (!navigator.cookieEnabled) {
    return;
  }
  return sessionStorage.getItem(StorageKeys.USER_ROLE_STORAGE_KEY) as UserRole;
};
