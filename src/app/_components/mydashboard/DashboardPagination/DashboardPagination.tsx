'use client';

import styles from './DashboardPagination.module.css';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';

type DashboardPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * @component DashboardPagination
 * @description 대시보드 페이지네이션 (6개 기준)
 * 
 * - "N페이지 중 M" 텍스트
 * - 이전/다음 버튼 그룹
 */
export default function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DashboardPaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrev = () => {
    if (canGoPrev) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.pageInfo}>
        {totalPages}페이지 중 {currentPage}
      </span>

      <PaginationButton
        size="large"
        prevDisabled={!canGoPrev}
        nextDisabled={!canGoNext}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
    </div>
  );
}