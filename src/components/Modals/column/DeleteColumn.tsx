'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';

export default function DeleteColumn() {
  const router = useRouter();

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ DELETE 요청
    await deleteCard();
    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        message="컬럼의 모든 카드가 삭제됩니다."
        actionsButton={
          <>
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="column-delete-form">
              삭제
            </ModalButton>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="column-delete-form" onSubmit={handleDelete}></form>
      </DefaultModal>
    </>
  );
}
