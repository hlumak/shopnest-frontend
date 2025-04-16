import { ColumnDef } from '@tanstack/react-table';
import {
	ArrowUpDown,
	ExternalLink,
	MoreHorizontal,
	Pencil
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';

import { PUBLIC_URL, STORE_URL } from '@/config/url.config';

export interface IProductColumn {
	id: string;
	title: string;
	price: string;
	category: string;
	color: string;
	storeId: string;
}

export const productColumns: ColumnDef<IProductColumn>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Назва
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Ціна
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Категорія
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: 'color',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Колір
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-x-3">
				{row.original.color}
				<div
					className="size-5 rounded-full border"
					style={{
						backgroundColor: row.original.color
					}}
				/>
			</div>
		)
	},
	{
		accessorKey: 'actions',
		header: 'Дії',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="size-8 p-0">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Дії</DropdownMenuLabel>
					<Link href={PUBLIC_URL.product(row.original.id)} target="_blank">
						<DropdownMenuItem>
							<ExternalLink className="size-4 mr-2" />
							Сторінка з товаром
						</DropdownMenuItem>
					</Link>
					<Link
						href={STORE_URL.productEdit(row.original.storeId, row.original.id)}
					>
						<DropdownMenuItem>
							<Pencil className="size-4 mr-2" />
							Змінити
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
];
