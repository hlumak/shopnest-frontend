import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from '../hero/Hero.module.scss'

export const metadata: Metadata = {
	title: 'Дякуємо за покупку',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>Дякуємо за покупку</h1>
			<p className={styles.description}>
				Дякуємо за ваше замовлення! Ми цінуємо вашу довіру і зробимо все можливе, щоб доставити ваше замовлення якнайшвидше.
			</p>
			<Link href={PUBLIC_URL.home()}>
				<Button variant='primary'>
					На головну
					<ArrowRight />
				</Button>
			</Link>
		</div>
	)
}
