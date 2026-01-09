import { CardServerResponse } from './CardServer.type';
import { CardUI } from './CardUI.type';

export function mapCardServerToUI(card: CardServerResponse): CardUI {
  return {
    id: card.id,
    title: card.title,
    tags: card.tags ?? null,
    dueDate: card.dueDate ?? null,
    imageUrl: card.imageUrl ?? null,
    profileImageUrl: card.assignee?.profileImageUrl ?? null,
  };
}