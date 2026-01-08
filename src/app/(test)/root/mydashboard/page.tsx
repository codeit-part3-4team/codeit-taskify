import Link from 'next/link';
import { getDashboards } from '@/app/(test)/root/dashboard/dashboard';

export default async function DashboardPage() {
  const dashboards = await getDashboards();
  return (
    <main>
      <h1>나의 대시보드 페이지</h1>

      <Link href={`/dashboard/create`}>대시보드 생성 모달 열기</Link>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link href={`dashboard/${dashboard.id}`}>{dashboard.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
