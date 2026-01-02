'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * Renders a confirmation modal that deletes the current dashboard.
 *
 * Triggers a dashboard deletion flow when submitted, then refreshes the current route and navigates back to close the modal. Intended to be rendered inside a Parallel Routes `@modal` slot.
 *
 * @example
 * // Rendered inside a modal layout via the `@modal` slot
 * <Modal>
 *   <DeleteDashBoard />
 * </Modal>
 */

export default function DeleteDashBoard() {
  const router = useRouter();

  /**
   * Handle submission of the dashboard delete form, refresh the page, and close the modal.
   *
   * Prevents the form's default submission, (optionally) performs the delete request, refreshes
   * the current route to reflect changes, and navigates back to close the modal.
   *
   * @param e - The form submission event for the dashboard delete action
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