import CreateCard from '@/components/Modals/domains/Card/CreateCard';
import Modal from '@/components/Modals/Modal';

// URL params로 받음 (Next 15)
export default async function CreateCardModal({
  params,
}: {
  params: Promise<{
    dashboardId: string;
    columnId: string;
  }>;
}) {
  const { dashboardId, columnId } = await params;

  // 유효성 검증 추가
  const numericDashboardId = Number(dashboardId);
  const numericColumnId = Number(columnId);

  if (isNaN(numericDashboardId) || isNaN(numericColumnId)) {
    throw new Error('Invalid dashboard or column ID');
  }

  return (
    <Modal size="large">
      <CreateCard dashboardId={numericDashboardId} columnId={numericColumnId} />
    </Modal>
  );
}
