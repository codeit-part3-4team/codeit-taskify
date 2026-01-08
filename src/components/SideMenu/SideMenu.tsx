'use client';

import { useState } from 'react';
import Logo from '@/components/Logo/Logo';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import DashboardItem from '@/components/SideMenu/DashboardItem/DashboardItem';
import styles from '@/components/SideMenu/SideMenu.module.css';
import Image from 'next/image';

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

export default function SideMenu({
  dashboards,
  onDashboardClick,
  onAddDashboardClick,
  selectedDashboardId,
}: SideMenuProps) {
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dashboards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDashboards = dashboards.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const showPagination = dashboards.length > ITEMS_PER_PAGE;

  return (
    <aside className={styles.sideMenu}>
      <div className={styles.logoArea}>
        <Logo />
      </div>

      <div className={styles.dashboardSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>Dash Boards</h2>
          <button
            type="button"
            className={styles.addButton}
            onClick={onAddDashboardClick}
            aria-label="새 대시보드 추가"
          >
            <Image
              src="/icons/ic-invite.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>

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
