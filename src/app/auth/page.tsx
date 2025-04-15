import type {Metadata} from 'next';

import {Auth} from './Auth';

export const metadata: Metadata = {
	title: 'Авторизація'
}

export default function AuthPage() {
	return <Auth />
}
