import { Metadata } from 'next';

import { Store } from '@/app/store/Store';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Керування магазином',
  ...NO_INDEX_PAGE
};

export default function StorePage() {
  return <Store />;
}
