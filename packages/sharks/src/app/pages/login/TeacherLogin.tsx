import { useState } from 'react';
import { teacherLogin, getCurrentUser, logout } from '../../api-helper';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  TEACHER_ID_STORAGE_KEY,
  clearSessionStorage,
} from '@data/auth/auth';
import { setLoginState, useAppDispatch } from '@redux';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import '@css/pages/Login.css';

export const TeacherLogin = ({ history, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (teacher) => {
    if (!navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    sessionStorage.setItem(LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.TEACHER);
    sessionStorage.setItem(TEACHER_ID_STORAGE_KEY, teacher._id);

    dispatch(setLoginState({ isLoggedIn: true, userRole: UserRoles.TEACHER }));
    history.push('/teacher/home');
  };

  const onLoginError = (error) => {
    const msg = 'Unexpected login error. Please try again';
    setIsLoggingIn(false);
    setLoginError(msg);
    clearSessionStorage();

    console.error(msg, error);

    dispatch(setLoginState({ isLoggedIn: false, userRole: '' }));
    if (isLoggedIn) {
      logout();
    }
  };

  const onLogin = (email, password) => {
    setIsLoggingIn(true);

    const doLogin = () => {
      teacherLogin({ email, password })
        .then((res) => {
          if (!res || !res.success) {
            throw res;
          }
          Cookie.set('token', res.token); // Setting cookie on the browser

          getCurrentUser()
            .then((currentUserRes) => {
              if (!currentUserRes || !currentUserRes.success) {
                throw currentUserRes;
              }

              onLoginSuccess(currentUserRes.data);
            })
            .catch(onLoginError);
        })
        .catch(onLoginError);
    };

    // if someone is currently logged in, log them out to expire their cookie
    if (isLoggedIn) {
      logout().then(doLogin).catch(onLoginError);
    } else {
      doLogin();
    }
  };

  return (
    <div className="login-page-container">
      <div>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>

      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
        userRole={UserRoles.TEACHER}
      />
    </div>
  );
};
