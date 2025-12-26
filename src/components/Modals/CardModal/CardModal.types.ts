// 서버타입
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
  };
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


// 클라이언트 타입
export interface CardModalUI {
  title: string;
  description: string;
  tags: string[];
  dueDateText: string;
  assigneeName: string;
  assigneeProfileUrl: string;
  imageUrl?: string;
}


// 최종 타입 매핑 함수
export function mapCardToModalUI(
  card: CardServerResponse
): CardModalUI {
  return {
    title: card.title,
    description: card.description,
    tags: card.tags,
    dueDateText: card.dueDate,
    assigneeName: card.assignee.nickname,
    assigneeProfileUrl: card.assignee.profileImageUrl,
    imageUrl: card.imageUrl,
  };
}