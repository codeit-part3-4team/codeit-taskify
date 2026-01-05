import { getCards, getColumns } from './dashboard.api';

// dashboard/17226 에서 작업
export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  const responseCardData = await Promise.all(columns.map((column) => getCards(column.id)));

  const columnCards = responseCardData.map((columns) => columns.cards);

  return (
    <div>
      {dashboardId}
      {columns.map((column) => (
        <p key={column.id}>{column.title}</p>
      ))}
      {columnCards.map((cardsInColumn, columnIndex) => (
        <div key={columnIndex}>
          {cardsInColumn.map((card) => (
            <p key={card.id}>{card.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
