'use client';

import Modal from '@/components/Modals/Modal';
import DefualtModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';

/**
 * Renders a test page containing a modal with default content and action buttons.
 *
 * @returns A React element that displays a header and a modal wrapping a default modal with title, message, and action buttons.
 */
export default function ModalTest() {
  return (
    <>
      <h1>TEST PAGE</h1>
      <Modal>
        <DefualtModal
          title="모달창 입니다."
          message="예쁘게 봐주세요."
          actionsButton={
            <>
              <ModalButton variant="secondary">취소</ModalButton>
              <ModalButton>생성</ModalButton>
            </>
          }
        />
      </Modal>
    </>
  );
}