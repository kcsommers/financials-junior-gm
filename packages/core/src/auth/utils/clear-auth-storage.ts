import { StorageKeys } from '../constants';

export const clearAuthStorage = (): void => {
  if (!navigator.cookieEnabled) {
    return;
  }
  sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'false');
  sessionStorage.setItem(StorageKeys.USER_ROLE_STORAGE_KEY, '');
  sessionStorage.setItem(StorageKeys.STUDENT_ID_STORAGE_KEY, '');
  sessionStorage.setItem(StorageKeys.TEACHER_ID_STORAGE_KEY, '');
  sessionStorage.setItem(StorageKeys.USER_TOKEN, '');
};