'use client';

import '@/components/design.css';
import styles from './TextButton.module.css';

type TextButtonProps = {
  /** 버튼 크기 */
  size?: 'large' | 'small';
  /** 버튼 타입 (delete: 삭제, comment: 입력) */
  variant?: 'delete' | 'comment';
  /** 버튼 내용 */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Text Button 컴포넌트
 *
 * @description 텍스트 중심의 버튼입니다. delete(삭제)/comment(입력) 액션과 large/small 크기를 지원합니다.
 *
 * @example
 * ```tsx
 * // Large Delete (삭제)
 * <TextButton size="large" variant="delete">삭제</TextButton>
 *
 * // Large Comment (입력)
 * <TextButton size="large" variant="comment">입력</TextButton>
 *
 * // Small Delete
 * <TextButton size="small" variant="delete">삭제</TextButton>
 *
 * // Small Comment
 * <TextButton size="small" variant="comment">입력</TextButton>
 *
 * // 클릭 이벤트
 * <TextButton size="large" variant="delete" onClick={handleDelete}>
 *   삭제
 * </TextButton>
 *
 * // Disabled 상태
 * <TextButton size="large" variant="comment" disabled>
 *   입력
 * </TextButton>
 * ```
 */
export default function TextButton({
  size = 'large',
  variant = 'comment',
  children,
  className = '',
  ...props
}: TextButtonProps) {
  const sizeClass = size === 'large' ? styles.large : styles.small;
  const variantClass = variant === 'delete' ? styles.delete : styles.comment;

  return (
    <button className={`${styles.button} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
