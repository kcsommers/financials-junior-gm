import { IUser } from '../models';

export interface IAuthContext {
  authorizedUser: IUser;
  setAuthorizedUser: (user: IUser) => void;
}
