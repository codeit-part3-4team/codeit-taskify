'use client';
import '@/components/design.css';
import styles from './Modal.module.css';

type CommonModalProps = {
  modalIsOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ modalIsOpen, onClose, children }: CommonModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div>{children}</div>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </>
  );
}
