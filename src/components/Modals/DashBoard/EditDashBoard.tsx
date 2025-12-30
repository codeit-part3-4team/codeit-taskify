'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { DashBoardUpdateRequest } from './dashboard';
import { useState } from 'react';

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
            {/* 버튼 컴포넌트 추가 */}
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit" form="dashboard-edit-form">
              수정
            </button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="dashboard-edit-form" onSubmit={handleUpdate}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="대시보드 이름"
            required
          />

          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </form>
      </DefaultModal>
    </>
  );
}
