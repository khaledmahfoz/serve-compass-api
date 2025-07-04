import { IRole } from '@interfaces/roles/role';
import { IUser } from '@interfaces/users/user';

export interface IUserRole {
  id: string;
  user: IUser;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
}
