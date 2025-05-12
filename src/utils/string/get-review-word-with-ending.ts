export const getReviewWordWithEnding = (reviewCount: number) => {
	switch (reviewCount) {
		case 1:
		case 21:
		case 31:
			return `${reviewCount} відгук`;
		case 2:
		case 3:
		case 4:
		case 22:
		case 23:
		case 24:
		case 34:
			return `${reviewCount} відгука`;
		default:
			return `${reviewCount} відгуків`;
	}
};
