import { DashboardsResponse, DashboardsParams } from '@/types/dashboard';
import { authFetch } from '@/lib/api/authFetch';

/**
 * 대시보드 목록 조회
 */
export async function getDashboards(
  params: DashboardsParams
): Promise<DashboardsResponse> {
  const query = new URLSearchParams();

  query.append('navigationMethod', params.navigationMethod);
  if (params.page) query.append('page', String(params.page));
  if (params.size) query.append('size', String(params.size));
  if (params.cursorId) query.append('cursorId', String(params.cursorId));

  return authFetch(`/dashboards?${query.toString()}`);
}
