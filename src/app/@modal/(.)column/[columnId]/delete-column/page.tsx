import DeleteColumn from '@/components/Modals/domains/Column/DeleteColumn';
import Modal from '@/components/Modals/Modal';

// prams가 아니라 --> 대시보드상세페이지에서 columnId를 props로 받아야 함.
export default async function DeleteColumnModal({ params }: { params: { columnId: string } }) {
  return (
    <>
      <Modal>
        <DeleteColumn columnId={Number(params.columnId)} />
      </Modal>
    </>
  );
}
