import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { colorService } from '@/services/color.service';

import { IColorInput } from '@/shared/types/color.interface';

export const useCreateColorModal = () => {
	const params = useParams<{ storeId: string }>();

	const queryClient = useQueryClient();

	const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create color modal'],
		mutationFn: (data: IColorInput) =>
			colorService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get colors for store dashboard']
			});
			queryClient.invalidateQueries({
				queryKey: ['get colors']
			});
			toast.success('Колір створено');
		},
		onError() {
			toast.error('Помилка при створенні кольору');
		}
	});

	return useMemo(
		() => ({
			createColor,
			isLoadingCreate
		}),
		[createColor, isLoadingCreate]
	);
};
