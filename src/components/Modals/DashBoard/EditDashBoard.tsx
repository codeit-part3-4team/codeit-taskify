'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { DashBoardUpdateRequest } from './dashboard';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';

export default function EditDashBoard({ initialTitle, initialColor }: DashBoardUpdateRequest) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ PATCH 요청
    await updateCard();
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
