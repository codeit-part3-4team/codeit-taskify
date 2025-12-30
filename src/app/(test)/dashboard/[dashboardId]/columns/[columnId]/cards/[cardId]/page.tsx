export default async function CardDetailPage({ params }: { params: { cardId: string } }) {
  const { cardId } = await params;

  console.log(cardId);

  return <div>card detail {params.cardId}</div>;
}
