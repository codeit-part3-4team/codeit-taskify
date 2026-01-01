'use client';

import '@/components/design.css';
import styles from './AddColumnButton.module.css';
import Image from 'next/image';

type AddColumnButtonProps = {
  /** 버튼 크기 (desktop: 354x70, tablet: 544x70, mobile: 284x66) */
  size?: 'desktop' | 'tablet' | 'mobile';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Add Column Button 컴포넌트
 *
 * @description 새로운 칼럼을 추가하는 버튼입니다. desktop/tablet/mobile 반응형을 지원합니다.
 *
 * @example
 * ```tsx
 * // Desktop
 * <AddColumnButton size="desktop" onClick={handleAddColumn} />
 *
 * // Tablet
 * <AddColumnButton size="tablet" onClick={handleAddColumn} />
 *
 * // Mobile
 * <AddColumnButton size="mobile" onClick={handleAddColumn} />
 *
 * // 클릭 이벤트
 * <AddColumnButton
 *   size="desktop"
 *   onClick={() => console.log('칼럼 추가')}
 * />
 * ```
 */
export default function AddColumnButton({
  size = 'desktop',
  className = '',
  ...props
}: AddColumnButtonProps) {
  const sizeClass = styles[size];
  const chipSize = size === 'mobile' ? 20 : 22;
  const chipSrc = size === 'mobile' ? '/chip_20px.png' : '/chip_22px.png';

  return (
    <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
      <span className={styles.text}>새로운 칼럼 추가하기</span>
      <Image src={chipSrc} alt="추가" width={chipSize} height={chipSize} className={styles.chip} />
    </button>
  );
}
