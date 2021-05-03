export const LOGIN_STORAGE_KEY = '__fin__is_logged_in__';
export const USER_ROLE_STORAGE_KEY = '__fin__user_role__';
export const TEACHER_ID_STORAGE_KEY = '__fin_teacher_id__';
export const STUDENT_ID_STORAGE_KEY = '__fin_student_id__';
export const ADMIN_ID_STORAGE_KEY = '__fin_admin_id__';
export const USER_TOKEN = '__fin_user_token__';

export const UserRoles = {
  STUDENT: 'student',

  TEACHER: 'teacher',

  ADMIN: 'admin',
};

export const getIsLoggedIn = () => {
  if (!navigator.cookieEnabled) {
    return false;
  }
  return !!(
    sessionStorage.getItem(LOGIN_STORAGE_KEY) === 'true' ||
    sessionStorage.getItem(LOGIN_STORAGE_KEY) === true
  );
};

export const getUserRole = () => {
  if (!navigator.cookieEnabled) {
    return '';
  }
  return sessionStorage.getItem(USER_ROLE_STORAGE_KEY);
};

export const clearSessionStorage = () => {
  if (!navigator.cookieEnabled) {
    return;
  }
  sessionStorage.setItem(LOGIN_STORAGE_KEY, false);
  sessionStorage.setItem(USER_ROLE_STORAGE_KEY, '');
  sessionStorage.setItem(STUDENT_ID_STORAGE_KEY, '');
  sessionStorage.setItem(TEACHER_ID_STORAGE_KEY, '');
  sessionStorage.setItem(USER_TOKEN, '');
};
