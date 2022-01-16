import { FC, useState } from 'react';
import { IUser } from '../models';
import { AuthContext } from './auth.context';

export const AuthProvider: FC = ({ children }) => {
  const [authorizedUser, setAuthorizedUser] = useState<IUser>();

  return (
    <AuthContext.Provider value={{ authorizedUser, setAuthorizedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
