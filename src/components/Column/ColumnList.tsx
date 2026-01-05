import ColumnItem from '@/components/Column/ColumnItem';
import styles from '@/components/Column/column.module.css';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import Link from 'next/link';
import AddColumnButton from '../Buttons/domains/dashboard/AddColumnButton/AddColumnButton';

type ColumnListProps = {
  columns: ColumnUI[];
};

export default function ColumnList({ columns }: ColumnListProps) {
  return (
    <>
      <div className={styles.columnList}>
        {columns.map((column) => {
          return <ColumnItem key={column.id} column={column} />;
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
