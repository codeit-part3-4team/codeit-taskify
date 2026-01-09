'use client';

import Image from 'next/image';
import styles from '@/components/Card/card.module.css';
import IcCalender from '@/assets/icons/IcCalender';
import { CardUI } from './CardUI.type';
import Link from 'next/link';
import { TagChip } from '../Chip/TagChip';
import { useDraggable } from '@dnd-kit/core';
import { CSSProperties } from 'react';

type CardProps = {
  card: CardUI;
  dashboardId: number;
  columnId?: number;
  isOverlay?: boolean;
};

const DUMMY_CARD_IMAGE = 'https://picsum.photos/id/1015/600/400.jpg';
const DUMMY_PROFILE_IMAGE = 'https://picsum.photos/id/1005/40/40.jpg';

export default function CardItem({ card, dashboardId, columnId, isOverlay = false }: CardProps) {
  const cardId = card.id;
  const cardImageSrc = card.imageUrl ?? DUMMY_CARD_IMAGE;
  const profileImageSrc = card.profileImageUrl ?? DUMMY_PROFILE_IMAGE;

  const hasFooter = Boolean(card.dueDate || card.profileImageUrl);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: cardId,
  });

  // isOverlay === false: 원본 카드
  // isOverlay === true: 복사되어 옮겨지는 카드
  const style: CSSProperties = isOverlay
    ? {
        cursor: 'grabbing',
        pointerEvents: 'none',
        zIndex: 2000,
      }
    : {
        cursor: 'grab',
        opacity: isDragging ? 0.3 : 1,
      };

  return (
    <>
      <div
        ref={!isOverlay ? setNodeRef : undefined}
        style={style}
        {...(!isOverlay ? attributes : {})}
      >
        {!isOverlay && (
          <div className={styles.dragHandle} {...listeners}>
            ⋮⋮
          </div>
        )}
        <Link
          href={`/dashboard/${dashboardId}/column/${columnId}/card/${cardId}/detail`}
          scroll={false}
        >
          <div className={styles.cardItem}>
            {cardImageSrc && (
              <div className={styles.imgBox}>
                <Image src={cardImageSrc} alt="cardImage" fill style={{ objectFit: 'cover' }} />
              </div>
            )}

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.cardInfo}>
                {card.tags?.length ? (
                  <ul className={styles.tags}>
                    {card.tags.map((tag) => (
                      <li key={tag}>
                        <TagChip label={tag} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                {hasFooter && (
                  <div className={styles.cardFooter}>
                    {card.dueDate && (
                      <div className={styles.dueDate}>
                        <IcCalender />
                        <span>{card.dueDate}</span>
                      </div>
                    )}

                    {profileImageSrc && (
                      <div className={styles.profileImageBox}>
                        <Image
                          src={profileImageSrc}
                          alt="profileImage"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
