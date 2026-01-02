'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * Renders a confirmation modal to delete a card and closes the modal after deletion.
 *
 * Displays a message asking the user to confirm deletion and provides "취소" and "삭제" actions.
 * When confirmed, performs the deletion (placeholder), refreshes the current route, and navigates back to close the modal.
 *
 * @returns The modal's React element.
 */

export default function DeleteCard() {
  const router = useRouter();

  /**
   * Handle submission of the delete confirmation form: prevents default submission, performs the card deletion request, refreshes the page data, and closes the modal by navigating back.
   *
   * @param e - The form submit event from the delete confirmation form
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