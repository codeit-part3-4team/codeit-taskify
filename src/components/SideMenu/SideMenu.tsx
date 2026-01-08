'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo/Logo';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import DashboardItem from '@/components/SideMenu/DashboardItem/DashboardItem';
import styles from '@/components/SideMenu/SideMenu.module.css';
import Image from 'next/image';


import { getDashboards, Dashboard } from '@/app/dashboard-setting/api/dashboardsetting';


interface SideMenuProps {
  /** 대시보드 클릭 이벤트 */
  onDashboardClick?: (id: number) => void;
  /** 대시보드 추가 버튼 클릭 이벤트 */
  onAddDashboardClick?: () => void;
  /** 현재 선택된 대시보드 ID */
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
  onDashboardClick,
  onAddDashboardClick,
  selectedDashboardId,
}: SideMenuProps) {
  const ITEMS_PER_PAGE = 15;

  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =====================
     대시보드 API 호출
  ===================== */
  useEffect(() => {
    async function fetchDashboards() {
      try {
        setLoading(true);
        const data = await getDashboards();
        setDashboards(data.dashboards);
      } catch (e) {
        setError(e instanceof Error ? e.message : '에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboards();
  }, []);

  /* =====================
     페이지네이션 계산
  ===================== */
  const totalPages = Math.ceil(dashboards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDashboards = dashboards.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const showPagination = dashboards.length > ITEMS_PER_PAGE;

  /* =====================
     렌더링
  ===================== */
  return (
    <aside className={styles.sideMenu}>
      {/* 상단: Logo */}
      <div className={styles.logoArea}>
        <Logo />
      </div>

      {/* 중단: 대시보드 목록 */}
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

        {/* 로딩 / 에러 처리 */}
        {loading && <p>불러오는 중...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* 대시보드 리스트 */}
        {!loading && !error && (
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
        )}
      </div>

      {/* 하단: Pagination */}
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
