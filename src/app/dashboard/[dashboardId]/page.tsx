import { getCards, getColumns } from './dashboard.api';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import { mapCardServerToUI } from '@/components/Card/helper';
import SideMenu from '@/components/SideMenu/SideMenu';
import styles from '@/app/dashboard/[dashboardId]/dashboardDetail.module.css';
import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';
import DashboardDetailClient from '@/app/dashboard/[dashboardId]/_components/DashboardDetailClient';
import { Dashboard } from '@/types/dashboard';

// dashboard/17226 에서 작업
export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;

  const currentDashboardId = Number(dashboardId);

  // 1. 컬럼 조회
  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  console.log(responseColumData);

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

  // 카드 조회
  const getCardsData = await getCards(58140);
  console.log(getCardsData);

  // 5. Card UI 데이터(컬럼 순서와 동일)
  const columnCardsUI = columnCards.map((cardsInColumn) => cardsInColumn.map(mapCardServerToUI));

  // 대시보드 목업데이터
      const dashboards = [
        {
          id: 1,
          title: '내 대시보드',
          color: '#7AC555',
          createdByMe: true,
          userId: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 2,
          title: '팀 대시보드',
          color: '#FFA500',
          createdByMe: false,
          userId: 1,
          createdAt: '',
          updatedAt: '',
        },
      ];


  return (
    <div>
      <div className={styles.dashboardDetailSection}>
        <div className={styles.leftBox}>
          <SideMenu
            dashboards={dashboards}
            // onDashboardClick={(id) => Router.push(`/dashboard/${id}`)}
            // onAddDashboardClick={() => Router.push(`/dashboard/create`)}
            selectedDashboardId={currentDashboardId}
          />
        </div>
        <div className={styles.rightBox}>
          <div className={styles.headerSection}>
            <DashboardDetailGnb
              dashboardTitle="예시 대시보드"
              dashboardColor="#5534DA"
              members={[
                { id: 1, nickname: '홍길동', profileImageUrl: null },
                { id: 2, nickname: '김철수', profileImageUrl: null },
              ]}
              currentUser={{ nickname: '공상우', profileImageUrl: null }}
            />
          </div>

          {/* Drag & Drop UI */}
          <DashboardDetailClient
            columns={columnUIList}
            cardsByColumn={columnCardsUI}
            dashboardId={Number(dashboardId)}
          />
        </div>
      </div>

      {/* {columns.map((column) => (
        <p key={column.id}>{column.title}</p>
      ))}
      {columnCards.map((cardsInColumn, columnIndex) => (
        <div key={columnIndex}>
          {cardsInColumn.map((card) => (
            <p key={card.id}>{card.title}</p>
          ))}
        </div>
      ))} */}
    </div>
  );
}
