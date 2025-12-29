'use client';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button onClick={() => router.back()}>닫기</button>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
