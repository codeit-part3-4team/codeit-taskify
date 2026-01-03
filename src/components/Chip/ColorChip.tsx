
import Image from 'next/image';
import styles from '@/components/Chip/ColorChip.module.css';

/* API 요청/응답 시 hex 코드 사용 */
export const DASHBOARD_COLORS = [
  '#7AC555',  // green
  '#760DDE',  // purple
  '#FFA500',  // orange
  '#76A5EA',  // blue
  '#E876EA',  // pink
];

type ColorChipProps = {
  color: string;
  size?: 'small' | 'medium' | 'custom';
  /** size가 'custom'일 때 사용할 크기 (px) */
  customSize?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

/**
 * ColorChip 컴포넌트
 * 
 * @description 대시보드 색상을 표시하거나 선택하는 원형 Chip 컴포넌트입니다.
 * 
 *   Chip 크기
 * - 'small': 8px (SideMenu용)
 * - 'medium': 30px (대시보드 생성/수정용)
 * - 'custom': customSize와 함께 사용
 * 
 * @example
 * ```tsx
 * // SideMenu (작은 크기, 8px)
 * <ColorChip color="#7AC555" size="small" />
 * 
 * // 대시보드 생성/수정 (중간 크기, 30px, 선택 가능)
 * <ColorChip 
 *   color="#7AC555" 
 *   size="medium"
 *   selected={selectedColor === '#7AC555'}
 *   onClick={() => setSelectedColor('#7AC555')}
 * />
 * 
 * // 커스텀 크기
 * <ColorChip color="#7AC555" size="custom" customSize={40} />
 * ```
 */
export function ColorChip({
  color,
  size = 'medium',
  customSize,
  selected = false,
  onClick,
  className = '',
}: ColorChipProps) {
  const chipSize = 
    size === 'small' ? 8 :
    size === 'medium' ? 30 :
    customSize || 30;

  const chipStyle = {
    width: `${chipSize}px`,
    height: `${chipSize}px`,
    backgroundColor: color,
  };

  // onClick이 있으면 클릭 가능한 버튼, 없으면 표시만
  const isClickable = onClick !== undefined;

  return (
    <button
      type="button"
      className={`
        ${styles.colorChip} 
        ${selected ? styles.selected : ''} 
        ${isClickable ? styles.clickable : ''}
        ${className}
      `.trim()}
      style={chipStyle}
      onClick={onClick}
      disabled={!isClickable}
      aria-label={`색상 ${color} ${selected ? '선택됨' : ''}`}
    >
      {selected && (
        <Image
          src="/icons/ic-checked.svg"
          alt="선택됨"
          width={chipSize * 0.6}
          height={chipSize * 0.6}
          className={styles.checkIcon}
        />
      )}
    </button>
  );
}