import type {Metadata} from 'next';

import {NO_INDEX_PAGE} from '@/constants/seo.constants';

import {ColorEdit} from './ColorEdit';

export const metadata: Metadata = {
	title: 'Налаштування кольору',
	...NO_INDEX_PAGE
}

export default function ColorEditPage() {
	return <ColorEdit />
}
