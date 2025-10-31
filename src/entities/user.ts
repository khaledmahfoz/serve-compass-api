import { UserRole } from '@entities/user-role';
import { AuthProvidersEnum } from '@enums/auth-providers';
import { IUser } from '@interfaces/users/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToOne,
} from 'typeorm';

@Unique(['email'])
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'enum', enum: AuthProvidersEnum })
  provider: AuthProvidersEnum;

  @OneToOne(() => UserRole, (userRole) => userRole.user, {
    onDelete: 'CASCADE',
  })
  userRole?: UserRole | null;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string | null;

  @CreateDateColumn()
  joinedAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;
}
