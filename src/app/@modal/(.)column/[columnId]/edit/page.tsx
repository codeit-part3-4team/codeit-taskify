import EditColumn from '@/components/Modals/domains/Column/EditColumn';
import Modal from '@/components/Modals/Modal';

export default async function EditColumnModal() {
  // 페이지에서 데이터를 받는다.
  // 서버컴포넌트 유지. --> EditColumn에서 payload 보냄.('use client')
  return (
    <>
      <Modal>
        <EditColumn />
      </Modal>
    </>
  );
}
