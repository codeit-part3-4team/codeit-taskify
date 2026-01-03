'use client';

import styles from '@/components/Column/column.module.css';

import Link from 'next/link';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import IcSettings from '@/assets/icons/IcSettings';

type ColumnItemProps = {
  columnData: ColumnUI;
};

export default function Card({ columnData }: ColumnItemProps) {
  return (
    <>
      <div className={styles.columItem}>
        <div className={styles.columInfo}>
          <div className={styles.left}>
            <h3 className={styles.columnTitle}>{columnData.title}</h3>
            {/* 데이터로 바뀌어야 함. */}
            <span className={styles.cardCount}>3</span>
          </div>
          <div className={styles.right}>
            <Link href="/column/edit" aria-label="컬럼 수정" className={styles.columnEditButton}>
              <IcSettings className={styles.settingsIcon} />
            </Link>
          </div>
        </div>
        {/* 카드리스트 들어올 자리 */}
      </div>
    </>
  );
}
