import AddColumnButton from '@/components/Buttons/domains/dashboard/AddColumnButton/AddColumnButton';
import ColumnItem from '@/components/Column/ColumnItem';
import ColumnList from '@/components/Column/ColumnList';
import Link from 'next/link';

export default async function page() {
  return (
    <div>
      <ColumnList />
    </div>
  );
}
