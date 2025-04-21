'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal';

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import { getAccessToken } from '@/services/auth/auth-token.serice';

import styles from './HeaderMenu.module.scss';
import { HeaderCart } from './header-cart/HeaderCart';

export function HeaderMenu() {
	const [mounted, setMounted] = useState(false);
	const { user, isLoading } = useProfile();

	useEffect(() => {
		setMounted(true);
	}, []);

	const hasToken = mounted ? !!getAccessToken() : false;

	return (
		<div className={styles.header_menu}>
			<HeaderCart />
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant="ghost">Каталог</Button>
			</Link>
			{hasToken ? (
				isLoading ? (
					<Loader size="sm" />
				) : (
					user && (
						<>
							<Link href={DASHBOARD_URL.favorites()}>
								<Button variant="ghost">Обране</Button>
							</Link>
							{user.stores.length ? (
								<Link href={STORE_URL.home(user.stores[0].id)}>
									<Button variant="ghost">Мої магазини</Button>
								</Link>
							) : (
								<CreateStoreModal>
									<Button variant="ghost" asChild>
										<span>Створити магазин</span>
									</Button>
								</CreateStoreModal>
							)}
							<Link href={DASHBOARD_URL.home()}>
								<Image
									src={user.picture}
									alt={user.name}
									width={42}
									height={42}
									className={styles.avatar}
								/>
							</Link>
						</>
					)
				)
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant="primary">
						<LogOut className={styles.icon} />
						Увійти
					</Button>
				</Link>
			)}
		</div>
	);
}
