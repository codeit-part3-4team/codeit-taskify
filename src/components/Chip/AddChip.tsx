import styles from '@/components/Chip/AddChip.module.css';

type AddChipProps = {
  size?: 'small' | 'large';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * AddChip 컴포넌트
 * 
 * @description 할 일 추가 버튼 Chip 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * // Large (22px)
 * <AddChip onClick={() => handleAddTask()} />
 * 
 * // Small (20px)
 * <AddChip size="small" onClick={() => handleAddTask()} />
 * 
 * // Disabled
 * <AddChip onClick={() => {}} disabled={true} />
 * ```
 */
export function AddChip({
  size = 'large',
  onClick,
  disabled = false,
  className = '',
}: AddChipProps) {
  const chipSize = size === 'small' ? 20 : 22;
  const iconSize = size === 'small' ? 12 : 14;

  return (
    <button
      type="button"
      className={`
        ${styles.addChip} 
        ${size === 'small' ? styles.small : styles.large}
        ${disabled ? styles.disabled : ''}
        ${className}
      `.trim()}
      onClick={onClick}
      disabled={disabled}
      aria-label="할 일 추가"
      style={{
        width: `${chipSize}px`,
        height: `${chipSize}px`,
      }}
    >
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 16 16"
        fill="none"
        className={styles.plusIcon}
      >
        <path 
          d="M8 2V14M2 8H14" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}