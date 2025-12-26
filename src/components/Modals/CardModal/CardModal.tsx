import { CardModalUI } from './cardmodal.types';

interface CardModalProps {
  cardData: CardModalUI;
  modalIsOpen: boolean;
  onClose: () => void;
}

export default async function CardModal({ cardData, modalIsOpen, onClose }: CardModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div>{cardData.title}</div>
      <div>{cardData.description}</div>
      <div>{cardData.dueDateText}</div>
      <div>{cardData.assigneeName}</div>
      <button onClick={onClose}></button>
    </>
  );
}
