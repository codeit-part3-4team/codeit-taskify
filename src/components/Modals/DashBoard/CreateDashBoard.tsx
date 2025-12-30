'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import { DashboardCreateRequest } from './dashboard';
import TextInput from '@/components/Input/TextInput/TextInput';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';

export default function CreateDashBoard() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#AbDA7D');

  async function requestCreateDashboard(payload: DashboardCreateRequest): Promise<void> {
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
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="dashboard-create-form">
              생성
            </ModalButton>
          </>
        }
      >
        <form id="dashboard-create-form" onSubmit={handleSubmit}>
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
