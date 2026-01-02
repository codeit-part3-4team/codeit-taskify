import DefaultModal from '@/components/Modals/DefaultModal';
import Modal from '@/components/Modals/Modal';

export default async function CardDetailPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await params;

  console.log(cardId);

  return (
    <div>
      <Modal>
        카드 상세 모달창 테스트
        <DefaultModal />
      </Modal>
    </div>
  );
}
