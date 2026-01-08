import { Suspense } from 'react';
import ColumnModalClient from './ColumnModalClient';

export default function ColumnModalPage() {
  return (
    <Suspense fallback={null}>
      <ColumnModalClient />
    </Suspense>
  );
}
