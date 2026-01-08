// 서버타입
export interface CardServerResponse {
  id: number;
  title: string;
  description: string;
  tags: string[] | null;
  dueDate: string | null;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  } | null;
  imageUrl: string | null;
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



// 클라이언트 타입
export interface CardModalUI {
  title: string;
  description: string;
  tags: string[] | null;
  dueDateText: string | null;
  assigneeName: string | null;
  assigneeProfileUrl: string | null;
  imageUrl?: string | null;
}


// 카드 생성 리퀘스트 타입
export type CardCreateRequest = {
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  assigneeUserId?: number;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};

// 카드 업데이트 리퀘스트 타입
export type UpdateCardRequest = {
  title?: string;
  description?: string;
  assigneeUserId?: number;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};

