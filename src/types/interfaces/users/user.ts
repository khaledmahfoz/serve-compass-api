import { AuthProvidersEnum } from '@enums/auth-providers';
import { RolesTypeEnum } from '@enums/roles-type';
import { IUserRole } from '@interfaces/user-roles/user-role';

export interface IUser {
  id: string;
  email: string;
  fullname: string;
  emailVerified: boolean;
  provider: AuthProvidersEnum;
  role?: RolesTypeEnum | null;
  userRole?: IUserRole | null;
  firstname?: string;
  lastname?: string;
  picture: string | null;
  password: string | null;
  joinedAt: Date;
  lastUpdatedAt: Date;
}
