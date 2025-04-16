import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import React from 'react';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './globals.scss';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	icons: {
		icon: '../../public/icons/favicon.ico',
		shortcut: '../../public/icons/favicon-16x16.png',
		apple: '../../public/icons/apple-touch-icon.png'
	}
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
