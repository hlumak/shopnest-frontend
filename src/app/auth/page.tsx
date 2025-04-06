import { Metadata } from 'next';

import { Auth } from '@/app/auth/Auth';

export const metadata: Metadata = {
  title: 'Авторизація'
};

export default function AuthPage() {
  return <Auth />;
}
