'use client';

import CreateDashBoard from '@/components/Modals/domains/DashBoard/CreateDashBoard';
import Modal from '@/components/Modals/Modal';

/**
 * Renders a page that displays the CreateDashBoard component inside a Modal.
 *
 * @returns A React element containing a div with a Modal that wraps the CreateDashBoard component.
 */
export default function page() {
  return (
    <div>
      <Modal>
        <CreateDashBoard />
      </Modal>
    </div>
  );
}