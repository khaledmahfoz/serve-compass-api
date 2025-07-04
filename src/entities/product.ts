import { Category } from '@entities/category';
import { IProduct } from '@interfaces/products/product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
@Unique(['order'])
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'integer' })
  order: number;

  @Column({ type: 'varchar' })
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'integer' })
  calories: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', default: '' })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar' })
  createdBy: string;

  @Column({ type: 'varchar' })
  updatedBy: string;
}
