import styles from '@/components/Chip/CountChip.module.css';

type CountChipProps = {
  count: number;
  className?: string;
};

/**
 * CountChip 컴포넌트
 * 
 * @description 할 일 개수를 표시하는 Chip 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * // To Do 3
 * <CountChip count={3} />
 * 
 * // On Progress 2
 * <CountChip count={2} />
 * 
 * // 동적 개수
 * <CountChip count={todoList.length} />
 * ```
 */
export function CountChip({
  count,
  className = '',
}: CountChipProps) {
  return (
    <span 
      className={`${styles.countChip} ${className}`.trim()}
      aria-label={`${count}개`}
    >
      {count}
    </span>
  );
}