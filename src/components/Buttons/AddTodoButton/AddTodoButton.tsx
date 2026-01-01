'use client';

import '@/components/design.css';
import styles from './AddTodoButton.module.css';
import Image from 'next/image';

type AddTodoButtonProps = {
  /** 버튼 크기 (desktop: 314x40, tablet: 544x40, mobile: 284x32) */
  size?: 'desktop' | 'tablet' | 'mobile';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Add Todo Button 컴포넌트
 *
 * @description 새로운 할 일을 추가하는 버튼입니다. desktop/tablet/mobile 반응형을 지원합니다.
 *
 * @example
 * ```tsx
 * // Desktop
 * <AddTodoButton size="desktop" onClick={handleAddTodo} />
 *
 * // Tablet
 * <AddTodoButton size="tablet" onClick={handleAddTodo} />
 *
 * // Mobile
 * <AddTodoButton size="mobile" onClick={handleAddTodo} />
 *
 * // 클릭 이벤트
 * <AddTodoButton
 *   size="desktop"
 *   onClick={() => console.log('할 일 추가')}
 * />
 * ```
 */
export default function AddTodoButton({
  size = 'desktop',
  className = '',
  ...props
}: AddTodoButtonProps) {
  const sizeClass = styles[size];
  const chipSize = size === 'mobile' ? 20 : 22;
  const chipSrc = size === 'mobile' ? '/chip_20px.png' : '/chip_22px.png';

  return (
    <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
      <Image src={chipSrc} alt="추가" width={chipSize} height={chipSize} className={styles.chip} />
    </button>
  );
}
