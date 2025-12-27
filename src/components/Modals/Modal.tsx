import '@/components/design.css';
import styles from './Modal.module.css';

type CommonModalProps = {
  modalIsOpen: boolean;
  children: React.ReactNode;
  modalRef: React.Ref<HTMLDivElement>;
};

export default function Modal({ modalIsOpen, children, modalRef }: CommonModalProps) {
  if (!modalIsOpen) return null;
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal} ref={modalRef}>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
