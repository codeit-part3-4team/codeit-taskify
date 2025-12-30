import DefaultModal from '@/components/Modals/DefualtModal';
import Modal from '@/components/Modals/Modal';

export default async function CardDetailPage({ params }: { params: { cardId: string } }) {
  const { cardId } = await params;

  console.log(cardId);

  return (
    <div>
      <Modal>
        {cardId}
        <DefaultModal />
      </Modal>
    </div>
  );
}
