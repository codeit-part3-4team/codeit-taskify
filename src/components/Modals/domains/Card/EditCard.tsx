'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import { useState } from 'react';
import { CardServerResponse, UpdateCardRequest } from '@/components/Modals/domains/Card/ModalCard';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import DateInput from '@/components/Input/domains/todo/DateInput/DateInput';
import TagInput from '@/components/Input/domains/todo/TagInput/TagInput';
import styles from '@/components/Modals/Modal.module.css';

const dummyCard: CardServerResponse = {
  id: 14842,
  title: '카드 테스트',
  dashboardId: 17226,
  description: '컬럼에 카드 생성',
  tags: [],
  dueDate: null,
  assignee: null,
  imageUrl: null,
  teamId: '20-4',
  columnId: 58140,
  createdAt: '2025-12-26T19:37:00.789Z',
  updatedAt: '2025-12-26T19:37:00.789Z',
};

/**
 * EditCard 컴포넌트
 *
 * @description
 * 카드를 수정하기 위한 모달 컴포넌트 입니다.
 * Parallel Routes의 `@modal` 슬롯에서 `Modal` 내부에 렌더링되며,
 * 카드 수정에 필요한 입력값을 수집해 수정 요청을 트리거 합니다.
 *
 * 수정이 완료되면 현재 라우트를 갱신한 뒤
 * `router.back()`을 통해 모달을 닫고 이전 화면(route)으로 복귀 합니다.
 *
 * @example
 * <Modal size="large">
 *   <EditCard />
 * </Modal>
 *
 */

export default function EditCard({ cards }: { cards?: CardServerResponse }) {
  const router = useRouter();

  const initialCard = cards ?? dummyCard;

  const [assigneeUserId, setAssigneeUserId] = useState<number | null>(
    initialCard.assignee?.id ?? null,
  );
  const [title, setTitle] = useState(initialCard.title);
  const [description, setDescription] = useState(initialCard.description);
  const [dueDate, setDueDate] = useState(initialCard.dueDate ?? '');
  const [tags, setTags] = useState<string[]>(initialCard.tags ?? []);
  const [imageFile, setImageFile] = useState<string | null>(initialCard.imageUrl);

  async function requestUpdateCard(payload: UpdateCardRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('update card payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 여기서 에러 UI 띄워볼 수도(required 값)
    if (!title.trim()) return;
    if (!description.trim()) return;

    const payload: UpdateCardRequest = {
      title,
      description,
    };

    if (assigneeUserId) payload.assigneeUserId = assigneeUserId;
    if (dueDate) payload.dueDate = dueDate;
    if (tags.length > 0) payload.tags = tags;
    if (imageFile) payload.imageUrl = imageFile;

    await requestUpdateCard(payload);

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal
        title="할 일 수정"
        actionsButton={
          <>
            {/* 버튼 컴포넌트 추가 */}
            <ModalButton variant="secondary" onClick={() => router.back()}>
              취소
            </ModalButton>
            <ModalButton type="submit" form="card-edit-form">
              수정
            </ModalButton>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="card-edit-form" onSubmit={handleSubmit} className={styles.cardForm}>
          {/* 담당자 dropdown으로 변경 */}
          <TextInput
            label="담당자"
            placeholder="이름을 입력해 주세요"
            value={assigneeUserId ?? ''}
            onChange={(e) => setTitle(e.target.value)}
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
          {/* 추후 datepicker로?? */}
          <DateInput
            label="마감일"
            placeholder="날짜를 입력해 주세요"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <TagInput label="태그" placeholder="입력 후 Enter" tags={tags} onTagsChange={setTags} />

          {/* 컴포넌트로 교체 */}
          <label htmlFor="card-image">이미지</label>
          <input id="card-image" type="file" />
        </form>
      </DefaultModal>
    </>
  );
}
