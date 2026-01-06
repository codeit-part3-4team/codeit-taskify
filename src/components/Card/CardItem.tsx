'use client';

import Image from 'next/image';
import styles from '@/components/Card/card.module.css';
import IcCalender from '@/assets/icons/IcCalender';
import { CardUI } from './CardUI.type';

type CardProps = {
  card: CardUI;
};

export default function Card({ card }: CardProps) {
  const hasFooter = Boolean(card.dueDate || card.profileImageUrl);

  return (
    <>
      <div className={styles.cardItem}>
        {card.imageUrl && (
          <div className={styles.imgBox}>
            <Image src={card.imageUrl} alt="cardImage" fill style={{ objectFit: 'cover' }} />
          </div>
        )}

        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <div className={styles.cardInfo}>
            {card.tags && (
              <ul className={styles.tagBox}>
                {card.tags.map((tag, index) => (
                  <li key={`${tag}-${index}`} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {hasFooter && (
              <div className={styles.cardFooter}>
                {card.dueDate && (
                  <div className={styles.dueDate}>
                    <IcCalender />
                    <span>{card.dueDate}</span>
                  </div>
                )}

                {card.profileImageUrl && (
                  <div className={styles.profileImageBox}>
                    <Image
                      src={card.profileImageUrl}
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
    </>
  );
}
