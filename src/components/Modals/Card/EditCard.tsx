'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import { CardServerResponse, UpdateCardRequest } from './Card';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import TextInput from '@/components/Input/TextInput/TextInput';
import DateInput from '@/components/Input/DateInput/DateInput';
import TagInput from '@/components/Input/TagInput/TagInput';

type EditCardProps = {
  cardData: CardServerResponse;
};

export default function EditCard({ cardData: initialValue }: EditCardProps) {
  const router = useRouter();

  const [assigneeUserId, setAssigneeUserId] = useState<number | null>(
    initialValue.assignee?.id ?? null,
  );
  const [title, setTitle] = useState(initialValue.title);
  const [description, setDescription] = useState(initialValue.description);
  const [dueDate, setDueDate] = useState(initialValue.dueDate);
  const [tags, setTags] = useState<string[]>(initialValue.tags ?? []);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function requestUpdateCard(payload: UpdateCardRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('update card payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestUpdateCard({
      title,
      description,
      columnId: initialValue.columnId,
      assigneeUserId: assigneeUserId ?? undefined,
      dueDate: dueDate || undefined,
      tags,
      imageUrl: imageFile ? imageFile.name : undefined,
    });

    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
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
        <form id="card-create-form" onSubmit={handleSubmit}>
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
            value={dueDate ?? ''}
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
