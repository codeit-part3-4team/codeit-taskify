'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * DeleteColumn 컴포넌트
 *
 * @description
 * 컬럼을 삭제하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 사용자로부터 삭제 요청을 트리거합니다.
 *
 * 삭제가 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal>
 *    <DeleteColumn />
 * </Modal>
 *
 */

export default function DeleteColumn() {
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
