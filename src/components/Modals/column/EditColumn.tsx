'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { ColumnUpdateRequest } from './columns';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';

export default function EditColumn({ initialTitle }: ColumnUpdateRequest) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);

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
