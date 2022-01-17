import { ILoginResponse } from 'auth/models/login-response.interface';
import axios, { AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { ApiHelper } from 'server';
import {
  IGetUserResponse,
  IStudent,
  IStudentLoginCredentials,
  IUser,
} from '../models';
import { AuthContext } from './auth.context';
import { Location, History } from 'history';

interface IAuthProviderProps {
  children: ReactNode;
  location: Location;
  history: History;
  baseUrl: string;
}

export const AuthProvider: FC<IAuthProviderProps> = ({
  children,
  location,
  baseUrl,
  history,
}) => {
  const [authorizedUser, setAuthorizedUser] = useState<IUser>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    ApiHelper.getCurrentUser(baseUrl)
      .then((_response: IGetUserResponse) => {
        setAuthorizedUser(_response.data);
        setLoadingInitial(false);
      })
      .catch((_error) => {
        setLoadingInitial(false);
        history.push('/dashboard');
      });
  }, []);

  const getCurrentUser = async function <
    T extends IUser = IUser
  >(): Promise<T> {
    try {
      const _response: AxiosResponse<IUser> = await axios.get(
        `${baseUrl}/api/v1/auth/user`
      );
      const _user: T = _response.data as T;
      return _user;
    } catch (_error: any) {
      setError(_error);
    }
  };

  const loginStudent = async (
    _credentials: IStudentLoginCredentials
  ): Promise<IStudent> => {
    setLoading(true);
    try {
      const _response: AxiosResponse<ILoginResponse> = await axios.post(
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

  const memoedValue = useMemo(
    () => ({
      authorizedUser,
      loading,
      error,
      loginStudent,
      getCurrentUser,
      logout,
    }),
    [authorizedUser, loading, error]
  );

  console.log('user:::: ', loadingInitial, authorizedUser);

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};
