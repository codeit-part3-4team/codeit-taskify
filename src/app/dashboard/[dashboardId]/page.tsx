import ColumnList from '@/components/Column/ColumnList';
import CardList from '@/components/Card/CardList';
import { getCards, getColumns } from './dashboard.api';
import { ColumnUI } from '@/components/Column/ColumnUI.type';

// dashboard/17226 에서 작업
export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  console.log(columns);

  const responseCardData = await Promise.all(columns.map((column) => getCards(column.id)));

  const cardCounts = responseCardData.map((columns) => columns.totalCount);

  const columnCards = responseCardData.map((columns) => columns.cards);

  console.log(responseCardData);

  const columnUIList: ColumnUI[] = columns.map((column, index) => ({
    id: column.id,
    title: column.title,
    cardCount: cardCounts[index],
  }));

  return (
    <div>
      {/* <ColumnList columns={columns}>
        <CardList />
      </ColumnList> */}
      <ColumnList columns={columnUIList} />
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
