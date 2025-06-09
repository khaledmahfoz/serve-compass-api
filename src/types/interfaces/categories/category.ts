export interface ICategory {
  id?: string;
  name: string;
  order: number;
  isActive: boolean;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
