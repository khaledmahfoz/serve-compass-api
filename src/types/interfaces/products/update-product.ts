export interface IUpdateProduct {
  name?: string;
  order?: number;
  isActive?: boolean;
  description?: string;
  image?: string;
  calories?: number;
  updatedBy: string;
}
