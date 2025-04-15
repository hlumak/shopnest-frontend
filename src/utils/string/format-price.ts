export function formatPrice(price: number) {
	return price.toLocaleString('uk-UA', {
		style: 'currency',
		currency: 'UAH',
		minimumFractionDigits: 0
	})
}
