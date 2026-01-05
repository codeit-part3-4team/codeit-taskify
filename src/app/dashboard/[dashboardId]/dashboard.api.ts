import { GetCardsResponse } from "./card.type";
import { ColumnListResponse } from "./column.type";

const API_URL = "https://sp-taskify-api.vercel.app/20-4";
const TASKIFY_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg"


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



export async function getCards(
  columnId: number
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