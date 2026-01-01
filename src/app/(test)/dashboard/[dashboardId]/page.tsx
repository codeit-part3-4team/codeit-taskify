import Link from 'next/link';
import { getCards, getColumns, getDashboardDetail } from '../dashboard';

export default async function DashboardDetailPage({ params }: { params: { dashboardId: string } }) {
  const { dashboardId } = await params;

  const dashboard = await getDashboardDetail(dashboardId);
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

  console.log(cardsByColumn);

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

      {/* <Link href={`/cards/new`}>생성하러가기</Link>
      <Link href={`/cards/edit`}>수정하러가기</Link> */}

      <div>
        <h2>카드들</h2>
        {cardsByColumn.map((item) => (
          <section key={item.columnId}>
            <ul>
              {item.cards.cards.map((card) => (
                <li key={card.id}>
                  <Link href={`/cards/${card.id}`}>{card.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
