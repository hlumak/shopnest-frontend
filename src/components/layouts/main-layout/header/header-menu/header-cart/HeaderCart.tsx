import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/Sheet';

import { PUBLIC_URL } from '@/config/url.config';

import { useCart } from '@/hooks/useCart';
import { useProfile } from '@/hooks/useProfile';

import { formatPrice } from '@/utils/string/format-price';

import styles from './HeaderCart.module.scss';
import { CartItem } from './cart-item/CartItem';
import { useCheckout } from './useCheckout';

export function HeaderCart() {
	const router = useRouter();

	const { createPayment, isLoadingCreate } = useCheckout();
	const { user } = useProfile();

	const { items, total } = useCart();

	const handleClick = () => {
		user ? createPayment() : router.push(PUBLIC_URL.auth());
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost">Кошик</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<SheetHeader>
					<SheetTitle>Кошик товарів</SheetTitle>
				</SheetHeader>

				<div className={styles.items}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className={styles.not_found}>Кошик порожній!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>До сплати: {formatPrice(total)}</div>
						<Button
							onClick={handleClick}
							variant="primary"
							disabled={isLoadingCreate}
						>
							Перейти до оплати
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
}
