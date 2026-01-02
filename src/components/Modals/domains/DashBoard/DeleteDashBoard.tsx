'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * DeleteDashBoard 컴포넌트
 *
 * @description
 * 대시보드 삭제를 담당하는 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯을 통해 렌더링되며,
 * 사용자로부터 삭제 요청을 트리거 합니다.
 *
 * 삭제가 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal>
 *    <DeleteDashBoard />
 * </Modal>
 *
 */

export default function DeleteDashBoard() {
  const router = useRouter();

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ DELETE 요청
    // await deleteCard();
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
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="dashboard-delete-form">
              삭제
            </ModalButton>
          </>
        }
      >
        <form id="dashboard-delete-form" onSubmit={handleDelete}></form>
      </DefaultModal>
    </>
  );
}
