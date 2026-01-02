'use client';

import styles from '@/components/Column/column.module.css';
import AddColumnButton from '../Buttons/domains/dashboard/AddColumnButton/AddColumnButton';
import Link from 'next/link';

export type ColumnUI = {
  title: string;
};

const dummyColumnData = {
  title: 'To Do',
};

export default function Card({ columnData }: { columnData?: ColumnUI }) {
  const column = columnData ?? dummyColumnData;

  return (
    <>
      <div className={styles.columItem}>
        <div className={styles.columInfo}>
          <div className={styles.left}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            {/* 데이터로 바뀌어야 함. */}
            <span className={styles.cardCount}>3</span>
          </div>
          <div className={styles.right}>
            <Link
              href="column/edit"
              role="dialog"
              aria-label="컬럼 수정 모달 열기"
              className={styles.columnEditButton}
            />
          </div>
        </div>

        <div className={styles.cardAddButton}>
          <Link href={'/column/create'}>
            <AddColumnButton />
          </Link>
        </div>
        {/* 카드리스트 들어올 자리 */}
      </div>
    </>
  );
}
