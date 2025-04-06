export interface ICategory {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  storeId: string;
}

export type ICategoryInput = Pick<ICategory, 'title' | 'description'>;
