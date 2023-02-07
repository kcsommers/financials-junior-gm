import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { logger } from '@statrookie/core/src/auth/utils/logger';
import { LoginForm } from '@statrookie/core/src/components/LoginForm';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { environments } from '../../environments';

export const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

const AdminLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn, logUserOut, isLoggedIn } = useAuth();
  const router = useRouter();

  const onLoginError = (error: Error) => {
    setIsLoggingIn(false);
    setLoginError('Unexpected login error. Please try again');

    logger.error(error);
    if (isLoggedIn) {
      ApiHelper.logout(BASE_URL);
    }
    logUserOut();
  };

  const onLogin = (userName: string, password: string) => {
    setIsLoggingIn(true);

    const doLogin = async () => {
      try {
        const loginRes = await ApiHelper.adminLogin(BASE_URL, {
          userName,
          password,
        });
        if (!loginRes?.data?.token) {
          throw loginRes;
        }
        Cookie.set('token', loginRes.data.token);
        const getUserRes = await ApiHelper.getCurrentUser(BASE_URL);
        if (!getUserRes) {
          throw new Error('Error getting current user');
        }

        setIsLoggingIn(false);
        logUserIn(getUserRes.data);
        router.push('/admin');
      } catch (error: any) {
        onLoginError(error);
      }
    };

    // if someone is currently logged in, log them out to expire their cookie
    if (isLoggedIn) {
      ApiHelper.logout(BASE_URL).then(doLogin).catch(onLoginError);
    } else {
      doLogin();
    }
  };

  return (
    <div className="text-center relative top-0">
      <div className="m-auto inline-block">
        <FinancialsLogo />
      </div>

      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        userRole={UserRoles.ADMIN}
      />
    </div>
  );
};

export default AdminLogin;
