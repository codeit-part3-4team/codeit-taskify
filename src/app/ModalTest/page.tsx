import Modal from '@/components/Modals/Modal';
import { getCardsByColumn } from './api';
import ModalProvider from '@/components/Modals/ModalProvider';

export default async function ModalTest() {
  const data = await getCardsByColumn(
    58140,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg',
  );

  const serverCardData = data.cards[0];

  return (
    <>
      <ModalProvider>
        <Modal type="CARD_EDIT" serverCardData={serverCardData} />
      </ModalProvider>
    </>
  );
}
