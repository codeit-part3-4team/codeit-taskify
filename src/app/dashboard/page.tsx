import Link from 'next/link';

export type Dashboard = {
  id: string;
  title: string;
};

const API_URL = 'https://sp-taskify-api.vercel.app/20-4';
const TASKIFY_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg';

export async function getDashboards(): Promise<Dashboard[]> {
  const res = await fetch(`${API_URL}/dashboards?navigationMethod=infiniteScroll`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboards');
  }

  const data = await res.json();

  return data.dashboards;
}

export default async function Dashboard() {
  const data = await getDashboards();
  console.log(data);
  return (
    <>
      {data.map((dashboard) => (
        <Link key={dashboard.id} href={`dashboard/${dashboard.id}`}>
          {dashboard.title}
        </Link>
      ))}
    </>
  );
}
