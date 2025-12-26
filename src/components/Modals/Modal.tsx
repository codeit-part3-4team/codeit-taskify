'use client';
import '@/components/design.css';

type CommonModalProps = {
  modalIsOpen: boolean;
  onClose: () => void;
};

export default function Modal({ modalIsOpen, onClose }: CommonModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div>모달입니다.</div>
      <button onClick={onClose}>닫기</button>
    </>
  );
}
