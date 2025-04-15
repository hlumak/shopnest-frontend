import styles from './Footer.module.scss';

export function Footer() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.footer}>
				<a href="https://t.me/v_hlumak">hlumak</a> &copy;{' '}
				{new Date().getFullYear()} Усі права захищені
			</div>
		</div>
	);
}
