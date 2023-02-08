import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserRole } from '../../auth/users/user-roles';
import { User } from '../../auth/users/user.interface';
import { clearAuthStorage } from '../../auth/utils/clear-auth-storage';
import { logger } from '../../auth/utils/logger';
import { StorageKeys } from '../../auth/utils/storage-keys.constants';
import { ApiHelper } from '../../server/api/api-helper';

type AuthProviderProps = PropsWithChildren<{
  baseUrl: string;
}>;

interface AuthContext {
  authorizedUser?: User;
  authInitialized: boolean;
  isLoggedIn: boolean;
  userRole: UserRole;
  logUserIn: (user: User) => void;
  logUserOut: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children, baseUrl }) => {
  const [authorizedUser, setAuthorizedUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>();
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const token = Cookie.get('token');
        if (!token) {
          setAuthInitialized(true);
          return;
        }

        const getUserRes = await ApiHelper.getCurrentUser(baseUrl);
        logger.log('AuthContext.getUserRes:::: ', getUserRes);
        setAuthInitialized(true);
        logUserIn(getUserRes.data);
      } catch (error) {
        logger.error(error);
        setAuthInitialized(true);
        logUserOut();
        router.push('/');
      }
    })();
  }, []);

  const logUserIn = (user: User) => {
    setAuthorizedUser(user);
    setIsLoggedIn(true);
    setUserRole(user?.role || null);
    sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(StorageKeys.USER_ROLE_STORAGE_KEY, user.role);
    sessionStorage.setItem(`__fin_${user.role}_id__`, user._id);
  };

  const logUserOut = () => {
    Cookie.remove('token');
    setAuthorizedUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
    clearAuthStorage();
  };

  const memoedValue = useMemo(
    () => ({
      authorizedUser,
      authInitialized,
      isLoggedIn,
      userRole,
      logUserIn,
      logUserOut,
    }),
    [authorizedUser, isLoggedIn, userRole, authInitialized]
  );

  return (
    <authContext.Provider value={memoedValue}>
      {authInitialized && children}
    </authContext.Provider>
  );
};

export const useAuth = (): AuthContext => {
  const context: AuthContext = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
