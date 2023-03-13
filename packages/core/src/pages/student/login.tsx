import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { UserRoles } from '../../auth/users/user-roles';
import { logger } from '../../auth/utils/logger';
import { LoginForm } from '../../components/LoginForm';
import { ApiHelper } from '../../api/api-helper';

type StudentLoginProps = {
  apiBaseUrl: string;
  logo: ReactElement;
};

export const CoreStudentLogin = ({ apiBaseUrl, logo }: StudentLoginProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn, logUserOut, isLoggedIn } = useAuth();
  const router = useRouter();

  const onLoginError = (error: Error) => {
    setIsLoggingIn(false);
    setLoginError('Unexpected login error. Please try again');

    logger.error(error);
    if (isLoggedIn) {
      ApiHelper.logout(apiBaseUrl);
    }
    logUserOut();
  };

  const onLogin = (userName: string, password: string) => {
    setIsLoggingIn(true);

    const doLogin = async () => {
      try {
        const loginRes = await ApiHelper.studentLogin(apiBaseUrl, {
          userName,
          password,
        });
        if (!loginRes?.token) {
          throw loginRes;
        }
        Cookie.set('token', loginRes.token);
        const getUserRes = await ApiHelper.getCurrentUser(apiBaseUrl);
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
      ApiHelper.logout(apiBaseUrl).then(doLogin).catch(onLoginError);
    } else {
      doLogin();
    }
  };

  return (
    <>
      <div className="m-auto flex justify-center py-4">{logo}</div>
      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        userRole={UserRoles.STUDENT}
      />
    </>
  );
};
