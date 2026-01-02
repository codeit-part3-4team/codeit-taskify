'use client';

import CreateDashBoard from '@/components/Modals/domains/DashBoard/CreateDashBoard';
import Modal from '@/components/Modals/Modal';

export default function page() {
  return (
    <div>
      <Modal>
        <CreateDashBoard />
      </Modal>
    </div>
  );
}
