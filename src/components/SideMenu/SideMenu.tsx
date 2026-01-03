import styles from '@/components/SideMenu/SideMenu.module.css';


type DashboardDTO = {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
  createdAt: string;
  updatedAt: string;
};

type SideMenuProps = {
  dashboards: DashboardDTO[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  currentDashboardId?: number;
  onDashboardClick?: (dashboardId: number) => void;
};

/**
 * 대시보드 목록을 표시하는 사이드 메뉴 컴포넌트
 * - 대시보드 리스트 표시
 * - 내가 만든 대시보드는 왕관(👑) 아이콘 표시
 * - 페이지네이션 (15개씩 표시)
 */
export function SideMenu({
  dashboards,
  totalCount,
  currentPage,
  onPageChange,
  currentDashboardId,
  onDashboardClick,
}: SideMenuProps) {
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handlePrevPage = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleDashboardClick = (dashboardId: number) => {
    if (onDashboardClick) {
      onDashboardClick(dashboardId);
    }
  };

  return (
    <aside className={styles.sideMenu}>
      <div className={styles.MainlogoSection}>
        {/* TODO: Logo 컴포넌트 import 필요 */}
        <div>Taskify Logo</div>
      </div>

      {/* 대시보드 리스트 영역 */}
      <div className={styles.dashboardSection}>
        <div className={styles.dashboardHeader}>
          <h2 className={styles.dashboardTitle}>Dash Boards</h2>
          {/* TODO: 대시보드 추가 버튼 필요시 */}
        </div>

        <ul className={styles.dashboardList}>
          {dashboards.map((dashboard) => {
            const isActive = dashboard.id === currentDashboardId;

            return (
              <li
                key={dashboard.id}
                className={`${styles.dashboardItem} ${isActive ? styles.active : ''}`}
                onClick={() => handleDashboardClick(dashboard.id)}
              >
                {/* 색상 Chip */}
                <span
                  className={styles.colorChip}
                  style={{ backgroundColor: dashboard.color }}
                />

                {/* 대시보드 이름 */}
                <span className={styles.dashboardName}>
                  {dashboard.title}
                </span>

                {/* 왕관 아이콘 (내가 만든 대시보드) */}
                {dashboard.createdByMe && (
                  <span className={styles.crownIcon}>👑</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 페이지네이션 영역 */}
      {totalPages > 1 && (
        <div className={styles.paginationSection}>
          <button
            className={styles.paginationButton}
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            aria-label="이전 페이지"
          >
            ←
          </button>
          <button
            className={styles.paginationButton}
            onClick={handleNextPage}
            disabled={!hasNextPage}
            aria-label="다음 페이지"
          >
            →
          </button>
        </div>
      )}
    </aside>
  );
}