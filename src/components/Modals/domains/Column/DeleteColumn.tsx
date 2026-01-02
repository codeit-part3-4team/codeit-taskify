'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * Render a confirmation modal that triggers deletion of a column.
 *
 * This component is intended to be rendered inside a Parallel Routes `@modal` slot.
 * Submitting the modal triggers the delete flow, refreshes the current route, and then
 * closes the modal by navigating back.
 *
 * @returns A React element representing the delete-confirmation modal for a column.
 */

export default function DeleteColumn() {
  const router = useRouter();

  /**
   * Handle the column-delete form submission by preventing default behavior, issuing the delete action, refreshing the current route, and navigating back to close the modal.
   *
   * @param e - The form submission event
   */
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