'use client';

/**
 * Modal Button 컴포넌트
 *
 * @description 모달에서 사용하는 버튼입니다. primary/secondary 스타일과 large/small 크기를 지원합니다.
 *
 * @example
 * ```tsx
 * // Large Secondary (취소 버튼)
 * <ModalButton variant="secondary" size="large">취소</ModalButton>
 *
 * // Large Primary (확인 버튼)
 * <ModalButton variant="primary" size="large">확인</ModalButton>
 *
 * // Small Secondary
 * <ModalButton variant="secondary" size="small">취소</ModalButton>
 *
 * // Small Primary
 * <ModalButton variant="primary" size="small">확인</ModalButton>
 *
 * // 클릭 이벤트
 * <ModalButton variant="primary" size="large" onClick={handleConfirm}>
 *   확인
 * </ModalButton>
 *
 * // 모달에서 함께 사용
 * <div className="modal-buttons">
 *   <ModalButton variant="secondary" size="large" onClick={onClose}>취소</ModalButton>
 *   <ModalButton variant="primary" size="large" onClick={onConfirm}>확인</ModalButton>
 * </div>
 * ```
 */

import '@/components/design.css';
import styles from './ModalButton.module.css';

type ModalButtonProps = {
  /** 버튼 스타일 (primary: 확인, secondary: 취소) */
  variant?: 'primary' | 'secondary';
  /** 버튼 크기 (large: 120px, small: 84px) */
  size?: 'large' | 'small';
  /** 버튼 내용 */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ModalButton({
  variant = 'primary',
  size = 'large',
  children,
  className = '',
  ...props
}: ModalButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;
  const sizeClass = size === 'large' ? styles.large : styles.small;

  return (
    <button className={`${styles.button} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
