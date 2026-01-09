import { DashboardsResponse, DashboardsParams } from '@/types/dashboard';
import { authFetch } from '@/lib/api/authFetch';

/**
 * 대시보드 생성 요청 payload 타입
 *
 * @description
 * Swagger 명세 기준으로 대시보드 생성 시 필요한 데이터 구조입니다.
 * color 필드는 반드시 Hex 코드 문자열(#RRGGBB) 형식이어야 합니다.
 */
export type CreateDashboardRequest = {
  /** 대시보드 제목 */
  title: string;
  /** 대시보드 색상 (Hex 코드) */
  color: string;
};

/**
 * 대시보드 목록 조회 API
 *
 * @param params 대시보드 조회 파라미터
 * @returns 대시보드 목록 응답 데이터
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

/**
 * 대시보드 생성 API
 *
 * @description
 * authFetch 내부에서 TEAM_ID가 이미 붙기 때문에
 * endpoint는 "/dashboards"까지만 전달해야 합니다.
 *
 * @param payload 대시보드 생성 요청 데이터
 * @returns 생성된 대시보드 정보
 */
export async function createDashboard(payload: CreateDashboardRequest) {
  return authFetch('/dashboards', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
