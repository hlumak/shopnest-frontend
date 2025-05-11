import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

import { ILastUsers } from '@/shared/types/statistics.interface';

import { formatPrice } from '@/utils/string/format-price';

import styles from './MiddleStatistics.module.scss';

interface LastUsersProps {
	data: ILastUsers[];
}

export function LastUsers({ data }: LastUsersProps) {
	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Прибуток</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length ? (
					data.map(user => (
						<div key={user.id} className={styles.user}>
							<Image
								src={user.picture}
								alt={user.name}
								width={40}
								height={40}
							/>
							<div className={styles.info}>
								<p className={styles.name}>{user.name}</p>
								<p>{user.email}</p>
							</div>
							<div className={styles.total}>+{formatPrice(user.total)}</div>
						</div>
					))
				) : (
					<div>{`У цього магазину немає покупців :(`}</div>
				)}
			</CardContent>
		</Card>
	);
}
