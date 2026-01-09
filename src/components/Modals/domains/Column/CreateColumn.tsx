'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import { useState } from 'react';
import { ColumnCreateRequest } from '@/components/Modals/domains/Column/ModalColumn.type';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';

type CreateColumnProps = {
  dashboardId: number;
};

/**
 * CreateColumn 컴포넌트
 *
 * @description
 * 특정 대시보드에 컬럼을 생성하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 사용자로부터 컬럼 이름을 입력받아 생성 요청을 트리거합니다.
 *
 * 생성이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal>
 *    <CreateColumn />
 * </Modal>
 *
 */

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
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="column-create-form">
              생성
            </ModalButton>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="column-create-form" onSubmit={handleSubmit}>
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
