'use client';

/**
 * Pagination Button 컴포넌트
 * 
 * @description 페이지네이션에서 사용하는 이전/다음 버튼 그룹입니다. 2개의 화살표 버튼이 붙어있는 형태입니다.
 * 
 * @example
 * ```tsx
 * // Large Active (기본)
 * <PaginationButton 
 *   size="large" 
 *   onPrevClick={() => console.log('이전')} 
 *   onNextClick={() => console.log('다음')}
 * />
 * 
 * // Large with Disabled
 * <PaginationButton 
 *   size="large" 
 *   prevDisabled={true}
 *   onPrevClick={() => console.log('이전')} 
 *   onNextClick={() => console.log('다음')}
 * />
 * 
 * // Small Active
 * <PaginationButton 
 *   size="small"
 *   onPrevClick={() => console.log('이전')} 
 *   onNextClick={() => console.log('다음')}
 * />
 * 
 * // Both Disabled (Inactive)
 * <PaginationButton 
 *   size="large"
 *   prevDisabled={true}
 *   nextDisabled={true}
 *   onPrevClick={() => console.log('이전')} 
 *   onNextClick={() => console.log('다음')}
 * />
 * ```
 */

import '@/components/design.css';
import styles from './PaginationButton.module.css';
import IcArrowRight from '@/assets/icons/IcArrowRight';

type PaginationButtonProps = {
  /** 버튼 크기 (large: 40px, small: 36px) */
  size?: 'large' | 'small';
  /** 이전 버튼 비활성화 */
  prevDisabled?: boolean;
  /** 다음 버튼 비활성화 */
  nextDisabled?: boolean;
  /** 이전 버튼 클릭 이벤트 */
  onPrevClick?: () => void;
  /** 다음 버튼 클릭 이벤트 */
  onNextClick?: () => void;
  /** 추가 className */
  className?: string;
};

export default function PaginationButton({
  size = 'large',
  prevDisabled = false,
  nextDisabled = false,
  onPrevClick,
  onNextClick,
  className = '',
}: PaginationButtonProps) {
  const sizeClass = size === 'large' ? styles.large : styles.small;

  return (
    <div className={`${styles.paginationGroup} ${sizeClass} ${className}`}>
      {/* 이전 버튼 */}
      <button
        className={`${styles.button} ${styles.prev} ${prevDisabled ? styles.inactive : styles.active}`}
        onClick={onPrevClick}
        disabled={prevDisabled}
        aria-label="이전 페이지"
      >
        <IcArrowRight 
          width={16} 
          height={16} 
          style={{ transform: 'rotate(180deg)' }}
        />
      </button>

      {/* 다음 버튼 */}
      <button
        className={`${styles.button} ${styles.next} ${nextDisabled ? styles.inactive : styles.active}`}
        onClick={onNextClick}
        disabled={nextDisabled}
        aria-label="다음 페이지"
      >
        <IcArrowRight width={16} height={16} />
      </button>
    </div>
  );
}

