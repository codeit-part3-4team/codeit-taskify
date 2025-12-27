'use client';

import { CardModalUI } from './CardModal.types';

interface CardModalProps {
  cardData: CardModalUI | null;
  modalIsOpen: boolean;
  onClose: () => void;
}

export default function CardModalContent({ cardData, modalIsOpen, onClose }: CardModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div>{cardData?.title}</div>
      <div>{cardData?.description}</div>
      <button onClick={onClose}></button>
    </>
  );
}
