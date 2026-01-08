'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import EditColumn from '@/components/Modals/domains/Column/EditColumn';
import modalStyles from '@/components/Modals/Modal.module.css';

export default function ColumnModalClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTitle = searchParams.get('title') ?? '';
  const onClose = () => router.back();

  return (
    <div className={`${modalStyles.overlay} ${modalStyles.open}`} onClick={onClose}>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <EditColumn initialTitle={initialTitle} />
      </div>
    </div>
  );
}
