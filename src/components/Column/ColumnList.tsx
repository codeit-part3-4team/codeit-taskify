import ColumnItem from '@/components/Column/ColumnItem';
import styles from '@/components/Column/column.module.css';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import Link from 'next/link';
import AddColumnButton from '@/components/Buttons/domains/dashboard/AddColumnButton/AddColumnButton';
import { CardUI } from '@/components/Card/CardUI.type';

type ColumnListProps = {
  columns: ColumnUI[];
  cardsByColumn: CardUI[][];
};

export default function ColumnList({ columns, cardsByColumn }: ColumnListProps) {
  return (
    <>
      <div className={styles.columnList}>
        {columns.map((column, index) => (
          <ColumnItem key={column.id} column={column} cards={cardsByColumn[index]} />
        ))}
        <div>
          <Link href={'/column/create'}>
            <AddColumnButton />
          </Link>
        </div>
      </div>
    </>
  );
}
