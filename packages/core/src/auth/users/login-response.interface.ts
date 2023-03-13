import { UserRole } from './user-roles';

export interface LoginResponse {
  success: boolean;
  message: string;
  role: UserRole;
  token: string;
  _id?: string;
}
