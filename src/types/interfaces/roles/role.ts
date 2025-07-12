import { RolesTypeEnum } from 'src/types/enums/roles-type';

export interface IRole {
  id: string;
  type: RolesTypeEnum;
  description?: string;
}
