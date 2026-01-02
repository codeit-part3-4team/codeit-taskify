'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';

type EditDashBoardProps = {
  title: string;
  color: string;
};

/**
 * Modal for editing a dashboard.
 *
 * Renders a modal that lets the user edit a dashboard's title and color. On form submission it triggers the update flow (PATCH), refreshes the current route, and closes the modal by navigating back.
 *
 * @param initialTitle - Initial value for the dashboard title shown in the form
 * @param initialColor - Initial value for the dashboard color (hex color string) shown in the color input
 */

export default function EditDashBoard({
  title: initialTitle,
  color: initialColor,
}: EditDashBoardProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  /**
   * Handle dashboard edit form submission by refreshing route data and closing the modal.
   *
   * Prevents the form's default submit behavior, refreshes the current route so updated
   * data is re-fetched, and navigates back to close the modal.
   *
   * @param e - The form submission event
   */
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ PATCH 요청
    // await updateCard();
    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        title="대시보드 수정"
        actionsButton={
          <>
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="dashboard-edit-form">
              수정
            </ModalButton>
          </>
        }
      >
        <form id="dashboard-edit-form" onSubmit={handleUpdate}>
          <TextInput
            label="대시보드 이름"
            placeholder="새로운 프로젝트"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 컴포넌트로 변경 */}
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />{' '}
        </form>
      </DefaultModal>
    </>
  );
}