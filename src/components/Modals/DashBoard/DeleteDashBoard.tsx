'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';

export default function DeleteDashBoard() {
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
        message="이 대시보드를 정말 삭제하시겠습니까?"
        actionsButton={
          <>
            {/* 버튼 컴포넌트 추가 */}
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit" form="dashboard-delete-form">
              삭제
            </button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="dashboard-delete-form" onSubmit={handleDelete}></form>
      </DefaultModal>
    </>
  );
}
