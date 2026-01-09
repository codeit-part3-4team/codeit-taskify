import {
  InvitationsResponse,
  InvitationActionResponse,
} from '@/types/dashboard';

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
 * 내가 받은 모든 초대 목록 조회
 * @param page - 페이지 번호 (기본: 1)
 * @param size - 페이지 크기 (기본: 10)
 */
export async function getMyInvitations(
  page: number = 1,
  size: number = 10
): Promise<InvitationsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/${TEAM_ID}/invitations?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch my invitations: ${response.status}`);
  }

  return response.json();
}

/**
 * 초대 수락/거절
 * @param invitationId - 초대 ID
 * @param accept - true: 수락, false: 거절
 */
export async function respondToInvitation(
  invitationId: number,
  accept: boolean
): Promise<InvitationActionResponse> {
  const response = await fetch(
    `${API_BASE_URL}/${TEAM_ID}/invitations/${invitationId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({
        inviteAccepted: accept,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to respond to invitation: ${response.status}`);
  }

  return response.json();
}