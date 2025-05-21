import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select';
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
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct';
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct';
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct';

import { ICategory } from '@/shared/types/category.interface';
import { IColor } from '@/shared/types/color.interface';
import { IProduct, IProductInput } from '@/shared/types/product.interface';

import styles from '../Store.module.scss';

interface ProductFormProps {
	product?: IProduct;
	categories: ICategory[];
	colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct();
	const { updateProduct, isLoadingUpdate } = useUpdateProduct();
	const { deleteProduct, isLoadingDelete } = useDeleteProduct();

	const title = product ? 'Змінити дані' : 'Створити товар';
	const description = product
		? 'Змінити дані про товар'
		: 'Додати новий товар в магазин';
	const action = product ? 'Зберегти' : 'Створити';

	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			categoryId: product?.category.id || '',
			colorId: product?.color.id || ''
		}
	});

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(String(data.price).replace(',', '.'));
		if (product) updateProduct(data);
		else createProduct(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{product && (
					<ConfirmModal handleClick={() => deleteProduct()}>
						<Button size="icon" variant="primary" disabled={isLoadingDelete}>
							<Trash className="size-4" />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="images"
						rules={{
							required: 'Завантажте хоча б одну картинку'
						}}
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel>Картинки</FormLabel>
								<FormControl>
									<ImageUpload
										isDisabled={isLoadingCreate || isLoadingUpdate}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
											placeholder="Назва товару"
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
							name="price"
							rules={{
								required: "Ціна обов'зякова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ціна</FormLabel>
									<FormControl>
										<Input
											placeholder="Ціна товару"
											disabled={isLoadingCreate || isLoadingUpdate}
											inputMode="decimal"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							rules={{
								required: "Категорія обов'зякова"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Категорія</FormLabel>
									<Select
										disabled={isLoadingCreate || isLoadingUpdate}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Категорія товару" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{categories.map(category => (
													<SelectItem value={category.id} key={category.id}>
														{category.title}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name="colorId"
							rules={{
								required: "Колір обов'зяковий"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Колір</FormLabel>
									<Select
										disabled={isLoadingCreate || isLoadingUpdate}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Колір товару" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{colors.map(color => (
													<SelectItem value={color.id} key={color.id}>
														{color.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						rules={{
							required: "Опис обов'язковий"
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Опис</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Опис товару"
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
