'use client';

import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form';
import { Input } from '@/components/ui/form-elements/Input';

import { useCreateColorModal } from '@/hooks/queries/colors/useCreateColorModal';

import { IColorInput } from '@/shared/types/color.interface';

interface CreateColorButtonProps {
	onSuccess?: () => void;
}

export function CreateColorButton({ onSuccess }: CreateColorButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { createColor, isLoadingCreate } = useCreateColorModal();

	const form = useForm<IColorInput>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			value: '#000000'
		}
	});

	useEffect(() => {
		const currentValue = form.getValues('value');
		if (currentValue && !currentValue.startsWith('#')) {
			form.setValue('value', `#${currentValue}`);
		}
	}, [form]);

	const onSubmit: SubmitHandler<IColorInput> = data => {
		const formattedData = {
			...data,
			value: data.value.startsWith('#') ? data.value : `#${data.value}`
		};

		createColor(formattedData);
		setIsOpen(false);
		form.reset({ name: '', value: '#000000' });
		onSuccess?.();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground border-b">
					<Plus className="mr-2 h-4 w-4" />
					Створити колір
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Створити колір</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							rules={{
								required: "Назва обов'язкова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва</FormLabel>
									<FormControl>
										<Input
											placeholder="Назва кольору"
											disabled={isLoadingCreate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="value"
							rules={{
								required: "Значення обов'язкове"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Значення</FormLabel>
									<div className="space-y-4">
										<div className="flex gap-4 items-center">
											<div
												className="w-10 h-10 rounded-md border shadow-sm"
												style={{ backgroundColor: field.value }}
											/>
											<FormControl>
												<Input
													placeholder="Значення кольору (HEX)"
													disabled={isLoadingCreate}
													{...field}
													onChange={e => {
														let value = e.target.value;

														if (
															value &&
															!value.startsWith('#') &&
															value !== ''
														) {
															if (!value.includes('#')) {
																value = `#${value}`;
															} else {
																const hashIndex = value.indexOf('#');
																if (hashIndex > 0) {
																	value = `#${value.substring(hashIndex + 1)}`;
																}
															}
														}

														field.onChange(value);
													}}
												/>
											</FormControl>
										</div>
										<HexColorPicker
											color={field.value}
											onChange={field.onChange}
											className="w-full max-w-[320px]"
										/>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsOpen(false)}
								disabled={isLoadingCreate}
							>
								Скасувати
							</Button>
							<Button
								type="submit"
								variant="primary"
								disabled={isLoadingCreate}
							>
								Створити
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
