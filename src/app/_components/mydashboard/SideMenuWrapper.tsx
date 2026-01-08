'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenu from '@/components/SideMenu/SideMenu';
import { getDashboards } from '@/lib/api/dashboards';
import { Dashboard } from '@/types/dashboard';

export default function SideMenuWrapper() {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboards() {
      try {
        setLoading(true);
        const data = await getDashboards({
          navigationMethod: 'pagination',
          page: 1,
          size: 100,
        });

        setDashboards(data.dashboards);
      } catch (err) {
        console.error('대시보드 목록 조회 실패:', err);
        setError('대시보드 목록을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboards();
  }, []);

  const handleDashboardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const handleAddDashboard = () => {
    // ✅ 임시로 콘솔만 출력
    console.log('대시보드 생성 모달 열기');
  };

  if (loading) {
    return (
      <aside style={{ width: '300px', padding: '20px', background: '#fff' }}>
        <p>로딩 중...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside style={{ width: '300px', padding: '20px', background: '#fff' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </aside>
    );
  }

  return (
    <SideMenu
      dashboards={dashboards}
      onDashboardClick={handleDashboardClick}
      onAddDashboardClick={handleAddDashboard}
    />
  );
}