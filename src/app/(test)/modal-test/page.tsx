'use client';

import Modal from '@/components/Modals/Modal';
import DefualtModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';

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
