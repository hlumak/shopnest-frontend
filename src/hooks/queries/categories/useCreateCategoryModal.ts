import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { categoryService } from '@/services/category.service';

import { ICategoryInput } from '@/shared/types/category.interface';

export const useCreateCategoryModal = () => {
	const params = useParams<{ storeId: string }>();
	const queryClient = useQueryClient();

	const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create category modal'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			});
			queryClient.invalidateQueries({
				queryKey: ['get categories']
			});
			toast.success('Категорія створена');
		},
		onError() {
			toast.error('Помилка при створенні категорії');
		}
	});

	return useMemo(
		() => ({
			createCategory,
			isLoadingCreate
		}),
		[createCategory, isLoadingCreate]
	);
};
