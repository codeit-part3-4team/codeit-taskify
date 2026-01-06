'use client';

import styles from '@/components/Column/column.module.css';

import Link from 'next/link';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import IcSettings from '@/assets/icons/IcSettings';
import { CardUI } from '@/components/Card/CardUI.type';
import CardList from '@/components/Card/CardList';

type ColumnItemProps = {
  column: ColumnUI;
  cards: CardUI[];
};

export default function Card({ column, cards }: ColumnItemProps) {
  return (
    <>
      <div className={styles.columItem}>
        <div className={styles.columInfo}>
          <div className={styles.left}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <span className={styles.cardCount}>{column.cardCount}</span>
          </div>
          <div className={styles.right}>
            <Link href="/column/edit" aria-label="컬럼 수정" className={styles.columnEditButton}>
              <IcSettings className={styles.settingsIcon} />
            </Link>
          </div>
        </div>
        <div className={styles.CardList}>
          <CardList cards={cards} />
        </div>
      </div>
    </>
  );
}
