'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import { ChangeEvent, useState } from 'react';
import { CardCreateRequest } from '@/components/Modals/domains/Card/ModalCard.type';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import DateInput from '@/components/Input/domains/todo/DateInput/DateInput';
import TagInput from '@/components/Input/domains/todo/TagInput/TagInput';
import styles from '@/components/Modals/Modal.module.css';
import ImageInput from '@/components/Input/domains/todo/ImageInput/ImageInput';

type CreateCardProps = {
  dashboardId: number;
  columnId: number;
};

/**
 * CreateCard 컴포넌트
 *
 * @description
 * 특정 대시보드와 컬럼에 속한 카드를 생성하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 카드 생성에 필요한 입력값을 수집해 생성 요청을 트리거 합니다.
 *
 * 생성이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀 합니다.
 *
 * @example
 * <Modal size="large">
 *   <CreateCard />
 * </Modal>
 *
 */

export default function CreateCard({ dashboardId, columnId }: CreateCardProps) {
  const router = useRouter();

  const [assigneeUserId, setAssigneeUserId] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function requestCreateCard(payload: CardCreateRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create card payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: CardCreateRequest = {
      dashboardId,
      columnId,
      title,
      description,
    };

    if (assigneeUserId) payload.assigneeUserId = assigneeUserId;
    if (dueDate) payload.dueDate = dueDate;
    if (tags.length > 0) payload.tags = tags;
    if (imageFile) payload.imageUrl = imageFile.name;

    await requestCreateCard(payload);

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  function handleImageChange(file: File | null) {
    setImageFile(file);
  }

  return (
    <>
      <DefaultModal
        title="할 일 생성"
        actionsButton={
          <>
            {/* 버튼 컴포넌트 추가 */}
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="card-create-form">
              생성
            </ModalButton>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="card-create-form" onSubmit={handleSubmit} className={styles.cardForm}>
          {/* 담당자 dropdown으로 변경 */}
          <TextInput
            label="담당자"
            placeholder="이름을 입력해 주세요"
            value={assigneeUserId}
            onChange={(e) => setAssigneeUserId(Number(e.target.value))}
          />
          <TextInput
            label="제목"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextInput
            label="설명"
            placeholder="설명을 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <DateInput
            label="마감일"
            placeholder="날짜를 입력해 주세요"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <TagInput label="태그" placeholder="입력 후 Enter" tags={tags} onTagsChange={setTags} />

          {/* 컴포넌트로 교체 */}
          <ImageInput label="이미지" onChange={handleImageChange} />
        </form>
      </DefaultModal>
    </>
  );
}
