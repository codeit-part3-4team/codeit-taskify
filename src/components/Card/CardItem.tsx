'use client';

import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import styles from '@/components/Card/card.module.css';

export type CardUI = {
  title: string;
  tags?: string[] | null;
  dueDate?: string | null;
  imageUrl?: string | StaticImport | null;
  profileImageUrl?: string | StaticImport | null;
};

const dummyCardData = {
  title: '새로운 일정 관리',
  tags: ['프로젝트', '백엔드', '상'],
  dueDate: '2025.12.31',
  imageUrl: 'https://picsum.photos/200/200',
  profileImageUrl: 'https://picsum.photos/50/50',
};

export default function Card({ cardData }: { cardData?: CardUI }) {
  const card = cardData ?? dummyCardData;

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
          {card.tags && (
            <ul className={styles.tagBox}>
              {card.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {card.dueDate && <p className={styles.dueDate}>{card.dueDate}</p>}
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
      </div>
    </>
  );
}
