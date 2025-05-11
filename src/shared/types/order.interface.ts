import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

interface IAmount {
	value: string;
	currency: string;
}

export interface IPaymentResponse {
	amount: IAmount;
	currency: string;
	description: string;
	resultUrl: string;
	paymentUrl: string;
}

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED'
}

export interface IOrder {
	id: string;
	createdAt: string;
	items: ICartItem[];
	status: EnumOrderStatus;
	user: IUser;
	total: number;
}
