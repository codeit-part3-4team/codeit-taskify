// 대시보드 기본 타입
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

// 대시보드 목록 조회 응답
export interface DashboardsResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

// 페이지네이션 파라미터
export interface DashboardsParams {
  navigationMethod: 'pagination' | 'infiniteScroll';
  page?: number;
  size?: number;
  cursorId?: number;
}

// 사용자 정보 (로그인 응답에서 가져온 것)
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// ========== 초대 관련 타입 ========== //

// 초대자/초대받은 사람 정보
export interface InvitationUser {
  id: number;
  email: string;
  nickname: string;
}

// 초대 대시보드 정보
export interface InvitationDashboard {
  id: number;
  title: string;
}

// 초대 정보
export interface Invitation {
  id: number;
  inviter: InvitationUser;
  teamId: string;
  dashboard: InvitationDashboard;
  invitee: InvitationUser;
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

// 초대 목록 조회 응답
export interface InvitationsResponse {
  invitations: Invitation[];
  totalCount: number;
}

// 초대 수락/거절 응답
export interface InvitationActionResponse {
  id: number;
  inviter: InvitationUser;
  teamId: string;
  dashboard: InvitationDashboard;
  invitee: InvitationUser;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}