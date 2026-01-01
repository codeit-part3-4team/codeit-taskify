'use client';

import '@/components/design.css';
import styles from './LoginButton.module.css';

type LoginButtonProps = {
  /** 버튼 크기 (large: 520px, small: 351px) */
  size?: 'large' | 'small';
  /** 버튼 색상 상태 (active: 활성, inactive: 비활성) */
  variant?: 'active' | 'inactive';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 버튼 내용 */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Login Button 컴포넌트
 *
 * @description 로그인/회원가입 페이지에서 사용하는 버튼입니다. active/inactive 상태와 large/small 크기를 지원합니다.
 *
 * @example
 * ```tsx
 * // Large Active (기본)
 * <LoginButton size="large" variant="active">로그인</LoginButton>
 *
 * // Large Inactive
 * <LoginButton size="large" variant="inactive">로그인</LoginButton>
 *
 * // Small Active
 * <LoginButton size="small" variant="active">회원가입</LoginButton>
 *
 * // Small Inactive (disabled)
 * <LoginButton size="small" variant="inactive" disabled>회원가입</LoginButton>
 *
 * // 클릭 이벤트
 * <LoginButton size="large" variant="active" onClick={handleLogin}>
 *   로그인
 * </LoginButton>
 *
 * // 전체 너비
 * <LoginButton size="large" variant="active" fullWidth>
 *   로그인
 * </LoginButton>
 * ```
 */
export default function LoginButton({
  size = 'large',
  variant = 'active',
  fullWidth = false,
  children,
  className = '',
  ...props
}: LoginButtonProps) {
  const sizeClass = size === 'large' ? styles.large : styles.small;
  const variantClass = variant === 'active' ? styles.active : styles.inactive;
  const widthClass = fullWidth ? styles.fullWidth : '';

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
