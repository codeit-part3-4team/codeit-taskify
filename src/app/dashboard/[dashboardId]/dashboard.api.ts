
const API_URL = "https://sp-taskify-api.vercel.app/20-4";
const TASKIFY_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg"

export type ColumnListResponse = {
  result: 'SUCCESS' | 'FAIL';
  data: ColumnServer[];
};

export type ColumnServer = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};


export async function getColumns(
  dashboardId: string
): Promise<ColumnListResponse> {
  const res = await fetch(
    `${API_URL}/columns?dashboardId=${dashboardId}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard detail');
  }

  return res.json();
}
