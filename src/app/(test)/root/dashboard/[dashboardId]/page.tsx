import Link from 'next/link';
import { getCards, getColumns } from '../dashboard';

export default async function DashboardDetailPage({ params }: { params: { dashboardId: string } }) {
  const { dashboardId } = await params;

  const columnsRes = await getColumns(dashboardId);
  const columns = columnsRes.data;

  const cardsByColumn = await Promise.all(
    columns.map(async (column) => {
      const cards = await getCards(String(column.id));
      return {
        columnId: column.id,
        cards,
      };
    }),
  );

  return (
    <main>
      <h1>대시보드 상세 페이지</h1>
      <h2>컬럼들</h2>
      <div style={{ background: 'yellow' }}>
        <ul>
          {columns.map((column) => (
            <li key={column.id}>{column.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>카드들</h2>
        {cardsByColumn.map((item) => (
          <section key={item.columnId}>
            <ul>
              {item.cards.cards.map((card) => (
                <li key={card.id}>
                  <Link href={`/card/${card.id}/detail`}>{card.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
