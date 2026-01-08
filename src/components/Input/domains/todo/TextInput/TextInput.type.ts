

export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}



export interface CommentServer {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthorServer;
}

export interface CommentAuthorServer {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface CommentListServerResponse {
  cursorId: number | null;
  comments: CommentServer[];
}