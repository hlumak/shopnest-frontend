import CountUp from 'react-countup'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

import { IMainStatistics } from '@/shared/types/statistics.interface'

import { DecimalUtils } from '@/utils/decimal/decimal-utils'
import { formatPrice } from '@/utils/string/format-price'

import styles from './MainStatistics.module.scss'
import { getIcon } from './statisctics.util'

interface MainStatisticsItemProps {
	item: IMainStatistics
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
	const Icon = getIcon(item.id)
	const numericValue = DecimalUtils.toNumber(item.value)

	return (
		<Card className={styles.card}>
			<CardHeader className={styles.header}>
				<CardTitle>{item.name}</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent className={styles.content}>
				<h2>
					{item.id !== 1 ? (
						<CountUp end={numericValue} />
					) : (
						<CountUp end={numericValue} formattingFn={formatPrice} />
					)}
				</h2>
			</CardContent>
		</Card>
	)
}
