import { Suspense } from 'react';
import InviteModalClient from './InviteModalClient';

export default function InviteModalPage() {
  return (
    <Suspense fallback={null}>
      <InviteModalClient />
    </Suspense>
  );
}
