import { Metadata } from 'next';

import { Home } from '@/app/(root)/Home';

export const metadata: Metadata = {
  title: 'Ваш шопінг, ваше задоволення - все в одному місці!'
};

export default function HomePage() {
  return <Home />;
}
