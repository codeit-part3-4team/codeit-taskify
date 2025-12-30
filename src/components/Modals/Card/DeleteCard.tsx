'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';

export default function DeleteCard() {
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
        message="이 카드를 정말 삭제하시겠습니까?"
        actionsButton={
          <>
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="card-delete-form">
              삭제
            </ModalButton>
          </>
        }
      >
        <form id="card-delete-form" onSubmit={handleDelete}></form>
      </DefaultModal>
    </>
  );
}
