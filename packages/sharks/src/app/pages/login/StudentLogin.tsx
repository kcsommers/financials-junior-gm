import { useState } from 'react';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  StorageKeys,
  UserRoles,
  clearAuthStorage,
  ApiHelper,
  IStudent,
} from '@statrookie/core';
import '@css/pages/Login.css';
import { setLoginState, useAppDispatch } from '@redux';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
<<<<<<< HEAD:packages/sharks/src/app/pages/login/StudentLogin.tsx
import { BASE_URL } from 'app/api';
=======
import statrookieLogo from '@images/statrookie-logo.png';
>>>>>>> develop:src/app/pages/login/StudentLogin.jsx

export const StudentLogin = ({ history, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (student) => {
    if (!navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(
      StorageKeys.USER_ROLE_STORAGE_KEY,
      UserRoles.STUDENT
    );
    sessionStorage.setItem(StorageKeys.STUDENT_ID_STORAGE_KEY, student._id);

    dispatch(setLoginState({ isLoggedIn: true, userRole: UserRoles.STUDENT }));
    history.push('/home');
  };

  const onLoginError = (error) => {
    const msg = 'Unexpected login error. Please try again';
    setIsLoggingIn(false);
    setLoginError(msg);
    clearAuthStorage();

    console.error(msg, error);

    dispatch(setLoginState({ isLoggedIn: false, userRole: '' }));
    if (isLoggedIn) {
      ApiHelper.logout();
    }
  };

  const onLogin = (userName, password) => {
    setIsLoggingIn(true);

    const doLogin = () => {
      ApiHelper.studentLogin(BASE_URL, { userName, password })
        .then((res) => {
          if (!res || !res.success) {
            throw res;
          }

          Cookie.set('token', res.token); // Setting cookie on the browser

          ApiHelper.getCurrentUser<IStudent>(BASE_URL)
            .then((studentRes) => {
              const student = studentRes.data;
              if (!studentRes.success || !student) {
                throw studentRes;
              }

              // check for initialized players
              if (student.players && student.players.length) {
                onLoginSuccess(student);
                return;
              }

              // initialize players on student
              ApiHelper.initPlayersByLevel(BASE_URL, +student.level || 1)
                .then((initializedStudentRes) => {
                  if (
                    !initializedStudentRes.success ||
                    !initializedStudentRes.data
                  ) {
                    throw initializedStudentRes;
                  }

                  onLoginSuccess(student);
                })
                .catch(onLoginError);
            })
            .catch(onLoginError);
        })
        .catch(onLoginError);
    };

    // if someone is currently logged in, log them out to expire their cookie
    if (isLoggedIn) {
      ApiHelper.logout().then(doLogin).catch(onLoginError);
    } else {
      doLogin();
    }
  };

  return (
    <div className="login-page-container">
      <div style={{ margin: '-2rem 0 -3rem 0' }}>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>

      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
        userRole={UserRoles.STUDENT}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            transform: 'translate(10px, -100%)',
            opacity: 0.75,
          }}
        >
          designed by
        </span>
        <img
          style={{
            width: '100px',
          }}
          src={statrookieLogo}
          alt="Stat Rookie"
        />
      </div>
    </div>
  );
};
