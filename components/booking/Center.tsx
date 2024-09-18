import styles from './Center.module.css';
import {Property} from 'csstype';

export default function Center({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: Property.AlignItems;
}) {
  return (
    <div className={styles.center} style={{alignItems: align ?? 'flex-start'}}>
      {children}
    </div>
  );
}
