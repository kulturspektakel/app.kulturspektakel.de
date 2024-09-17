import styles from './Center.module.css';

export default function Center({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}) {
  return (
    <div
      className={`${styles.center} ${align === 'center' ? styles.alignCenter : ''}`}
    >
      {children}
    </div>
  );
}
