'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import { useState } from 'react';
import { DashboardCreateRequest } from '@/components/Modals/domains/DashBoard/ModalDashBoard.type';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';

/**
 * CreateDashBoard 컴포넌트
 *
 * @description
 * 대시보드 생성을 담당하는 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯을 통해 렌더링되며,
 * 사용자 입력을 수집해 생성 요청을 트리거 합니다.
 *
 * 생성이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal size="large">
 *    <CreateDashBoard />
 * </Modal>
 *
 */

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
