'use client';

import '@/components/design.css';
import styles from './DeleteDashboardButton.module.css';

type DeleteDashboardButtonProps = {
  /** 버튼 크기 (desktop: 320x62, tablet: 320x62, mobile: 284x52) */
  size?: 'desktop' | 'tablet' | 'mobile';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Delete Dashboard Button 컴포넌트
 *
 * @description 대시보드를 삭제하는 버튼입니다. desktop/tablet/mobile 반응형을 지원합니다.
 *
 * @example
 * ```tsx
 * // Desktop
 * <DeleteDashboardButton size="desktop" onClick={handleDelete} />
 *
 * // Tablet
 * <DeleteDashboardButton size="tablet" onClick={handleDelete} />
 *
 * // Mobile
 * <DeleteDashboardButton size="mobile" onClick={handleDelete} />
 *
 * // 클릭 이벤트
 * <DeleteDashboardButton
 *   size="desktop"
 *   onClick={() => console.log('대시보드 삭제')}
 * />
 * ```
 */
export default function DeleteDashboardButton({
  size = 'desktop',
  className = '',
  ...props
}: DeleteDashboardButtonProps) {
  const sizeClass = styles[size];

  return (
    <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
      대시보드 삭제하기
    </button>
  );
}
