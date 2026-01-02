'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefualtModal';
import { useState } from 'react';
import { DashboardCreateRequest } from '@/components/Modals/domains/DashBoard/DashBoard';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * Renders a modal UI for creating a new dashboard.
 *
 * Collects a dashboard title and color, triggers a creation request, refreshes the current route, and closes the modal by navigating back.
 *
 * This component is intended to be rendered inside a Parallel Routes `@modal` slot.
 */

export default function CreateDashBoard() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#AbDA7D');

  /**
   * Submit a dashboard creation request.
   *
   * Currently a placeholder that logs the provided payload; replace this with an API call
   * that creates a dashboard on the server.
   *
   * @param payload - Data for the new dashboard (e.g., title and color)
   */
  async function requestCreateDashboard(payload: DashboardCreateRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create dashboard payload:', payload);
  }

  /**
   * Handle form submission to create a new dashboard, refresh current route data, and close the modal.
   *
   * @returns void
   */
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