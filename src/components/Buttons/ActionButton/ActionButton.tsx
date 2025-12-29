'use client';

/**
 * Action Button 컴포넌트
 * 
 * @description 수락/거절 등의 액션 버튼입니다. confirm/deny 타입과 desktop/tablet/mobile 반응형을 지원합니다.
 * 
 * @example
 * ```tsx
 * // Desktop Confirm (수락)
 * <ActionButton size="desktop" variant="confirm">수락</ActionButton>
 * 
 * // Desktop Deny (거절)
 * <ActionButton size="desktop" variant="deny">거절</ActionButton>
 * 
 * // Tablet Confirm
 * <ActionButton size="tablet" variant="confirm">수락</ActionButton>
 * 
 * // Mobile Deny
 * <ActionButton size="mobile" variant="deny">거절</ActionButton>
 * 
 * // 클릭 이벤트
 * <ActionButton size="desktop" variant="confirm" onClick={handleConfirm}>
 *   수락
 * </ActionButton>
 * 
 * // 함께 사용 (10px 간격)
 * <div style={{ display: 'flex', gap: '10px' }}>
 *   <ActionButton size="desktop" variant="deny">거절</ActionButton>
 *   <ActionButton size="desktop" variant="confirm">수락</ActionButton>
 * </div>
 * ```
 */

import '@/components/design.css';
import styles from './ActionButton.module.css';

type ActionButtonProps = {
  /** 버튼 크기 (desktop: 84x32, tablet: 72x30, mobile: 109x32) */
  size?: 'desktop' | 'tablet' | 'mobile';
  /** 버튼 타입 (confirm: 수락, deny: 거절) */
  variant?: 'confirm' | 'deny';
  /** 버튼 내용 */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActionButton({
  size = 'desktop',
  variant = 'confirm',
  children,
  className = '',
  ...props
}: ActionButtonProps) {
  const sizeClass = styles[size];
  const variantClass = variant === 'confirm' ? styles.confirm : styles.deny;

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

