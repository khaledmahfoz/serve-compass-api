import { ICategory } from '@interfaces/categories/category';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
@Unique(['order'])
export class Category implements ICategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  order: number;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', default: '' })
  description?: string;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar' })
  createdBy: string;

  @Column({ type: 'varchar' })
  updatedBy: string;
}
