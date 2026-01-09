export type Dashboard = {
  id: string;
  title: string;
};

const API_URL = "https://sp-taskify-api.vercel.app/20-4";
const TASKIFY_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg"

export async function getDashboards(): Promise<Dashboard[]> {
  const res = await fetch(
    `${API_URL}/dashboards?navigationMethod=infiniteScroll`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch dashboards');
  }

  const data = await res.json();

  return data.dashboards;
}


export type DashboardDetail = {
  id: string;
  title: string;
  createdAt: string;
};

export async function getDashboardDetail(
  dashboardId: string
): Promise<DashboardDetail> {
  const res = await fetch(
    `${API_URL}/dashboards/${dashboardId}`,
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



export interface CardServerResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  } | null;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCardsResponse {
  cursorId: number;
  totalCount: number;
  cards: CardServerResponse[];
}

export async function getCards(
  columnId: string
): Promise<GetCardsResponse> {
  const res = await fetch(
    `${API_URL}/cards?columnId=${columnId}`,
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