export class DecimalUtils {
	/**
	 * Converts a Decimal value (string or number) to a number for calculations
	 */
	static toNumber(value: string | number): number {
		if (typeof value === 'number') {
			return value;
		}

		const parsed = parseFloat(value.replace(',', '.'));
		return isNaN(parsed) ? 0 : parsed;
	}

	/**
	 * Converts a value to string for Decimal compatibility
	 */
	static toString(value: string | number): string {
		if (typeof value === 'string') {
			return value.replace(',', '.');
		}

		return value.toString();
	}

	/**
	 * Formats a Decimal value for display
	 */
	static format(value: string | number, locale: string = 'uk-UA', currency: string = 'UAH'): string {
		const numericValue = DecimalUtils.toNumber(value);

		return numericValue.toLocaleString(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 0
		});
	}

	/**
	 * Validates if a string is a valid decimal number
	 */
	static isValid(value: string): boolean {
		if (!value || value.trim() === '') return false;

		const normalizedValue = value.replace(',', '.');
		const parsed = parseFloat(normalizedValue);

		return !isNaN(parsed) && isFinite(parsed) && parsed >= 0;
	}

	/**
	 * Calculates total for cart items
	 */
	static calculateTotal(items: Array<{ price: string | number; quantity: number }>): number {
		return items.reduce((acc, item) => {
			const itemPrice = DecimalUtils.toNumber(item.price);
			return acc + (itemPrice * item.quantity);
		}, 0);
	}
}
