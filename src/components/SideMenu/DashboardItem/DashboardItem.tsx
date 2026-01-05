'use client';

import { ColorChip } from '@/components/Chip/ColorChip';
import styles from './DashboardItem.module.css';

interface DashboardItemProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

export default function DashboardItem({
  id,
  title,
  color,
  createdByMe,
  isSelected = false,
  onClick,
}: DashboardItemProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <li>
      {/* button → div + role="button" */}
      <div
        role="button"
        tabIndex={0}
        className={`${styles.item} ${isSelected ? styles.selected : ''}`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`${title} 대시보드${createdByMe ? ' (내가 만듦)' : ''}`}
      >
        <ColorChip color={color} size="small" />
        <span className={styles.title}>{title}</span>
        {createdByMe && (
          <img
            src="/icons/crown.svg"
            alt="내가 만든 대시보드"
            className={styles.crown}
          />
        )}
      </div>
    </li>
  );
}