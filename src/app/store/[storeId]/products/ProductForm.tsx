import { Trash } from 'lucide-react';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
import { CreateCategoryButton } from '@/components/ui/modals/CreateCategoryButton';
import { CreateColorButton } from '@/components/ui/modals/CreateColorButton';

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories';
import { useGetColors } from '@/hooks/queries/colors/useGetColors';
import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct';
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct';
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct';

import { fileService } from '@/services/file.service';

import { ICategory } from '@/shared/types/category.interface';
import { IColor } from '@/shared/types/color.interface';
import { IProduct, IProductInput } from '@/shared/types/product.interface';

import { DecimalUtils } from '@/utils/decimal/decimal-utils';

import styles from '../Store.module.scss';

interface ProductFormProps {
	product?: IProduct;
	categories: ICategory[];
	colors: IColor[];
}

export function ProductForm({
	product,
	categories: initialCategories,
	colors: initialColors
}: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct();
	const { updateProduct, isLoadingUpdate } = useUpdateProduct();
	const { deleteProduct, isLoadingDelete } = useDeleteProduct();
	const { categories } = useGetCategories();
	const { colors } = useGetColors();

	const categoriesList = categories || initialCategories;
	const colorsList = colors || initialColors;

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
			price: product?.price || '',
			categoryId: product?.category.id || '',
			colorId: product?.color.id || ''
		}
	});

	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [removedImages, setRemovedImages] = useState<string[]>([]);
	const isSaved = useRef(false);

	const handleMarkRemove = (url: string) => {
		setRemovedImages(prev => [...prev, url]);
		setUploadedImages(prev => prev.filter(img => img !== url));
	};

	const handleImagesUploaded = (urls: string[]) => {
		setUploadedImages(prev => [...prev, ...urls]);
	};

	const onSubmit: SubmitHandler<IProductInput> = async data => {
		if (!DecimalUtils.isValid(String(data.price))) {
			toast.error('Невірний формат ціни');
			return;
		}

		data.price = DecimalUtils.toString(data.price);

		for (const url of removedImages) {
			try {
				const fileName = url.split('/').pop();

				if (fileName) {
					await fileService.deleteFile('products', fileName);
				}
			} catch (e) {
				console.error(e);
				toast.error('Помилка при видаленні картинки');
			}
		}
		setRemovedImages([]);
		isSaved.current = true;
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
										onMarkRemove={handleMarkRemove}
										onImagesUploaded={handleImagesUploaded}
										uploadedImages={uploadedImages}
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
								required: "Ціна обов'язкова",
								validate: value => {
									const stringValue = String(value);
									if (!DecimalUtils.isValid(stringValue)) {
										return 'Введіть коректну ціну (тільки числа)';
									}
									const numericValue = DecimalUtils.toNumber(stringValue);
									if (numericValue <= 0) {
										return 'Ціна повинна бути більше 0';
									}
									return true;
								}
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ціна</FormLabel>
									<FormControl>
										<Input
											placeholder="Ціна товару (наприклад: 100.50)"
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
												<CreateCategoryButton />
												{categoriesList.map(category => (
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
												<CreateColorButton />
												{colorsList.map(color => (
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
