import { UserRole } from './user-role.type';

export interface IUser {
  userName: string;
  password: string;
  role: UserRole;
  createdAt: number;
}
