import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import React from 'react';

import { Providers } from '@/app/providers';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './globals.css';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={GeistSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
