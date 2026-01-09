'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import SideMenuWrapper from '@/app/_components/mydashboard/SideMenuWrapper';
import DashboardGnb from '@/components/Gnb/variants/DashboardGnb/DashboardGnb';
import DashboardGrid from '@/app/_components/mydashboard/DashboardGrid/DashboardGrid';
import DashboardPagination from '@/app/_components/mydashboard/DashboardPagination/DashboardPagination';
import InvitedSection from '@/app/_components/mydashboard/InvitedSection/InvitedSection';
import { getDashboards } from '@/lib/api/dashboards';
import { Dashboard, User } from '@/types/dashboard';

export default function MyDashboardPage() {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const userStr = localStorage.getItem('user');

        if (!userStr) {
          throw new Error('로그인 정보 없음');
        }

        const parsedUser = JSON.parse(userStr);
        setCurrentUser(parsedUser);

        const data = await getDashboards({
          navigationMethod: 'pagination',
          page: 1,
          size: 100,
        });

        setDashboards(data.dashboards);
      } catch (err) {
        console.error('데이터 조회 실패:', err);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.max(Math.ceil(dashboards.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDashboards = dashboards.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddDashboard = () => {
    // ✅ 임시로 콘솔만 출력 (모달 연결 전)
    router.push('/root/mydashboard/create')
  };

  const handleDashboardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  if (loading || !currentUser) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.layout}>
      <SideMenuWrapper />

      <main className={styles.main}>
        <DashboardGnb
          userNickname={currentUser.nickname}
          dashboardColor="#5534DA"
          profileImageUrl={currentUser.profileImageUrl}
          showActions={false}
        />

        <div className={styles.container}>
          <div className={styles.content}>
            <section className={styles.dashboardSection}>
              <DashboardGrid
                dashboards={currentDashboards.map((d) => ({
                  id: d.id,
                  title: d.title,
                  color: mapColorToVariant(d.color),
                  createdByMe: d.createdByMe,
                }))}
                onAddClick={handleAddDashboard}
                onDashboardClick={handleDashboardClick}
              />

              <DashboardPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </section>

            <InvitedSection />
          </div>
        </div>
      </main>
    </div>
  );
}

function mapColorToVariant(apiColor: string): 'green' | 'purple' | 'orange' | 'blue' | 'pink' {
  const colorMap: Record<string, 'green' | 'purple' | 'orange' | 'blue' | 'pink'> = {
    '#7AC555': 'green',
    '#760DDE': 'purple',
    '#FFA500': 'orange',
    '#76A6EA': 'blue',
    '#E876EA': 'pink',
    '#AE3283': 'pink',
  };

  return colorMap[apiColor?.toUpperCase()] || 'green';
}