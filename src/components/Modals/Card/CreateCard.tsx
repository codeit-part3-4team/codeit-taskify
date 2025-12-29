'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '../DefualtModal';
import { useState } from 'react';
import { CardCreateRequest } from './Card';

type CreateCardProps = {
  dashboardId: number;
  columnId: number;
};

export default function CreateCard({ dashboardId, columnId }: CreateCardProps) {
  const router = useRouter();

  const [assigneeUserId, setAssigneeUserId] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function requestCreateCard(payload: CardCreateRequest): Promise<void> {
    // TODO: 나중에 API 붙이면 여기만 수정
    console.log('create card payload:', payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestCreateCard({
      title,
      assigneeUserId,
      dashboardId,
      columnId,
      description,
      dueDate,
      tags,
      imageUrl: imageFile ? imageFile.name : '',
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
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button type="submit" form="card-create-form">
              생성
            </button>
          </>
        }
      >
        {/* children */}
        {/* 컴포넌트로 변경 */}
        <form id="card-create-form" onSubmit={handleSubmit}>
          <input type="text" /> {/* 담당자 dropdown */}
          <label htmlFor="card-title">제목</label>
          <input
            id="card-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            required
          />
          <label htmlFor="card-description">설명</label>
          <textarea
            id="card-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명을 입력해 주세요"
            required
          />
          <label htmlFor="card-dueDate">마감일</label>
          <input type="text" id="card-dueDate" /> {/* datepicker */}
          <label htmlFor="card-tag-input">태그</label>
          <input id="card-tag-input" type="text" placeholder="입력 후 Enter" />
          <label htmlFor="card-image">이미지</label>
          <input id="card-image" type="file" />
        </form>
      </DefaultModal>
    </>
  );
}
