'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';

type CreateInviteRequest = {
  email: string;
};

/**
 * CreateInvite 컴포넌트
 *
 * @description
 * 특정 대시보드에 사용자를 초대하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 사용자로부터 사용자 아이디(이메일)를 입력받아 초대 요청을 트리거합니다.
 *
 * 초대가 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal>
 *   <CreateInvite />
 * </Modal>
 *
 */

export default function CreateInvite() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');

  async function requestCreateColumn(payload: CreateInviteRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create invite payload:', payload);
  }

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
