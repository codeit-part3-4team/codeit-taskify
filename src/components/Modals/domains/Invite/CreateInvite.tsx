'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';

type CreateInviteRequest = {
  email: string;
};

/**
 * Renders a modal that invites a user to the current dashboard by email.
 *
 * The component displays a form with an email input and action buttons; submitting the form sends an invite request, refreshes the current route data, and closes the modal to return to the previous route.
 *
 * @example
 * // Rendered inside a modal slot
 * <Modal>
 *   <CreateInvite />
 * </Modal>
 */

export default function CreateInvite() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');

  /**
   * Create an invite for the specified email address.
   *
   * This is a placeholder that will invoke the backend API to create an invite; currently it logs the payload for debugging.
   *
   * @param payload - Object containing the `email` of the user to invite
   */
  async function requestCreateColumn(payload: CreateInviteRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create invite payload:', payload);
  }

  /**
   * Handle the invite form submission: send the invite request, refresh route data, and close the modal.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestCreateColumn({ email });

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        title="초대하기"
        actionsButton={
          <>
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="column-create-form">
              생성
            </ModalButton>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="column-create-form" onSubmit={handleSubmit}>
          <TextInput
            label="이메일"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </DefaultModal>
    </>
  );
}