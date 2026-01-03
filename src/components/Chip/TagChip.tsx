import styles from '@/components/Chip/TagChip.module.css';

export const TAG_COLORS = [
  { bg: '#F9EEE3', text: '#D58D49' },  // 주황
  { bg: '#E7F7DB', text: '#86D549' },  // 초록
  { bg: '#F7DBF0', text: '#D549B6' },  // 분홍
  { bg: '#DBE6F7', text: '#4981D5' },  // 파랑
  { bg: '#F1EFFD', text: '#9F8CEB' },  // 보라
  { bg: '#DBF7F0', text: '#49D5B6' },  // 민트
  { bg: '#FFE8E8', text: '#FF6B6B' },  // 복숭아
  { bg: '#FFF5D9', text: '#E5B800' },  // 노랑
];

/* 태그 이름을 기반으로 일관된 색상을 반환 같은 태그는 항상 같은 색상을 가짐 */
function getTagColor(tagName: string): { bg: string; text: string } {
  // 문자열 해시 생성
  const hash = tagName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // 해시를 색상 인덱스로 변환
  const index = Math.abs(hash) % TAG_COLORS.length;
  
  return TAG_COLORS[index];
}

type TagChipProps = {
  label: string;
  color?: { bg: string; text: string };
  onDelete?: () => void;
  className?: string;
};

/**
 * TagChip 컴포넌트
 * 
 * @description 할 일의 태그를 표시하는 Chip 컴포넌트입니다.
 * 태그 이름을 기반으로 자동으로 색상이 할당됩니다.
 * 
 * @example
 * ```tsx
 * // 자동 색상 (해시 기반)
 * <TagChip label="프로젝트" />
 * <TagChip label="백엔드" />
 * 
 * // 직접 색상 지정
 * <TagChip 
 *   label="프로젝트" 
 *   color={{ bg: '#F9EEE3', text: '#D58D49' }}
 * />
 * 
 * // 삭제 가능
 * <TagChip 
 *   label="프로젝트" 
 *   onDelete={() => handleDelete('프로젝트')}
 * />
 * ```
 * 
 */
export function TagChip({
  label,
  color,
  onDelete,
  className = '',
}: TagChipProps) {
  // 색상 자동 할당 또는 직접 지정
  const chipColor = color || getTagColor(label);

  return (
    <span 
      className={`${styles.tagChip} ${className}`.trim()}
      style={{
        backgroundColor: chipColor.bg,
        color: chipColor.text,
      }}
      aria-label={`태그: ${label}`}
    >
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
          aria-label={`${label} 태그 삭제`}
        >
          {/* &times; = × (곱셈 기호, 닫기 아이콘) */}
          &times;
        </button>
      )}
    </span>
  );
}