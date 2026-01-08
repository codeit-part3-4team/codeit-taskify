import EditCard from '@/components/Modals/domains/Card/EditCard';
import Modal from '@/components/Modals/Modal';

// 카드상세모달 페이지에서 옴.
// 카드상세모달 페이지에서 props로 데이터 내려줌.
export default async function EditCardModal() {
  return (
    <>
      <Modal size="large">
        <EditCard />
      </Modal>
    </>
  );
}
