import { IUser } from '.';

export interface IGetUserResponse<T extends IUser = IUser> {
  success: boolean;
  data: T;
}
