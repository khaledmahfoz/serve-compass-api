import { ICategory } from '@interfaces/categories/category';

export interface IProduct {
  id?: string;
  name: string;
  price: number;
  order: number;
  isActive: boolean;
  categoryId: string;
  category: ICategory;
  calories: number;
  isDeleted?: boolean;
  deletedAt?: Date;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
