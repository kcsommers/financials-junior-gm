import { isClientSide } from '../../utils/is-client-side';
import { UserRole } from '../users/user-roles';
import { StorageKeys } from './storage-keys.constants';

export const getUserRole = (): UserRole => {
  if (!isClientSide() || !navigator.cookieEnabled) {
    return;
  }
  return sessionStorage.getItem(StorageKeys.USER_ROLE_STORAGE_KEY) as UserRole;
};
