'use client';

import '@/components/design.css';
import styles from './DashboardButton.module.css';
import IcArrowRight from '@/assets/icons/IcArrowRight';
import IcCrown from '@/assets/icons/IcCrown';

type DashboardButtonProps = {
  /** 버튼 크기 */
  size?: 'desktop' | 'tablet' | 'mobile';
  /** 점 색상 */
  color?: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
  /** 왕관 표시 여부 */
  showCrown?: boolean;
  /** 대시보드 이름 */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Dashboard Button 컴포넌트
 *
 * @description 대시보드 목록에서 사용하는 버튼입니다. 색상 점, 텍스트, 왕관, 화살표로 구성됩니다.
 *
 * @example
 * ```tsx
 * // Desktop with Crown
 * <DashboardButton
 *   size="desktop"
 *   color="green"
 *   showCrown={true}
 *   onClick={() => console.log('clicked')}
 * >
 *   비브리지
 * </DashboardButton>
 *
 * // Tablet without Crown
 * <DashboardButton
 *   size="tablet"
 *   color="purple"
 *   showCrown={false}
 * >
 *   프로젝트 A
 * </DashboardButton>
 *
 * // Mobile with different color
 * <DashboardButton
 *   size="mobile"
 *   color="orange"
 *   showCrown={true}
 * >
 *   팀 대시보드
 * </DashboardButton>
 * ```
 */
export default function DashboardButton({
  size = 'desktop',
  color = 'green',
  showCrown = false,
  children,
  className = '',
  ...props
}: DashboardButtonProps) {
  const sizeClass = styles[size];
  const colorClass = styles[`dot-${color}`];

  // 왕관 크기
  const crownHeight = size === 'desktop' ? 16 : size === 'tablet' ? 14 : 12;

  return (
    <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
      <div className={styles.content}>
        {/* 색상 점 */}
        <span className={`${styles.dot} ${colorClass}`} />

        {/* 텍스트 */}
        <span className={styles.text}>{children}</span>

        {/* 왕관 (선택적) */}
        {showCrown && <IcCrown height={crownHeight} className={styles.crown} />}
      </div>

      {/* 화살표 */}
      <IcArrowRight width={18} height={18} className={styles.arrow} />
    </button>
  );
}
