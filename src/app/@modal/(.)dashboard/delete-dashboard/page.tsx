import DeleteDashBoard from '@/components/Modals/domains/DashBoard/DeleteDashBoard';
import Modal from '@/components/Modals/Modal';

export default async function DeleteDashBoardModal({
  params,
}: {
  params: { dashboardId: string };
}) {
  return (
    <>
      <Modal>
        <DeleteDashBoard dashboardId={Number(params.dashboardId)} />
      </Modal>
    </>
  );
}
