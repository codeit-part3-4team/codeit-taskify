'use client';

import { CardServerResponse, mapCardToModalUI } from './CardModal/CardModal.types';
import ModalLayout from './ModalLayout';
import CardModalContent from './CardModal/CardModalContent';
import ModifyCardModal from './CardModal/ModifyCardModal';
import { ModalContext } from './ModalProvider';
import { useContext } from 'react';

type ModalType = 'CARD_CREATE' | 'CARD_EDIT';

type ModalProps = {
  type: ModalType;
  serverCardData: CardServerResponse;
};

export default function Modal({ serverCardData, type }: ModalProps) {
  const context = useContext(ModalContext);
  if (!context) return null;

  const { isOpen, open, close } = context;

  const modalUIData = mapCardToModalUI(serverCardData);
  function renderContent() {
    switch (type) {
      case 'CARD_CREATE':
        return <CardModalContent cardData={modalUIData} onClose={close} />;
      case 'CARD_EDIT':
        return <ModifyCardModal onClose={close} />;
      default:
        return null;
    }
  }

  return (
    <>
      <button onClick={open}>Open Modal</button>
      <ModalLayout modalIsOpen={isOpen}>{renderContent()}</ModalLayout>
    </>
  );
}
