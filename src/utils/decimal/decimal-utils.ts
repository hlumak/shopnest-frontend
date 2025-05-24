export class DecimalUtils {
	static toNumber(value: string | number): number {
		if (typeof value === 'number') {
			return value;
		}

		const parsed = parseFloat(value.replace(',', '.'));
		return isNaN(parsed) ? 0 : parsed;
	}

	static toString(value: string | number): string {
		if (typeof value === 'string') {
			return value.replace(',', '.');
		}

		return value.toString();
	}

	static format(
		value: string | number,
		locale: string = 'uk-UA',
		currency: string = 'UAH'
	): string {
		const numericValue = DecimalUtils.toNumber(value);

		return numericValue.toLocaleString(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 0
		});
	}

	static isValid(value: string): boolean {
		if (!value || value.trim() === '') return false;

		const normalizedValue = value.replace(',', '.');
		const parsed = parseFloat(normalizedValue);

		return !isNaN(parsed) && isFinite(parsed) && parsed >= 0;
	}

	static calculateTotal(
		items: Array<{ price: string | number; quantity: number }>
	): number {
		return items.reduce((acc, item) => {
			const itemPrice = DecimalUtils.toNumber(item.price);
			return acc + itemPrice * item.quantity;
		}, 0);
	}
}
