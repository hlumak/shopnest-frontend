'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card';
import { Form } from '@/components/ui/form-elements/Form';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './Auth.module.scss';
import { AuthFields } from './AuthFields';
import { Social } from './Social';
import { useAuthForm } from './useAuthForm';

export function Auth() {
	const [isReg, setIsReg] = useState(false);

	const { onSubmit, form, isPending } = useAuthForm(isReg);

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src="/images/auth.svg"
					alt="ShopNest auth"
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>
							{isReg ? 'Створити акаунт' : 'Увійти в акаунт'}
						</CardTitle>
						<CardDescription>
							Увійдіть або створіть обліковий запис, щоб здійснювати покупки!
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields form={form} isPending={isPending} isReg={isReg} />

								<Button disabled={isPending}>Продовжити</Button>
							</form>
						</Form>
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Вже є акаунт?' : 'Ще немає акаунта?'}
						<button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Увійти' : 'Створити'}
						</button>
					</CardFooter>
				</Card>
				<div className={styles.returnHome}>
					<Link href={PUBLIC_URL.home()}>
						<Button variant="ghost" type="button">
							<ArrowLeft size={16} className="mr-2" />
							Повернутися на головну
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
