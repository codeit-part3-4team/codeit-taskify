'use client';

import Image from 'next/image';
import styles from '@/components/Card/card.module.css';
import IcCalender from '@/assets/icons/IcCalender';
import { CardUI } from './CardUI.type';
import Link from 'next/link';
import { TagChip } from '../Chip/TagChip';

type CardProps = {
  card: CardUI;
  dashboardId: number;
  columnId: number;
};

const DUMMY_CARD_IMAGE = 'https://picsum.photos/id/1015/600/400.jpg';
const DUMMY_PROFILE_IMAGE = 'https://picsum.photos/id/1005/40/40.jpg';

export default function Card({ card, dashboardId, columnId }: CardProps) {
  const cardId = card.id;
  const cardImageSrc = card.imageUrl ?? DUMMY_CARD_IMAGE;
  const profileImageSrc = card.profileImageUrl ?? DUMMY_PROFILE_IMAGE;

  const hasFooter = Boolean(card.dueDate || card.profileImageUrl);

  return (
    <>
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
    </>
  );
}
