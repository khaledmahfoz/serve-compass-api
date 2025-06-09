export interface ICreateCategory {
  name: string;
  order?: number;
  isActive: boolean;
  description?: string;
  image?: string;
  createdBy: string;
}
