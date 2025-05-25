'use client';

import { LogOut, Menu, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/Sheet';
import { Input } from '@/components/ui/form-elements/Input';
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal';

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import { getAccessToken } from '@/services/auth/auth-token.serice';

import { HeaderCart } from '../header-menu/header-cart/HeaderCart';

import styles from './MobileMenu.module.scss';

export function MobileMenu() {
	const [mounted, setMounted] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);
	const { user, isLoading } = useProfile();
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	const hasToken = mounted ? !!getAccessToken() : false;

	const handleSearch = () => {
		router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`));
		setIsOpen(false);
	};

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger
				className="lg:hidden hover:opacity-75 transition-opacity p-2 rounded-lg hover:bg-gray-100"
				aria-label="Открыть меню"
			>
				<Menu className="h-6 w-6" />
			</SheetTrigger>
			<SheetContent side="right" className={styles.content}>
				<SheetHeader className={styles.header}>
					<SheetTitle className={styles.title}>Меню</SheetTitle>
				</SheetHeader>

				<div className={styles.menu}>
					{hasToken && user && (
						<div className={styles.profile_section}>
							<Link
								href={DASHBOARD_URL.home()}
								className={styles.profile_link}
								onClick={handleLinkClick}
							>
								<Image
									src={user.picture}
									alt={user.name}
									width={40}
									height={40}
									className={styles.avatar}
								/>
								<div>
									<span className={styles.user_name}>{user.name}</span>
									<span className={styles.user_email}>{user.email}</span>
								</div>
							</Link>
						</div>
					)}

					<div className={styles.search_section}>
						<h3>🔍 Пошук</h3>
						<div className={styles.search_form}>
							<Input
								placeholder="Пошук товарів..."
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								onKeyDown={e => e.key === 'Enter' && handleSearch()}
								className={styles.search_input}
							/>
							<Button
								variant="primary"
								onClick={handleSearch}
								size="sm"
								className={styles.search_btn}
							>
								<Search className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className={styles.navigation_section}>
						<h3>📱 Навігація</h3>
						<div className={styles.nav_links}>
							<Link
								href={PUBLIC_URL.home()}
								className={styles.nav_link}
								onClick={handleLinkClick}
							>
								🏠 Головна
							</Link>
							<Link
								href={PUBLIC_URL.explorer()}
								className={styles.nav_link}
								onClick={handleLinkClick}
							>
								🛍️ Каталог
							</Link>

							{hasToken ? (
								isLoading ? (
									<div className={styles.loader_container}>
										<Loader size="sm" />
									</div>
								) : (
									user && (
										<>
											<Link
												href={DASHBOARD_URL.favorites()}
												className={styles.nav_link}
												onClick={handleLinkClick}
											>
												❤️ Обране
											</Link>
											{user.stores.length ? (
												<Link
													href={STORE_URL.home(user.stores[0].id)}
													className={styles.nav_link}
													onClick={handleLinkClick}
												>
													🏪 Мої магазини
												</Link>
											) : (
												<CreateStoreModal>
													<Button
														variant="ghost"
														asChild
														className={styles.create_store_btn}
													>
														<span>🏪 Створити магазин</span>
													</Button>
												</CreateStoreModal>
											)}
										</>
									)
								)
							) : (
								<Link
									href={PUBLIC_URL.auth()}
									className={styles.auth_link}
									onClick={handleLinkClick}
								>
									<Button variant="primary" className={styles.auth_btn}>
										<LogOut className="h-4 w-4 mr-2" />
										Увійти
									</Button>
								</Link>
							)}
						</div>
					</div>

					<div className={styles.cart_section}>
						<h3>🛒 Кошик</h3>
						<div className={styles.cart_container}>
							<HeaderCart />
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
