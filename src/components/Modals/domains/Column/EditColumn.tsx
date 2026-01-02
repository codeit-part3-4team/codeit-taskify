'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import { ColumnUpdateRequest } from '@/components/Modals/domains/Column/Columns';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';

/**
 * Render a modal for editing a column's title.
 *
 * Displays a form with a single text input initialized from `initialTitle`; submitting the form should persist the change, then the component refreshes the current route and closes the modal.
 *
 * @param initialTitle - The column's initial name to populate the input
 * @returns The modal JSX element used to edit a column title
 */

export default function EditColumn({ initialTitle }: ColumnUpdateRequest) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);

  /**
   * Handle submission of the column-edit form by preventing default behavior, refreshing route data, and closing the modal.
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
        title="컬럼 관리"
        actionsButton={
          <>
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="column-edit-form">
              수정
            </ModalButton>
          </>
        }
      >
        {/* children */}
        <form id="column-edit-form" onSubmit={handleUpdate}>
          <TextInput
            label="이름"
            placeholder="새로운 프로젝트"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </DefaultModal>
    </>
  );
}