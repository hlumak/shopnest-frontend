import type { Metadata } from 'next';

import { productService } from '@/services/product.service';

import { Home } from './Home';

export const metadata: Metadata = {
	title: 'Ваш шопінг, ваше задоволення - все в одному місці!'
};

export const revalidate = 60;

async function getProducts() {
	return (await productService.getMostPopular()).slice(0, 6);
}

export default async function HomePage() {
	const data = await getProducts();

	return <Home products={data} />;
}
