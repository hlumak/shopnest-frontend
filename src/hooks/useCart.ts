import { DecimalUtils } from '@/utils/decimal/decimal-utils';

import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const items = useTypedSelector(state => state.cart.items)

	const total = DecimalUtils.calculateTotal(items)

	return { items, total }
}
