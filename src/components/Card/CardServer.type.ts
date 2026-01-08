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