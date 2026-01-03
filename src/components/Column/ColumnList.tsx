'use client';

import ColumnItem from '@/components/Column/ColumnItem';
import styles from '@/components/Column/column.module.css';
import { columnUI } from './columnUI.type';
import Link from 'next/link';
import AddColumnButton from '../Buttons/domains/dashboard/AddColumnButton/AddColumnButton';

const mockColumns: columnUI[] = [
  {
    id: 1,
    title: 'To Do',
    teamId: 'team-20-4',
    createdAt: '2026-01-01T09:00:00.000Z',
    updatedAt: '2026-01-01T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'In Progress',
    teamId: 'team-20-4',
    createdAt: '2026-01-01T09:05:00.000Z',
    updatedAt: '2026-01-02T10:30:00.000Z',
  },
  {
    id: 3,
    title: 'Done',
    teamId: 'team-20-4',
    createdAt: '2026-01-01T09:10:00.000Z',
    updatedAt: '2026-01-03T14:20:00.000Z',
  },
];

type ColumnListProps = {
  columns?: columnUI[];
};

export default function ColumnList({ columns }: ColumnListProps) {
  const columnList = columns ?? mockColumns;

  return (
    <>
      <div className={styles.columnList}>
        {columnList.map((columnData) => {
          console.log(columnData);
          return <ColumnItem key={columnData.id} columnData={columnData} />;
        })}
        <div>
          <Link href={'/column/create'}>
            <AddColumnButton />
          </Link>
        </div>
      </div>
    </>
  );
}
