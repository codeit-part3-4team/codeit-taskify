'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';

type CreateInviteRequest = {
  email: string;
};

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
