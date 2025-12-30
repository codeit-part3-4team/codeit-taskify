'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { ColumnUpdateRequest } from './columns';
import { useState } from 'react';

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
            {/* 버튼 컴포넌트 추가 */}
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit" form="column-edit-form">
              수정
            </button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="column-edit-form" onSubmit={handleUpdate}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="대시보드 이름"
            required
          />
        </form>
      </DefaultModal>
    </>
  );
}
