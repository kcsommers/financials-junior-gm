import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { teacherLogin, getCurrentUser, logout } from '../../api-helper';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  TEACHER_ID_STORAGE_KEY,
} from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import '@css/pages/Login.css';

export const TeacherLogin = ({ history, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (teacher) => {
    setIsLoggingIn(false);
    sessionStorage.setItem(LOGIN_STORAGE_KEY, true);
    sessionStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.TEACHER);
    sessionStorage.setItem(TEACHER_ID_STORAGE_KEY, teacher._id);

    dispatch(setLoginState(true, UserRoles.TEACHER));
    history.push('/teacher/home');
  };

  const onLoginError = (error) => {
    const msg = 'Unexpected login error. Please try again';
    setIsLoggingIn(false);
    setLoginError(msg);
    console.error(msg, error);
    sessionStorage.setItem(LOGIN_STORAGE_KEY, false);
    sessionStorage.setItem(USER_ROLE_STORAGE_KEY, '');
    sessionStorage.setItem(TEACHER_ID_STORAGE_KEY, '');

    dispatch(setLoginState(false, ''));
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
    <div className='login-page-container'>
      <div>
        <ReactSVG src={financialsLogo} />
      </div>

      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
        userField='Email'
      />
    </div>
  );
};
