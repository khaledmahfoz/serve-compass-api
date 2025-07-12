import { ILogin } from './login';

export interface IRegister extends ILogin {
  fullname: string;
  firstname?: string;
  lastname?: string;
  password: string;
  confirmPassword: string;
}
