import { useContext } from 'react';
import { IAuthContext } from './auth-context.interface';
import { AuthContext } from './auth.context';

export const useAuth = (): IAuthContext => {
  const authContext: IAuthContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};
