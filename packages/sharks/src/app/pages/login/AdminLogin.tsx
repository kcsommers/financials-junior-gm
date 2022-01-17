import { useState } from 'react';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  UserRoles,
  StorageKeys,
  clearAuthStorage,
  ApiHelper,
} from '@statrookie/core';
import { setLoginState, useAppDispatch } from '@redux';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import '@css/pages/Login.css';
import { BASE_URL } from 'app/api';

export const AdminLogin = ({ history, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (admin) => {
    if (!navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(StorageKeys.USER_ROLE_STORAGE_KEY, UserRoles.ADMIN);
    sessionStorage.setItem(StorageKeys.ADMIN_ID_STORAGE_KEY, admin._id);

    dispatch(setLoginState({ isLoggedIn: true, userRole: UserRoles.ADMIN }));
    history.push('/admin');
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
      ApiHelper.adminLogin(BASE_URL, { userName, password })
        .then((res) => {
          if (!res || !res.success) {
            throw res;
          }

          Cookie.set('token', res.token); // Setting cookie on the browser

          ApiHelper.getCurrentUser(BASE_URL)
            .then((adminRes) => {
              const admin = adminRes.data;
              if (!adminRes.success || !admin) {
                throw adminRes;
              }

              onLoginSuccess(admin);
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
      <div>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>

      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
        userRole={UserRoles.ADMIN}
      />
    </div>
  );
};
