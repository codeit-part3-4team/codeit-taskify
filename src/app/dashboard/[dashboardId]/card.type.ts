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


export interface UpdateCardRequest {
  columnId: number,
  title?: string;
  description?: string;
  assigneeUserId?: number;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};