'use client';

import Modal from '@/components/Modals/Modal';
import DefualtModal from '@/components/Modals/DefualtModal';
import { useRouter } from 'next/navigation';
import CreateDashBoard from '@/components/Modals/DashBoard/CreateDashBoard';
import CreateColumn from '@/components/Modals/column/CreateColumn';
import DeleteColumn from '@/components/Modals/column/DeleteColumn';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Modal>
        <DeleteColumn />
      </Modal>
    </>
  );
}
