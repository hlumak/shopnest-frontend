import { Trash } from 'lucide-react';
import { useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
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

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor';
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor';
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor';

import { IColor, IColorInput } from '@/shared/types/color.interface';

import styles from '../Store.module.scss';

interface ColorFormProps {
	color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor();
	const { updateColor, isLoadingUpdate } = useUpdateColor();
	const { deleteColor, isLoadingDelete } = useDeleteColor();

	const title = color ? 'Змінити дані' : 'Створити колір';
	const description = color
		? 'Змінити дані про колір'
		: 'Додати новий колір до магазину';
	const action = color ? 'Зберегти' : 'Створити';

	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name || '',
			value: color?.value || '#000000'
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

		if (color) updateColor(formattedData);
		else createColor(formattedData);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
						<Button size="icon" variant="primary" disabled={isLoadingDelete}>
							<Trash className="size-4" />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
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
											disabled={isLoadingCreate || isLoadingUpdate}
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
									<div className="flex flex-col gap-4">
										<div className="flex gap-4 items-center">
											<div
												className="w-10 h-10 rounded-md border shadow-sm"
												style={{ backgroundColor: field.value }}
											/>
											<FormControl>
												<Input
													placeholder="Значення кольору (HEX)"
													disabled={isLoadingCreate || isLoadingUpdate}
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
					</div>
					<Button
						variant="primary"
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
}
