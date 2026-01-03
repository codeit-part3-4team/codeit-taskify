import CreateColumn from '@/components/Modals/domains/Column/CreateColumn';
import Modal from '@/components/Modals/Modal';

// prams가 아니라 --> 대시보드상세페이지에서 columnId를 props로 받아야 함.
export default async function CreateColumnModal({ params }: { params: { dashboardId: string } }) {
  return (
    <>
      <Modal>
        <CreateColumn dashboardId={Number(params.dashboardId)} />
      </Modal>
    </>
  );
}
