import '@/components/design.css';
import styles from './Modal.module.css';

type CommonModalProps = {
  modalIsOpen: boolean;
  children: React.ReactNode;
  modalRef: React.Ref<HTMLDivElement>;
};

// 애니메이션이 안되는 문제 해결 필요

export default function Modal({ modalIsOpen, children, modalRef }: CommonModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div className={styles.overlay}>
        <div className={`${styles.modal} ${styles.modalOpen}`} ref={modalRef}>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
