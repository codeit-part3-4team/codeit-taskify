// 서버타입
export interface CardServerResponse {
  id: number;
  title: string;
  dashboardId: number
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


/**
 * Map a server-side card object to the UI model used by the card modal.
 *
 * @param card - Server card data to convert
 * @returns A CardModalUI whose fields are populated from `card`; missing or undefined server values are mapped to `null` for `tags`, `dueDateText`, `assigneeName`, `assigneeProfileUrl`, and `imageUrl`
 */
export function mapCardToModalUI(
  card: CardServerResponse
): CardModalUI {
  return {
    title: card.title,
    description: card.description,
    tags: card.tags ?? null,
    dueDateText: card.dueDate ?? null,
    assigneeName: card.assignee?.nickname ?? null,
    assigneeProfileUrl: card.assignee?.profileImageUrl ?? null,
    imageUrl: card.imageUrl ?? null,
  };
}


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

export type UpdateCardRequest = {
  title?: string;
  description?: string;
  assigneeUserId?: number;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};
