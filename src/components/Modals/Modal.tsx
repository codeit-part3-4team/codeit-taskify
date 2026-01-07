'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '@/components/Modals/Modal.module.css';
import { useRouter } from 'next/navigation';
import { useEscapeClose } from '@/hooks/useEscapeClose';

type ModalProps = {
  type?: 'default' | 'alim';
  size?: 'default' | 'large' | 'custom';
  width?: number | string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Modal 컴포넌트
 *
 * @description
 * Parallel Routes의 `@modal` 슬롯에서 사용되는 라우팅 기반 모달 컨테입니다.
 * 오버레이 클릭, ESC 키, 키보드 포커스 이벤트를 통해 모달을 닫을 수 있으며,
 * 닫힘 동작은 `router.back()`를 기준으로 합니다.
 *
 * 모달의 크기, 타입, 커스텀 너비를 제어할 수 있고,
 * 실제 콘텐츠는 children으로 받습니다.
 *
 * 이 컴포넌트는 모달의 열림/닫힘 흐름과 접근성 처리만 책임지며,
 * 내부 UI 구성과 데이터 처리는 하위 컴포넌트가 담당합니다.
 *
 * @example
 * ```tsx
 * // 기본 모달
 * <Modal>
 *   <DefaultModal title="기본 모달">
 *     <div>{children}</div>
 *   </DefaultModal>
 * </Modal>
 *
 * // Large(width) 사이즈 모달
 * <Modal size="large">
 *   <DefaultModal title="Large 모달">
 *     <div>{children}</div>
 *   </DefaultModal>
 * </Modal>
 *
 * // 알림(alim) 타입 모달
 * <Modal type="alim">
 *   <DefaultModal message="알림 메시지" />
 * </Modal>
 *
 * // 커스텀 너비 모달
 * <Modal size="custom" width={600}>
 *   <DefaultModal title="Custom Width 모달">
 *     <div>{children}</div>
 *   </DefaultModal>
 * </Modal>
 *
 * // 커스텀 너비 (string 허용)
 * <Modal size="custom" width="720px">
 *   <DefaultModal title="Custom Width 모달">
 *     <div>{children}</div>
 *   </DefaultModal>
 * </Modal>
 * ```
 *
 */

export default function Modal({
  type = 'default',
  children,
  size = 'default',
  width,
  className = '',
}: ModalProps) {
  const router = useRouter();
  const [modalOpenReady, setModalOpenReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setModalOpenReady(true);
    });
  }, []);

  useEffect(() => {
    if (modalOpenReady) {
      overlayRef.current?.focus();
    }
  }, [modalOpenReady]);

  const closeModal = () => {
    router.back();
  };

  // const handleOverlayKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault();
  //     closeModal();
  //   }
  // };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEscapeClose(closeModal);

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
        // onKeyDown={handleOverlayKeyDown}
        role="dialog"
        aria-label="모달 닫기"
        tabIndex={0}
        className={`${styles.overlay} ${modalOpenReady ? styles.open : ''} ${className}`}
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
