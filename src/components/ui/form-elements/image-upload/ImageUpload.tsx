import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/clsx';

import { Button } from '../../Button';

import styles from './ImageUpload.module.scss';
import { useUpload } from './useUpload';

interface ImageUploadProps {
	isDisabled: boolean;
	onChange: (value: string[]) => void;
	value: string[];
	onMarkRemove?: (url: string) => void;
	onImagesUploaded?: (urls: string[]) => void;
	uploadedImages?: string[];
}

function SortableImage({
	url,
	onRemove,
	isDisabled,
	isUploading
}: {
	url: string;
	onRemove: (url: string) => void;
	isDisabled: boolean;
	isUploading: boolean;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
		over,
		active
	} = useSortable({ id: url });

	const isDragOver = over?.id === url && active?.id !== url;

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				zIndex: isDragging ? 10 : undefined,
				opacity: isDragging ? 0.5 : 1
			}}
			{...attributes}
			{...listeners}
			className={cn(
				styles.image_wrapper,
				isDragging && styles.dragging,
				isDragOver && styles['drag-over']
			)}
		>
			<Image src={url} alt="Картинка" fill sizes="200px" />
			<button
				type="button"
				className={styles.remove_btn}
				disabled={isDisabled || isUploading}
				onClick={() => onRemove(url)}
			>
				<X className="size-4" />
			</button>
		</div>
	);
}

export function ImageUpload({
	isDisabled,
	onChange,
	value,
	onMarkRemove,
	onImagesUploaded
}: ImageUploadProps) {
	const [images, setImages] = useState<string[]>(value);

	useEffect(() => {
		setImages(value);
	}, [value]);

	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload((newImages) => {
			setImages(newImages);
			onChange(newImages);
		}, () => images, onImagesUploaded);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 }
		})
	);

	const handleRemove = (url: string) => {
		const newImages = images.filter(img => img !== url);
		setImages(newImages);
		onChange(newImages);
		if (onMarkRemove) onMarkRemove(url);
	};

	function handleDragEnd(event: any) {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = images.findIndex(img => img === active.id);
			const newIndex = images.findIndex(img => img === over.id);
			const newImages = arrayMove(images, oldIndex, newIndex);
			setImages(newImages);
			onChange(newImages);
		}
	}

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={images} strategy={verticalListSortingStrategy}>
					<div className={styles.image_container}>
						{images.map(url => (
							<SortableImage
								key={url}
								url={url}
								onRemove={handleRemove}
								isDisabled={isDisabled}
								isUploading={isUploading}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
			<Button
				type="button"
				disabled={isDisabled || isUploading}
				variant="secondary"
				onClick={handleButtonClick}
				className={cn(styles.upload, {
					'mt-4': images.length
				})}
			>
				<ImagePlus />
				Завантажити зображення
			</Button>
			<input
				type="file"
				accept="image/webp"
				multiple
				className="hidden"
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	);
}
