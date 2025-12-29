'use client';

import styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
