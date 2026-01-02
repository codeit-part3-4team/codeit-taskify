import DefaultModal from '@/components/Modals/DefualtModal';
import Modal from '@/components/Modals/Modal';

/**
 * Renders a page that displays a card details modal for the specified card ID.
 *
 * @param params - Route parameters object.
 * @param params.cardId - Identifier of the card whose details are shown in the modal.
 * @returns The React element for the card details modal page.
 */
export default async function CardDetailPage({ params }: { params: { cardId: string } }) {
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