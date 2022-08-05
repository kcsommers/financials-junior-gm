import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin, getCurrentUser, logout } from '../../api-helper';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  ADMIN_ID_STORAGE_KEY,
  clearSessionStorage,
} from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import '@css/pages/Login.css';
import statrookieLogo from '@images/statrookie-logo.png';

export const AdminLogin = ({ history, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLoginSuccess = (admin) => {
    if (!navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    sessionStorage.setItem(LOGIN_STORAGE_KEY, true);
    sessionStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.ADMIN);
    sessionStorage.setItem(ADMIN_ID_STORAGE_KEY, admin._id);

    dispatch(setLoginState(true, UserRoles.ADMIN));
    history.push('/admin');
  };

  const onLoginError = (error) => {
    const msg = 'Unexpected login error. Please try again';
    setIsLoggingIn(false);
    setLoginError(msg);
    clearSessionStorage();

    console.error(msg, error);

    dispatch(setLoginState(false, ''));
    if (isLoggedIn) {
      logout();
    }
  };

  const onLogin = (userName, password) => {
    setIsLoggingIn(true);

    const doLogin = () => {
      adminLogin({ userName, password })
        .then((res) => {
          if (!res || !res.success) {
            throw res;
          }

          Cookie.set('token', res.token); // Setting cookie on the browser

          getCurrentUser()
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
      logout().then(doLogin).catch(onLoginError);
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
        userRole={UserRoles.ADMIN}
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
