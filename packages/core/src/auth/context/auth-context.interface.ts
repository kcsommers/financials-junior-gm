import { IStudent, IStudentLoginCredentials, IUser } from '../models';

export interface IAuthContext {
  authorizedUser?: IUser;
  loading: boolean;
  initialized: boolean;
  error?: any;
  loginStudent: (credentials: IStudentLoginCredentials) => Promise<IStudent>;
  getCurrentUser: () => Promise<IUser>;
  logout: () => Promise<void>;
}
