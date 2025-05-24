import { DecimalUtils } from '@/utils/decimal';

export function formatPrice(price: string | number) {
	return DecimalUtils.format(price, 'uk-UA', 'UAH');
}
