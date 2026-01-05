import { CardModalUI, CardServerResponse } from "@/components/Modals/domains/Card/ModalCard.type";

// 데이터 매핑 함수
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