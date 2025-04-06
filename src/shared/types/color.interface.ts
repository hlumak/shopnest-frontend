export interface IColor {
  id: string;
  createdAt: string;
  name: string;
  value: string;
  storeId: string;
}

export type IColorInput = Pick<IColor, 'name' | 'value'>;
