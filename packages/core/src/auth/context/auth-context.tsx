import axios, { AxiosResponse } from 'axios';
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
import { UserRole, UserRoles } from '../../auth/users/user-roles';
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
  loading: boolean;
  authInitialized: boolean;
  error?: any;
  isLoggedIn: boolean;
  userRole: UserRole;
  getCurrentUser: () => Promise<User>;
  logout: () => Promise<void>;
  logUserIn: (user: User) => void;
  logUserOut: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children, baseUrl }) => {
  const [authorizedUser, setAuthorizedUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [router.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const getUserRes = await ApiHelper.getCurrentUser(baseUrl);
        logger.log('AuthContext.getUserRes:::: ', getUserRes);
        logUserIn(getUserRes.data);
      } catch (error) {
        logUserOut();
        router.push('/');
      }
    })();
  }, []);

  const getCurrentUser = async function <T extends User = User>(): Promise<T> {
    try {
      const _response: AxiosResponse<User> = await axios.get(
        `${baseUrl}/api/v1/auth/user`
      );
      const _user: T = _response.data as T;
      return _user;
    } catch (_error: any) {
      setError(_error);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setAuthorizedUser(null);
    setError(null);
    return Promise.resolve();
  };

  const logUserIn = (user: User) => {
    setAuthorizedUser(user);
    setIsLoggedIn(!!user);
    setAuthInitialized(true);
    setUserRole(user?.role || null);
    sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(StorageKeys.USER_ROLE_STORAGE_KEY, UserRoles.ADMIN);
    if (user?.role === 'admin') {
      sessionStorage.setItem(StorageKeys.ADMIN_ID_STORAGE_KEY, user._id);
    }
  };

  const logUserOut = () => {
    Cookie.remove('token');
    setAuthInitialized(true);
    setAuthorizedUser(null);
    setUserRole(null);
    clearAuthStorage();
  };

  const memoedValue = useMemo(
    () => ({
      authorizedUser,
      loading,
      error,
      authInitialized,
      isLoggedIn,
      userRole,
      getCurrentUser,
      logout,
      logUserIn,
      logUserOut,
    }),
    [authorizedUser, loading, error, authInitialized]
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
