import { IOrder } from '@/shared/types/order.interface';
import { IProduct } from '@/shared/types/product.interface';
import { IStore } from '@/shared/types/store.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  favorites: IProduct[];
  orders: IOrder[];
  stores: IStore[];
}
