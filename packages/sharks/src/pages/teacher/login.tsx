import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { clearAuthStorage } from '@statrookie/core/src/auth/utils/clear-auth-storage';
import { logger } from '@statrookie/core/src/auth/utils/logger';
import { LoginForm } from '@statrookie/core/src/components/LoginForm';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const TeacherLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  const { isLoggedIn, logUserIn } = useAuth();

  const onLoginError = (error) => {
    setIsLoggingIn(false);
    setLoginError('Unexpected login error. Please try again');
    clearAuthStorage();
    logger.error(error);
    if (isLoggedIn) {
      ApiHelper.logout(API_BASE_URL);
    }
  };

  const onLogin = (email: string, password: string) => {
    setIsLoggingIn(true);

    const doLogin = async () => {
      try {
        const loginRes = await ApiHelper.teacherLogin(API_BASE_URL, {
          email,
          password,
        });

        if (!loginRes?.token) {
          throw loginRes;
        }
        Cookie.set('token', loginRes.token);
        const getUserRes = await ApiHelper.getCurrentUser(API_BASE_URL);
        setIsLoggingIn(false);
        logUserIn(getUserRes.data);
        router.push('/teacher');
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
    <div>
      <div className="m-auto flex justify-center py-4">
        <FinancialsLogo />
      </div>
      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        userRole={UserRoles.TEACHER}
      />
    </div>
  );
};

export default TeacherLogin;
