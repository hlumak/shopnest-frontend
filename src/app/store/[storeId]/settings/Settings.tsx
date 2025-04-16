'use client';

import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Textarea } from '@/components/ui/Textarea';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form';
import { Input } from '@/components/ui/form-elements/Input';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore';
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore';

import { IStoreEdit } from '@/shared/types/store.interface';

import styles from '../Store.module.scss';

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore();
	const { deleteStore, isLoadingDelete } = useDeleteStore();

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	});

	const onSubmit: SubmitHandler<IStoreEdit> = data => {
		updateStore(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
					title="Налаштування"
					description="Керування налаштуваннями магазину"
				/>
				<ConfirmModal handleClick={() => deleteStore()}>
					<Button size="icon" variant="primary" disabled={isLoadingDelete}>
						<Trash className="size-4" />
					</Button>
				</ConfirmModal>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name="title"
							rules={{
								required: "Назва обов'язкова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input
											placeholder="Назва магазину"
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Опис</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Опис магазину"
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant="primary" disabled={isLoadingUpdate}>
						Зберегти
					</Button>
				</form>
			</Form>
		</div>
	);
}
