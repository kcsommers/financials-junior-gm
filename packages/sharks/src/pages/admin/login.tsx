import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { User } from '@statrookie/core/src/auth/users/user.interface';
import { LoginForm } from '@statrookie/core/src/components/LoginForm';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import { isClientSide } from '@statrookie/core/src/utils/is-client-side';
import { BASE_URL } from 'app/api';
import Cookie from 'js-cookie'; /// JS-Cookie lib to store cookie on the browser
import { useRouter } from 'next/router';
import { useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';

const AdminLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn, logUserOut, isLoggedIn } = useAuth();
  const router = useRouter();

  const onLoginSuccess = (admin: User) => {
    if (isClientSide() && !navigator.cookieEnabled) {
      return;
    }
    setIsLoggingIn(false);
    logUserIn(admin);
    router.push('/admin');
  };

  const onLoginError = (error) => {
    const msg = 'Unexpected login error. Please try again';
    setIsLoggingIn(false);
    setLoginError(msg);

    console.error(msg, error);
    if (isLoggedIn) {
      ApiHelper.logout();
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
        if (!loginRes || !loginRes.success) {
          throw loginRes;
        }

        Cookie.set('token', loginRes.token); // Setting cookie on the browser

        const getAdminRes = await ApiHelper.getCurrentUser(BASE_URL);
        const admin = getAdminRes.data;
        if (!getAdminRes.success || !admin) {
          throw getAdminRes;
        }

        onLoginSuccess(admin);
      } catch (error) {
        onLoginError(error);
      }
    };

    // if someone is currently logged in, log them out to expire their cookie
    if (isLoggedIn) {
      ApiHelper.logout().then(doLogin).catch(onLoginError);
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
