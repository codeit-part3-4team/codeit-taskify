'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from './DefualtModal';
import { useState } from 'react';

export type CreateDashboardPayload = {
  title: string;
  color: string;
};

export default function CreateDashBoard() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#AbDA7D');

  async function requestCreateDashboard(payload: CreateDashboardPayload): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create dashboard payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestCreateDashboard({ title, color });

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        title="새로운 대시보드"
        actionsButton={
          <>
            {/* 버튼 컴포넌트 추가 */}
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit">생성</button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form onSubmit={handleSubmit}>
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
