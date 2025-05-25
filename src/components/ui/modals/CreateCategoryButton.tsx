'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog';
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

import { useCreateCategoryModal } from '@/hooks/queries/categories/useCreateCategoryModal';

import { ICategoryInput } from '@/shared/types/category.interface';

interface CreateCategoryButtonProps {
	onSuccess?: () => void;
}

export function CreateCategoryButton({ onSuccess }: CreateCategoryButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { createCategory, isLoadingCreate } = useCreateCategoryModal();

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		defaultValues: {
			title: '',
			description: ''
		}
	});

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		createCategory(data);
		setIsOpen(false);
		form.reset();
		onSuccess?.();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground border-b">
					<Plus className="mr-2 h-4 w-4" />
					Створити категорію
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Створити категорію</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
											placeholder="Назва категорії"
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
							name="description"
							rules={{
								required: "Опис обов'язковий"
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Опис</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Опис категорії"
											disabled={isLoadingCreate}
											{...field}
										/>
									</FormControl>
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
