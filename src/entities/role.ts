import { UserRole } from '@entities/user-role';
import { RolesTypeEnum } from '@enums/roles-type';
import { IRole } from '@interfaces/roles/role';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

@Unique(['type'])
@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RolesTypeEnum })
  type: RolesTypeEnum;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @Column({ type: 'text', default: '' })
  description?: string;
}
