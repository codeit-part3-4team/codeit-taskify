import ColumnItem from '@/components/Column/ColumnItem';
import styles from '@/components/Column/column.module.css';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import Link from 'next/link';
import AddColumnButton from '@/components/Buttons/domains/dashboard/AddColumnButton/AddColumnButton';
import { CardUI } from '@/components/Card/CardUI.type';

type ColumnListProps = {
  columns: ColumnUI[];
  cardsByColumn: CardUI[][];
  dashboardId: number;
  className?: string;
};

export default function ColumnList({
  columns,
  cardsByColumn,
  className = '',
  dashboardId,
}: ColumnListProps) {
  return (
    <>
      <div className={`${styles.columnList} ${className}`}>
        {columns.map((column, index) => (
          <ColumnItem
            key={column.id}
            column={column}
            cards={cardsByColumn[index]}
            dashboardId={dashboardId}
          />
        ))}
        <div className={styles.columnAddButtonBox}>
          <Link href={`${dashboardId}/column/create`}>
            <AddColumnButton />
          </Link>
        </div>
      </div>
    </>
  );
}
