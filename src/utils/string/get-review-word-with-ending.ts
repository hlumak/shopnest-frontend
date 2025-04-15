export const getReviewWordWithEnding = (reviewCount: number) => {
	switch (reviewCount) {
		case 1 || 21 || 31:
			return `${reviewCount} відгук`
		case 2 || 3 || 4 || 22 || 23 || 24 || 34:
			return `${reviewCount} відгука`
		default:
			return `${reviewCount} відгуків`
	}
}
