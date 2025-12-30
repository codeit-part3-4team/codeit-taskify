'use client';

/**
 * EditColumn 컴포넌트
 *
 * @description
 * 특정 대시보드에 컬럼을 수정하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 사용자로부터 컬럼 이름을 입력받아 수정 요청을 트리거합니다.
 *
 * 수정이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀합니다.
 *
 *
 * @example
 * // @modal 슬롯에서 Modal 레이아웃 내부에 포함되어 렌더링
 * <Modal>
 *    <EditColumn />
 * </Modal>
 *
 */

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
