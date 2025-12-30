'use client';
import { useRouter } from 'next/navigation';
import styles from './Modal.module.css';

type DefaultModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  children?: React.ReactNode;
  closeButton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

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
