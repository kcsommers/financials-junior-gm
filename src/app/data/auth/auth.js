export const LOGIN_STORAGE_KEY = '__fin__is_logged_in__';
export const USER_ROLE_STORAGE_KEY = '__fin__user_role__';
export const TEACHER_ID_STORAGE_KEY = '__fin_teacher_id__';
export const STUDENT_ID_STORAGE_KEY = '__fin_student_id__';

export const UserRoles = {
  STUDENT: 'student',

  TEACHER: 'teacher',
};

export const getIsLoggedIn = () => {
  console.log(
    '[getIsLoggedIn]:::: ',
    localStorage.getItem(LOGIN_STORAGE_KEY) === 'true' ||
      localStorage.getItem(LOGIN_STORAGE_KEY) === true
  );
  return !!(
    localStorage.getItem(LOGIN_STORAGE_KEY) === 'true' ||
    localStorage.getItem(LOGIN_STORAGE_KEY) === true
  );
};

export const getUserRole = () => {
  return localStorage.getItem(USER_ROLE_STORAGE_KEY);
};
