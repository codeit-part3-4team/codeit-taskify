import ColumnList from '@/components/Column/ColumnList';
import { getCards, getColumns } from './dashboard.api';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import { mapCardServerToUI } from '@/components/Card/helper';

// dashboard/17226 에서 작업
export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  // 1. 컬럼 조회
  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  // 2. 컬럼별 카드 조회
  const responseCardData = await Promise.all(columns.map((column) => getCards(column.id)));

  const columnCards = responseCardData.map((columns) => columns.cards);

  // 3. 카드 카운트 조회
  const cardCounts = responseCardData.map((columns) => columns.totalCount);

  // 4. Column UI 데이터
  const columnUIList: ColumnUI[] = columns.map((column, index) => ({
    id: column.id,
    title: column.title,
    cardCount: cardCounts[index],
  }));

  // 5. Card UI 데이터(컬럼 순서와 동일)
  const columnCardsUI = columnCards.map((cardsInColumn) => cardsInColumn.map(mapCardServerToUI));

  return (
    <div>
      <ColumnList columns={columnUIList} cardsByColumn={columnCardsUI} />

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
