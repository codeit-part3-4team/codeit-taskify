'use client';

import Modal from '@/components/Modals/Modal';
import CreateDashBoard from '@/components/Modals/domains/DashBoard/CreateDashBoard';

export default function ModalTest() {
  return (
    <>
      <h1>TEST PAGE</h1>

      <Modal>
        <CreateDashBoard />
      </Modal>
    </>
  );
}
