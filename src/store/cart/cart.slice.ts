import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import type {
	IAddToCartPayload,
	ICartInitialState,
	IChangeQuantityPayload
} from './cart.types';

const initialState: ICartInitialState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
			const isExist = state.items.some(
				item => item.product.id === action.payload.product.id
			);

			if (!isExist)
				state.items.push({ ...action.payload, id: state.items.length });

			toast.success('Товар додано до кошика');
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(item => item.id !== action.payload.id);
			toast.success('Товар видалено з кошика');
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload;
			const item = state.items.find(item => item.id === id);
			if (item) type === 'plus' ? item.quantity++ : item.quantity--;
		},
		reset: state => {
			state.items = [];
		}
	}
});
