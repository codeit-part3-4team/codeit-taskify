import { Dashboard, DashboardsResponse, DashboardsParams } from '@/types/dashboard';

const API_BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '20-4';

/**
 * Access Token 가져오기
 */
function getAccessToken(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || '';
  }
  return '';
}

/**
 * 대시보드 목록 조회 (페이지네이션)
 */
export async function getDashboards(
  params: DashboardsParams
): Promise<DashboardsResponse> {
  const queryParams = new URLSearchParams({
    navigationMethod: params.navigationMethod,
    ...(params.page && { page: params.page.toString() }),
    ...(params.size && { size: params.size.toString() }),
  });

  const response = await fetch(
    `${API_BASE_URL}/${TEAM_ID}/dashboards?${queryParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboards: ${response.status}`);
  }

  return response.json();
}