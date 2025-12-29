'use client';

import Modal from '@/components/Modals/Modal';
import DefualtModal from '@/components/Modals/DefualtModal';
import { useRouter } from 'next/navigation';
import InputModal from '@/components/Modals/InputModal';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Modal>
        <DefualtModal
          title="새 컬럼 생성"
          message="컬럼의 모든 카드가 삭제됩니다."
          actionsButton={<button onClick={() => router.back()}>확인</button>}
        />
      </Modal>
      <Modal>
        <InputModal
          title="새 컬럼 생성"
          message="인풋모달 입니다."
          actionsButton={<button onClick={() => router.back()}>확인</button>}
          closeButton={true}
        />
      </Modal>
    </>
  );
}
