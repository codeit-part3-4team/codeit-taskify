'use client';

import { useRouter } from 'next/navigation';
import styles from '@/components/Modals/Modal.module.css';

type DefaultModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  children?: React.ReactNode;
  closeButton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Render a reusable modal layout containing an optional title, message, body content, action buttons, and an optional close control.
 *
 * @param title - Optional heading text displayed at the top of the modal.
 * @param message - Optional descriptive text displayed beneath the title.
 * @param children - Modal body content to be rendered between message and actions.
 * @param actionsButton - Optional action button elements rendered in the modal's action area.
 * @param closeButton - If true, render a close button that navigates back when clicked.
 * @param className - Additional CSS class names applied to the modal container.
 * @returns The composed modal layout as JSX elements.
 */

export default function DefaultModal({
  title,
  message,
  children,
  actionsButton,
  closeButton,
  className = '',
}: DefaultModalProps) {
  const router = useRouter();

  return (
    <>
      {title && <h2 className={styles.modalTitle}>{title}</h2>}
      {message && <p className={styles.modalMessage}>{message}</p>}
      {children}
      {/* 버튼컴포넌트 올 자리 */}
      {actionsButton && <div className={styles.buttonBox}>{actionsButton}</div>}
      {closeButton && <button onClick={() => router.back()}>닫기</button>}
    </>
  );
}