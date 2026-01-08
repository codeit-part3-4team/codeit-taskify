import { CardServerResponse } from '@/components/Card/CardServer.type';
import { CommentListServerResponse, CommentServer, CreateCommentRequest } from '@/components/Input/domains/todo/TextInput/TextInput.type';

const API_URL = "https://sp-taskify-api.vercel.app/20-4";
const TASKIFY_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg"


export async function getCardDetail(cardId: string): Promise<CardServerResponse> {
  const res = await fetch(
    `${API_URL}/cards/${cardId}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch card detail');
  }

  return res.json();
}


// 댓글 생성
export async function createComment(
  payload: CreateCommentRequest,
): Promise<CommentServer> {
  const { content, cardId, columnId, dashboardId } = payload;

  const res = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      content,
      cardId,
      columnId,
      dashboardId,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create comment');
  }

  return res.json();
}


// 댓글 조회
export async function getComments(
  cardId: number,
): Promise<CommentListServerResponse> {
  const res = await fetch(
    `${API_URL}/comments?cardId=${cardId}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  return res.json();
}

// 댓글 삭제
export async function deleteComment(
  commentId: number,
): Promise<void> {
  const res = await fetch(
    `${API_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to delete comment');
  }
}


// 댓글 수정
export async function updateComment(
  commentId: number,
  content: string,
): Promise<CommentServer> {
  const res = await fetch(
    `${API_URL}/comments/${commentId}`,
    {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TASKIFY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to update comment');
  }

  return res.json();
}