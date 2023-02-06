import axios, { AxiosResponse } from 'axios';
import { History, Location } from 'history';
import Cookie from 'js-cookie';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetUserResponse } from '../../auth/users/get-user.-response.interface';
import { LoginResponse } from '../../auth/users/login-response.interface';
import { StudentLoginCredentials } from '../../auth/users/student-login-credentials.interface';
import { Student } from '../../auth/users/student.interface';
import { UserRole, UserRoles } from '../../auth/users/user-roles';
import { User } from '../../auth/users/user.interface';
import { clearAuthStorage } from '../../auth/utils/clear-auth-storage';
import { StorageKeys } from '../../auth/utils/storage-keys.constants';
import { ApiHelper } from '../../server/api/api-helper';

type AuthProviderProps = {
  children: ReactNode;
  location: Location;
  history: History;
  baseUrl: string;
};

interface AuthContext {
  authorizedUser?: User;
  loading: boolean;
  initialized: boolean;
  error?: any;
  isLoggedIn: boolean;
  userRole: UserRole;
  loginStudent: (credentials: StudentLoginCredentials) => Promise<Student>;
  getCurrentUser: () => Promise<User>;
  logout: () => Promise<void>;
  logUserIn: (user: User) => void;
  logUserOut: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  location,
  baseUrl,
  history,
}) => {
  const [authorizedUser, setAuthorizedUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    ApiHelper.getCurrentUser(baseUrl)
      .then((_response: GetUserResponse) => {
        setAuthorizedUser(_response.data);
        setInitialized(true);
      })
      .catch((_error) => {
        setInitialized(true);
        history.push('/dashboard');
      });
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

  const loginStudent = async (
    _credentials: StudentLoginCredentials
  ): Promise<Student> => {
    setLoading(true);
    try {
      const _response = await axios.post<LoginResponse>(
        `${baseUrl}/api/v1/auth/student/login`,
        _credentials
      );
      setLoading(false);
      Cookie.set('token', _response.data.token);
      return getCurrentUser();
    } catch (_error: any) {
      setError(_error);
      setLoading(false);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setAuthorizedUser(null);
    setError(null);
    return Promise.resolve();
  };

  const logUserIn = (user: User) => {
    sessionStorage.setItem(StorageKeys.LOGIN_STORAGE_KEY, 'true');
    sessionStorage.setItem(StorageKeys.USER_ROLE_STORAGE_KEY, UserRoles.ADMIN);
    if (user.role === 'admin') {
      sessionStorage.setItem(StorageKeys.ADMIN_ID_STORAGE_KEY, user._id);
    }
  };

  const logUserOut = () => {
    clearAuthStorage();
  };

  useEffect(() => {
    setIsLoggedIn(!!authorizedUser);
    setUserRole(authorizedUser?.role || null);
  }, [authorizedUser]);

  const memoedValue = useMemo(
    () => ({
      authorizedUser,
      loading,
      error,
      initialized,
      isLoggedIn,
      userRole,
      loginStudent,
      getCurrentUser,
      logout,
      logUserIn,
      logUserOut,
    }),
    [authorizedUser, loading, error, initialized]
  );

  return (
    <authContext.Provider value={memoedValue}>
      {initialized && children}
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
