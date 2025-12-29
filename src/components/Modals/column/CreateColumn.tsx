'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import { ColumnCreateRequest } from './columns';

type CreateColumnProps = {
  dashboardId: number;
};

export default function CreateColumn({ dashboardId }: CreateColumnProps) {
  const router = useRouter();

  const [title, setTitle] = useState('');

  async function requestCreateColumn(payload: ColumnCreateRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create dashboard payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestCreateColumn({ title, dashboardId });

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        title="새 컬럼 생성"
        actionsButton={
          <>
            {/* 버튼 컴포넌트 추가 */}
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit" form="column-create-form">
              생성
            </button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="column-create-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새 컬럼 이름"
            required
          />
        </form>
      </DefaultModal>
    </>
  );
}
