import { getColumns } from '@/app/dashboard/[dashboardId]/dashboard.api';
import DefaultModal from '@/components/Modals/DefaultModal';
import Modal from '@/components/Modals/Modal';

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

  // 서버 컴포넌트 콘솔 (터미널에 찍힘)
  console.log('params:', dashboardId, columnId, cardId);

  // 테스트용 API
  const responseColumData = await getColumns(dashboardId);
  const columns = responseColumData.data;

  return (
    <Modal>
      <DefaultModal title="카드 상세 모달 테스트">
        <div>
          <p>dashboardId: {dashboardId}</p>
          <p>columnId: {columnId}</p>
          <p>cardId: {cardId}</p>

          <pre style={{ maxHeight: 300, overflow: 'auto' }}>{JSON.stringify(columns, null, 2)}</pre>
        </div>
      </DefaultModal>
    </Modal>
  );
}
