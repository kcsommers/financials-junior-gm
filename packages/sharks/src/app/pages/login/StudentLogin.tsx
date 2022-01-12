import { useState } from 'react';
import {
  studentLogin,
  getCurrentUser,
  initPlayersByLevel,
  logout,
} from '../../api-helper';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  STUDENT_ID_STORAGE_KEY,
  clearSessionStorage,
} from '@data/auth/auth';
import '@css/pages/Login.css';
import { setLoginState, useAppDispatch } from '@redux';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser

export const StudentLogin = ({ history, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (student) => {
    if (!navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    sessionStorage.setItem(LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.STUDENT);
    sessionStorage.setItem(STUDENT_ID_STORAGE_KEY, student._id);

    dispatch(setLoginState({ isLoggedIn: true, userRole: UserRoles.STUDENT }));
    history.push('/home');
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

  const onLogin = (userName, password) => {
    setIsLoggingIn(true);

    const doLogin = () => {
      studentLogin({ userName, password })
        .then((res) => {
          if (!res || !res.success) {
            throw res;
          }

          Cookie.set('token', res.token); // Setting cookie on the browser

          getCurrentUser()
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
              initPlayersByLevel(+student.level || 1)
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
        userRole={UserRoles.STUDENT}
      />
    </div>
  );
};
