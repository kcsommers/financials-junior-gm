import { createContext } from 'react';
import { IAuthContext } from './auth-context.interface';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
