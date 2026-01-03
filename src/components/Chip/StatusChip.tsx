import styles from '@/components/Chip/StatusChip.module.css';

type StatusChipProps = {
  label: string;
  className?: string;
};

/**
 * StatusChip 컴포넌트
 * 
 * @description 할 일의 상태를 표시하는 Chip 컴포넌트입니다.
 * To Do, On Progress, Done 등 사용자가 추가한 컬럼명을 동적으로 표시합니다.
 * 
 * @example
 * ```tsx
 * // 기본 상태들
 * <StatusChip label="To Do" />
 * <StatusChip label="On Progress" />
 * <StatusChip label="Done" />
 * 
 * // 사용자 추가 상태
 * <StatusChip label="real" />
 * <StatusChip label="테스트 중" />
 * 
 * // 동적 데이터
 * <StatusChip label={column.name} />
 * ```
 */
export function StatusChip({
  label,
  className = '',
}: StatusChipProps) {
  return (
    <span 
      className={`${styles.statusChip} ${className}`.trim()}
      aria-label={`상태: ${label}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  );
}