'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Modal.module.css';
import { useRouter } from 'next/navigation';

type ModalProps = {
  type?: 'default' | 'alim';
  size?: 'default' | 'large' | 'custom';
  width?: number | string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Modal({
  type = 'default',
  children,
  size = 'default',
  width,
  className = '',
}: ModalProps) {
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

  const handleOverlayKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const isAlim = type === 'alim' ? styles.alim : '';
  const style = size === 'custom' ? { width } : undefined;
  const large = size === 'large' ? styles.large : '';

  return (
    <>
      <div
        ref={overlayRef}
        onClick={closeModal}
        onKeyDown={handleOverlayKeyDown}
        role="dialog"
        aria-label="모달 닫기"
        tabIndex={0}
        className={`${styles.overlay} ${mounted ? styles.open : ''} ${className}`}
      >
        <div
          style={style}
          className={`${styles.modal} ${large} ${isAlim}`}
          onClick={stopPropagation}
        >
          {children}
        </div>
      </div>
    </>
  );
}
