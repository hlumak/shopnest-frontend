import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils/clsx';

import { Button } from '../../Button';

import styles from './ImageUpload.module.scss';
import { useUpload } from './useUpload';

interface ImageUploadProps {
	isDisabled: boolean;
	onChange: (value: string[]) => void;
	value: string[];
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange, value);

	const handleRemove = (url: string) => {
		onChange(value.filter(img => img !== url));
	};

	return (
		<div>
			<div className={styles.image_container}>
				{value.map(url => (
					<div key={url} className={styles.image_wrapper}>
						<Image src={url} alt="Картинка" fill />
						<button
							type="button"
							className={styles.remove_btn}
							disabled={isDisabled || isUploading}
							onClick={() => handleRemove(url)}
						>
							<X className="size-4" />
						</button>
					</div>
				))}
			</div>
			<Button
				type="button"
				disabled={isDisabled || isUploading}
				variant="secondary"
				onClick={handleButtonClick}
				className={cn(styles.upload, {
					'mt-4': value.length
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
