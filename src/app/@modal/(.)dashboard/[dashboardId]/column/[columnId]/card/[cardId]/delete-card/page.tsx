import DeleteCard from '@/components/Modals/domains/Card/DeleteCard';
import Modal from '@/components/Modals/Modal';

export default async function DeleteCardModal({ params }: { params: { cardId: string } }) {
  return (
    <div>
      <Modal>
        <DeleteCard cardId={Number(params.cardId)} />
      </Modal>
    </div>
  );
}
