import { UserRole } from './user-role.type';

export interface IUser {
  _id: string;
  userName: string;
  password: string;
  role: UserRole;
  createdAt: number;
}
