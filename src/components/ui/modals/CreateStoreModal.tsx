import { type PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore';

import { IStoreCreate } from '@/shared/types/store.interface';

import { Button } from '../Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../Dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../form-elements/Form';
import { Input } from '../form-elements/Input';

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false);

	const { createStore, isLoadingCreate } = useCreateStore();

	const form = useForm<IStoreCreate>({
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<IStoreCreate> = data => {
		createStore(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="w-full">{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Створення магазину</DialogTitle>
					<DialogDescription>
						Для створення магазину необхідно вказати назву.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							rules={{
								required: "Назва обов'зякова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input
											placeholder="Назва магазину"
											disabled={isLoadingCreate}
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end">
							<Button variant="primary" disabled={isLoadingCreate}>
								Створити
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
