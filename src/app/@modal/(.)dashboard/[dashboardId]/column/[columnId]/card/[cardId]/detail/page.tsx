import { getCardDetail } from '@/app/dashboard/[dashboardId]/column/[columnId]/card/[cardId]/detail/cardDetail.api';
import DetailCard from '@/components/Modals/domains/Card/DetailCard';
import { mapCardToModalUI } from '@/components/Modals/domains/Card/helper';
import Modal from '@/components/Modals/Modal';
import styles from '@/components/Modals/domains/Card/modalCard.module.css';
import { getCards, getColumns } from '@/app/dashboard/[dashboardId]/dashboard.api';
import { ColumnUI } from '@/components/Column/ColumnUI.type';

// 나중에 dashboardId, columnId 지우고
// 현재 모달 열리는 경로 바꾸기 (.)card/[cardId]/detail/page.tsx로
// 새로고침된 후 열리는 'CardDetailFallback'의 경로도 바꿔 줘야 함.

type DetailCardModalProps = {
  dashboardId: string;
  columnId: string;
  cardId: string;
};

export default async function DetailCardModal({
  params,
}: {
  params: Promise<DetailCardModalProps>;
}) {
  const { dashboardId, columnId, cardId } = await params;

  const routeParams = {
    dashboardId: Number(dashboardId),
    columnId: Number(columnId),
    cardId: Number(cardId),
  };

  console.log(routeParams);

  const cardServerData = await getCardDetail(cardId);
  const cardData = mapCardToModalUI(cardServerData);

  // 1. 컬럼 조회
  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  // 2. Column UI 데이터
  const columnUIList: ColumnUI[] = columns.map((column) => ({
    id: column.id,
    title: column.title,
  }));

  const columnTitle =
    columnUIList.find((column) => String(column.id) === columnId)?.title ?? '알 수 없는 컬럼';

  return (
    <div>
      <Modal className={styles.cardDetailModal}>
        <DetailCard cardData={cardData} columnTitle={columnTitle} routeParams={routeParams} />
      </Modal>
    </div>
  );
}
