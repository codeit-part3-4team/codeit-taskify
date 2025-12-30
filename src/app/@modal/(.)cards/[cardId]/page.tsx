import { mapCardToModalUI } from '@/components/Modals/Card/CardModal.types';
import { getCardsByColumn } from './card.api';

export default async function CardModalPage({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const resolvedParams = await params;
  const cardId = Number(resolvedParams.cardId);

  const data = await getCardsByColumn(
    58140,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg',
  );
  console.log(data);
  const card = data.cards.find((c) => c.id === cardId);
  console.log(card);
  // const card = data.cards[0];
  if (!card) {
    return <div>카드를 찾을 수 없습니다.</div>;
  }
  const uiData = mapCardToModalUI(card);
  console.log(uiData);

  return (
    <div>
      <h2>{uiData.title}</h2>
      <p>{uiData.description}</p>
    </div>
  );
}
