'use client';

interface CardModalProps {
  // cardData: CardModalUI | null;
  // modalIsOpen: boolean;
  onClose: () => void;
}

export default function ModifyCardModal({ cardData, modalIsOpen, onClose }: CardModalProps) {
  // if (!modalIsOpen) return null;
  return (
    <>
      <div>음....</div>
      <button onClick={onClose}>닫기</button>
    </>
  );
}
