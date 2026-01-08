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
  console.log(dashboardId, columnId);

  return (
    <Modal size="large">
      <CreateCard dashboardId={Number(dashboardId)} columnId={Number(columnId)} />
    </Modal>
  );
}
