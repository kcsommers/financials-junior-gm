import { UserRole } from './user-roles';

export interface User {
  _id: string;
  userName: string;
  password: string;
  role: UserRole;
  createdAt: number;
}
