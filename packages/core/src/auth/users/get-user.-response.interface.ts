import { User } from './user.interface';

export interface GetUserResponse<T extends User = User> {
  success: boolean;
  data: T;
}
