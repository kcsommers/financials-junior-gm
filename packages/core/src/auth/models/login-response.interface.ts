import { UserRole } from './user-role.type';

export interface ILoginResponse {
  success: boolean;
  message: string;
  role: UserRole;
  token: string;
}
