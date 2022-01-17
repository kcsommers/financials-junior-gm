import { IUser } from './user.interface';

export interface ITeacher extends IUser {
  email: string;
  name: string;
  school: string;
  zipCode: string;
  gradeTaught: number;
  classSize: number;
  schoolAddress: string;
  city: string;
  state: string;
  schoolDistrict: string;
  resetToken: string;
  resetTokenExpiration: number;
}
