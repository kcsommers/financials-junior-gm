import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { logger } from '@statrookie/core/src/auth/utils/logger';
import { LoginForm } from '@statrookie/core/src/components/LoginForm';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const StudentLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn, logUserOut, isLoggedIn } = useAuth();
  const router = useRouter();

  const onLoginError = (error: Error) => {
    setIsLoggingIn(false);
    setLoginError('Unexpected login error. Please try again');

    logger.error(error);
    if (isLoggedIn) {
      ApiHelper.logout(API_BASE_URL);
    }
    logUserOut();
  };

  const onLogin = (userName: string, password: string) => {
    setIsLoggingIn(true);

    const doLogin = async () => {
      try {
        const loginRes = await ApiHelper.studentLogin(API_BASE_URL, {
          userName,
          password,
        });
        if (!loginRes?.token) {
          throw loginRes;
        }
        Cookie.set('token', loginRes.token);
        const getUserRes = await ApiHelper.getCurrentUser(API_BASE_URL);
        if (!getUserRes?.data) {
          throw new Error('Error getting current user');
        }

        setIsLoggingIn(false);
        logUserIn(getUserRes.data);
        router.push('/game/home');
      } catch (error: any) {
        onLoginError(error);
      }
    };

    // if someone is currently logged in, log them out to expire their cookie
    if (isLoggedIn) {
      ApiHelper.logout(API_BASE_URL).then(doLogin).catch(onLoginError);
    } else {
      doLogin();
    }
  };

  return (
    <>
      <div className="m-auto flex justify-center py-4">
        <FinancialsLogo />
      </div>
      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        userRole={UserRoles.STUDENT}
      />
    </>
  );
};

export default StudentLogin;
