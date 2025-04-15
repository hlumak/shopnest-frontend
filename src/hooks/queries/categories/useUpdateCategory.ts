import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useMemo} from 'react';
import toast from 'react-hot-toast';

import {categoryService} from '@/services/category.service';

import {ICategoryInput} from '@/shared/types/category.interface';

export const useUpdateCategory = () => {
	const params = useParams<{ categoryId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.update(params.categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категорія оновлена')
		},
		onError() {
			toast.error('Помилка при оновленні категорії')
		}
	})

	return useMemo(
		() => ({ updateCategory, isLoadingUpdate }),
		[updateCategory, isLoadingUpdate]
	)
}
