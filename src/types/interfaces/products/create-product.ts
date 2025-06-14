export interface ICreateProduct {
  name: string;
  price: number;
  categoryId: string;
  isActive: boolean;
  calories: number;
  description?: string;
  image?: string;
  order?: number;
  createdBy: string;
}
