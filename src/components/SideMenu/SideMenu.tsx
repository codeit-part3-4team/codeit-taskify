'use client';

import { useState } from 'react';
import Logo from '@/components/Logo/Logo';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import DashboardItem from '@/components/SideMenu/DashboardItem/DashboardItem';
import styles from '@/components/SideMenu/SideMenu.module.css';
import { Dashboard } from '@/types/dashboard';

interface SideMenuProps {
  /** 전체 대시보드 목록 */
  dashboards: Dashboard[];
  /** 대시보드 클릭 이벤트 */
  onDashboardClick?: (id: number) => void;
  /** 대시보드 추가 버튼 클릭 이벤트 */
  onAddDashboardClick?: () => void;
  /** 현재 선택된 대시보드 ID (선택 상태 표시용) */
  selectedDashboardId?: number;
}

/**
 * @component SideMenu
 * @description 대시보드 목록을 표시하는 사이드 메뉴입니다.
 * 
 * - 상단: Logo
 * - 중단: 대시보드 목록 (15개씩 페이지네이션)
 * - 하단: Pagination 버튼 (16개 이상일 때만 표시)
 * 
 * @example
 * ```tsx
 * <SideMenu
 *   dashboards={dashboards}
 *   onDashboardClick={(id) => router.push(`/dashboard/${id}`)}
 *   onAddDashboardClick={() => setModalOpen(true)}
 *   selectedDashboardId={currentDashboardId}
 * />
 * ```
 */
export default function SideMenu({
  dashboards,
  onDashboardClick,
  onAddDashboardClick,
  selectedDashboardId,
}: SideMenuProps) {
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산
  const totalPages = Math.ceil(dashboards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDashboards = dashboards.slice(startIndex, endIndex);

  // 페이지 변경
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination 표시 여부 (16개 이상일 때만)
  const showPagination = dashboards.length > ITEMS_PER_PAGE;

  return (
    <aside className={styles.sideMenu}>
      {/* 상단: Logo */}
      <div className={styles.logoArea}>
        <Logo />
      </div>

      {/* 중단: 대시보드 목록 */}
      <div className={styles.dashboardSection}>
        {/* Dash Boards 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>Dash Boards</h2>
          <button
            type="button"
            className={styles.addButton}
            onClick={onAddDashboardClick}
            aria-label="새 대시보드 추가"
          >
            <img src="/icons/ic-invite.svg" alt="" aria-hidden="true" />
          </button>
        </div>

        {/* 대시보드 리스트 */}
        <ul className={styles.dashboardList}>
          {currentDashboards.map((dashboard) => (
            <DashboardItem
              key={dashboard.id}
              id={dashboard.id}
              title={dashboard.title}
              color={dashboard.color}
              createdByMe={dashboard.createdByMe}
              isSelected={selectedDashboardId === dashboard.id}
              onClick={onDashboardClick}
            />
          ))}
        </ul>
      </div>

      {/* 하단: Pagination (16개 이상일 때만) */}
      {showPagination && (
        <div className={styles.paginationArea}>
          <PaginationButton
            size="small"
            prevDisabled={currentPage === 1}
            nextDisabled={currentPage === totalPages}
            onPrevClick={handlePrevPage}
            onNextClick={handleNextPage}
          />
        </div>
      )}
    </aside>
  );
}