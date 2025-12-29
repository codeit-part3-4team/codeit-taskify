'use client';

import { useState } from 'react';
import { CardServerResponse, mapCardToModalUI } from './CardModal/CardModal.types';
import ModalLayout from './ModalLayout';
import CardModalContent from './CardModal/CardModalContent';
import ModifyCardModal from './CardModal/ModifyCardModal';

type ModalType = 'CARD_CREATE' | 'CARD_EDIT';

type ModalProps = {
  type: ModalType;
  serverCardData: CardServerResponse;
};

export default function Modal({ serverCardData, type }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modalUIData = mapCardToModalUI(serverCardData);
  console.log(modalUIData);
  function renderContent() {
    switch (type) {
      case 'CARD_CREATE':
        return <CardModalContent cardData={modalUIData} onClose={() => setIsOpen(false)} />;
      case 'CARD_EDIT':
        return <ModifyCardModal onClose={() => setIsOpen(false)} />;
      default:
        return null;
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ModalLayout modalIsOpen={isOpen}>{renderContent()}</ModalLayout>
    </>
  );
}
