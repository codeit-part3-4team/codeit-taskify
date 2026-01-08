import Modal from '@/components/Modals/Modal';
import EditColumn from '@/components/Modals/domains/Column/EditColumn';

export default async function EditColumnModal({
  params,
}: {
  params: Promise<{ columnId: string }>;
}) {
  const { columnId } = await params;

  // get요청
  return (
    <Modal>
      <EditColumn columnId={Number(columnId)} initialTitle="임시 컬럼 제목" />
    </Modal>
  );
}
