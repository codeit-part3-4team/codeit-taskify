'use client';

import styles from '@/components/Column/column.module.css';

import Link from 'next/link';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import IcSettings from '@/assets/icons/IcSettings';
import { CardUI } from '@/components/Card/CardUI.type';
import CardList from '@/components/Card/CardList';
import AddTodoButton from '../Buttons/domains/dashboard/AddTodoButton/AddTodoButton';
import { useDroppable } from '@dnd-kit/core';

type ColumnItemProps = {
  column: ColumnUI;
  cards: CardUI[];
  dashboardId: number;
};

export default function ColumnItem({ column, cards, dashboardId }: ColumnItemProps) {
  const columnId = column.id;

  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  return (
    <>
      <div className={styles.columItem}>
        <div className={styles.columInfo}>
          <div className={styles.left}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <span className={styles.cardCount}>{column.cardCount}</span>
          </div>
          <div className={styles.right}>
            <Link
              href={`/column/${columnId}/edit`}
              aria-label="컬럼 수정"
              className={styles.columnEditButton}
            >
              <IcSettings className={styles.settingsIcon} />
            </Link>
          </div>
        </div>

        <div className={styles.cardAddButton}>
          <Link href={'/card/create'} aria-label="카드 추가">
            <AddTodoButton />
          </Link>
        </div>
        <div
          className={styles.cardList}
          ref={setNodeRef}
          style={{
            background: isOver ? 'rgba(85, 52, 218, 0.08)' : '#fafafa',
          }}
        >
          <CardList cards={cards} dashboardId={dashboardId} columnId={column.id} />
        </div>
      </div>
    </>
  );
}
