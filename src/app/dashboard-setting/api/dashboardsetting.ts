const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '20-4';

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface GetDashboardsResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

interface ErrorResponse {
  message: string;
}

export type MemberItem = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type GetMembersResponse = {
  members: MemberItem[];
  totalCount: number;
};
export async function getDashboards(): Promise<GetDashboardsResponse> {
  // ✅ 키 이름을 넣어야 함 (너 LocalStorage에서 본 키)
  const token = localStorage.getItem('accessToken');

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/dashboards?navigationMethod=pagination&page=1&size=30`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // ✅ 토큰이 있으면 Authorization 헤더에 붙임
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function updateDashboard(
  dashboardId: number,
  payload: { title: string; color: string }
) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(
    `https://sp-taskify-api.vercel.app/20-4/dashboards/${dashboardId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function deleteDashboard(dashboardId: number): Promise<void> {
  // ✅ 토큰은 "키 이름"으로 가져와야 함 (대부분 accessToken)
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/dashboards/${dashboardId}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // 204 No Content면 성공 (응답 바디 없음)
  if (response.status === 204) return;

  // 에러면 message 읽어서 throw
  let errorMessage = '삭제 실패 😢';
  try {
    const error: ErrorResponse = await response.json();
    if (error?.message) errorMessage = error.message;
  } catch {
    // 응답이 JSON이 아닐 수도 있어서 그냥 기본 메시지
  }

  throw new Error(errorMessage);
}

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken'); // ✅ 이 키 이름이 중요해
}

/** 공통 fetch 에러 처리 */
async function handleError(response: Response) {
  if (response.ok) return;

  let message = '요청 실패';
  try {
    const data: ErrorResponse = await response.json();
    if (data?.message) message = data.message;
  } catch {}

  throw new Error(message);
}

/* =====================
   초대 목록 조회 (GET)
   GET /{teamId}/dashboards/{dashboardId}/invitations?page=1&size=10
===================== */

export type InvitationItem = {
  id: number;
  invitee: { email: string; nickname: string; id: number };
  inviter: { email: string; nickname: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetInvitationsResponse = {
  totalCount: number;
  invitations: InvitationItem[];
};

export async function getDashboardInvitations(
  dashboardId: number,
  page = 1,
  size = 10
): Promise<GetInvitationsResponse> {
  const token = getAccessToken();

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  await handleError(response);
  return response.json();
}

export async function cancelInvitation(dashboardId: number, invitationId: number) {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(
    `${BASE_URL}/${TEAM_ID}/dashboards/${dashboardId}/invitations/${invitationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json().catch(() => ({ message: '요청 실패' }));
    throw new Error(error.message);
  }

  // 204 NoContent라서 json 없음
  return;
}

export async function getDashboardMembers(
  dashboardId: number,
  page = 1,
  size = 20
): Promise<GetMembersResponse> {
  const token = getAccessToken();

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/members?dashboardId=${dashboardId}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  await handleError(response);
  return response.json();
}