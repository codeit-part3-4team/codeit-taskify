'use client';

import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { useRouter } from 'next/navigation';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (mounted) {
      overlayRef.current?.focus();
    }
  }, [mounted]);

  const closeModal = () => {
    router.back();
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModal();
    }
  };

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${mounted ? styles.open : ''}`}
        onClick={closeModal}
        onKeyDown={handleOverlayKeyDown}
        role="button"
        aria-label="모달 닫기"
        tabIndex={0}
      >
        <div className={styles.modal} onClick={stopPropagation}>
          {children}
        </div>
      </div>
    </>
  );
}
