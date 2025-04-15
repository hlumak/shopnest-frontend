import type { Metadata } from 'next';

import { productService } from '@/services/product.service';

import { Explorer } from './Explorer';

export const metadata: Metadata = {
	title: 'Каталог товарів'
};

export const revalidate = 60;

async function getProducts() {
	return await productService.getAll();
}

export default async function ExplorerPage() {
	const data = await getProducts();

	return <Explorer products={data} />;
}
