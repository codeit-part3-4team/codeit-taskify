'use client';

import styles from './DashboardGrid.module.css';
import AddDashboardButton from '@/components/Buttons/domains/dashboard/AddDashboardButton/AddDashboardButton';
import DashboardButton from '@/components/Buttons/domains/dashboard/DashboardButton/DashboardButton';

type Dashboard = {
  id: number;
  title: string;
  color: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
  createdByMe: boolean;
};

type DashboardGridProps = {
  dashboards: Dashboard[];
  onAddClick: () => void;
  onDashboardClick: (id: number) => void;
};

export default function DashboardGrid({
  dashboards,
  onAddClick,
  onDashboardClick,
}: DashboardGridProps) {
  return (
    <div className={styles.grid}>
      {/* 새로운 대시보드 추가 버튼 */}
      <AddDashboardButton onClick={onAddClick} />

      {/* 대시보드 목록 */}
      {dashboards.map((dashboard) => (
        <DashboardButton
          key={dashboard.id}
          color={dashboard.color}
          showCrown={dashboard.createdByMe}
          onClick={() => onDashboardClick(dashboard.id)}
        >
          {dashboard.title}
        </DashboardButton>
      ))}
    </div>
  );
}