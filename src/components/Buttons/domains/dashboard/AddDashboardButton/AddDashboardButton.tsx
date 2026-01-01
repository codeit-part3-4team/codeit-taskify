'use client';

import '@/components/design.css';
import styles from './AddDashboardButton.module.css';
import Image from 'next/image';

type AddDashboardButtonProps = {
  /** 버튼 크기 (desktop: 332x70, tablet: 247x68, mobile: 260x58) */
  size?: 'desktop' | 'tablet' | 'mobile';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Add Dashboard Button 컴포넌트
 *
 * @description 새로운 대시보드를 추가하는 버튼입니다. desktop/tablet/mobile 반응형을 지원합니다.
 *
 * @example
 * ```tsx
 * // Desktop
 * <AddDashboardButton size="desktop" onClick={handleAddDashboard} />
 *
 * // Tablet
 * <AddDashboardButton size="tablet" onClick={handleAddDashboard} />
 *
 * // Mobile
 * <AddDashboardButton size="mobile" onClick={handleAddDashboard} />
 *
 * // 클릭 이벤트
 * <AddDashboardButton
 *   size="desktop"
 *   onClick={() => console.log('대시보드 추가')}
 * />
 * ```
 */
export default function AddDashboardButton({
  size = 'desktop',
  className = '',
  ...props
}: AddDashboardButtonProps) {
  const sizeClass = styles[size];
  const chipSize = size === 'mobile' ? 20 : 22;
  const chipSrc = size === 'mobile' ? '/chip_20px.png' : '/chip_22px.png';

  return (
    <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
      <span className={styles.text}>새로운 대시보드</span>
      <Image src={chipSrc} alt="추가" width={chipSize} height={chipSize} className={styles.chip} />
    </button>
  );
}
