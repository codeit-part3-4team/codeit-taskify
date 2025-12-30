import Link from 'next/link';
import { getDashboards } from './dashboard';

export default async function DashboardPage() {
  const dashboards = await getDashboards();

  console.log(dashboards);

  return (
    <main>
      <h1>Dashboard List</h1>

      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link href={`/dashboard/${dashboard.id}`}>{dashboard.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
