import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { UserRoles } from '../../auth/users/user-roles';
import { clearAuthStorage } from '../../auth/utils/clear-auth-storage';
import { logger } from '../../utils/logger';
import { LoginForm } from '../../components/LoginForm';
import { ApiHelper } from '../../api/api-helper';

type TeacherLoginProps = {
  apiBaseUrl: string;
  logo: ReactElement;
};

export const CoreTeacherLogin = ({ apiBaseUrl, logo }: TeacherLoginProps) => {
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
      ApiHelper.logout(apiBaseUrl);
    }
  };

  const onLogin = (email: string, password: string) => {
    setIsLoggingIn(true);

    const doLogin = async () => {
      try {
        const loginRes = await ApiHelper.teacherLogin(apiBaseUrl, {
          email,
          password,
        });

        if (!loginRes?.token) {
          throw loginRes;
        }
        Cookie.set('token', loginRes.token);
        const getUserRes = await ApiHelper.getCurrentUser(apiBaseUrl);
        setIsLoggingIn(false);
        logUserIn(getUserRes.data);
        router.push('/teacher');
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
    <div>
      <div className="m-auto flex justify-center py-4">{logo}</div>
      <LoginForm
        onLogin={onLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        userRole={UserRoles.TEACHER}
      />
    </div>
  );
};
