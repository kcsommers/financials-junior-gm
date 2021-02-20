import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { teacherLogin, getCurrentUser } from '../../api-helper';
import financialsLogo from '@images/icons/dashboard/logo.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  TEACHER_ID_STORAGE_KEY,
} from '@data/auth/auth';
import '@css/pages/Login.css';

export const TeacherLogin = ({ history, onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const doLogin = (email, password) => {
    setIsLoggingIn(true);

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

            setIsLoggingIn(false);
            onLogin(currentUserRes.data);

            history.push('/teacher/home');
            localStorage.setItem(LOGIN_STORAGE_KEY, true);
            localStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.TEACHER);
            localStorage.setItem(
              TEACHER_ID_STORAGE_KEY,
              currentUserRes.data._id
            );
          })
          .catch((err) => {
            setIsLoggingIn(false);
            setLoginError('Unexpected login error. Please try again.');
            console.error(err);
          });
      })
      .catch((err) => {
        setIsLoggingIn(false);
        setLoginError('Unexpected login error. Please try again.');
        console.error(err);
      });
  };

  return (
    <div className='login-page-container'>
      <div>
        <ReactSVG src={financialsLogo} />
      </div>

      <LoginForm
        onLogin={doLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
        userField='Email'
      />
    </div>
  );
};
