'use client';

/**
 * EditDashBoard 컴포넌트
 *
 * @description
 * 대시보드 수정을 담당하는 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯을 통해 렌더링되며,
 * 사용자 입력을 수집해 수정 요청을 트리거 합니다.
 *
 * 수정이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal size="large">
 *    <EditDashBoard />
 * </Modal>
 *
 */

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';

type EditDashBoardProps = {
  title: string;
  color: string;
};

export default function EditDashBoard({
  title: initialTitle,
  color: initialColor,
}: EditDashBoardProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ PATCH 요청
    // await updateCard();
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
