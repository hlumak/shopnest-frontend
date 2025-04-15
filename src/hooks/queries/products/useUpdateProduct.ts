import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useMemo} from 'react';
import toast from 'react-hot-toast';

import {productService} from '@/services/product.service';

import {IProductInput} from '@/shared/types/product.interface';

export const useUpdateProduct = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IProductInput) =>
			productService.update(params.productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Товар оновлено')
		},
		onError() {
			toast.error('Помилка при оновленні товару')
		}
	})

	return useMemo(
		() => ({ updateProduct, isLoadingUpdate }),
		[updateProduct, isLoadingUpdate]
	)
}
