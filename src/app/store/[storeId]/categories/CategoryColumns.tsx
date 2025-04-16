'use client';

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

export interface ICategoryColumn {
	id: string;
	createdAt: string;
	title: string;
	storeId: string;
}

export const categoryColumns: ColumnDef<ICategoryColumn>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Назва
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Дата створення
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: 'actions',
		header: 'Дії',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Дії</DropdownMenuLabel>
					<Link href={PUBLIC_URL.category(row.original.id)} target="_blank">
						<DropdownMenuItem>
							<ExternalLink className="size-4 mr-2" />
							Сторінка з категорією
						</DropdownMenuItem>
					</Link>
					<Link
						href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
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
