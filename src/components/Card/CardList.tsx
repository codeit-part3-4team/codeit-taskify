'use client';

import CardItem from '@/components/Card/CardItem';
import { CardUI } from '@/components/Card/CardUI.type';

export const mockCards: CardUI[] = [
  {
    id: 0,
    title:
      '로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정로그인 UI 수정',
    tags: ['UI', 'Bug'],
    dueDate: '2026-01-10',
    imageUrl: null,
    profileImageUrl: 'https://picsum.photos/32/32',
  },
  {
    id: 1,
    title: '카드 생성 모달 연결',
    tags: ['Modal'],
    dueDate: null,
    imageUrl: null,
    profileImageUrl: null,
  },
  {
    id: 2,
    title: 'API 연동 준비',
    tags: null,
    dueDate: '2026-01-15',
    imageUrl: 'https://picsum.photos/300/200',
    profileImageUrl: 'https://picsum.photos/32/32',
  },
  {
    id: 3,
    title: '타입 정리 및 리팩토링',
    tags: ['Refactor', 'Type'],
    dueDate: null,
    imageUrl: null,
    profileImageUrl: 'https://picsum.photos/32/32',
  },
];

type CardListProps = {
  cards?: CardUI[];
};

export default function CardList({ cards }: CardListProps) {
  cards = cards ? cards : mockCards;

  return (
    <>
      <ul>
        {cards.map((cardData) => (
          <CardItem key={cardData.id} cardData={cardData} />
        ))}
      </ul>
    </>
  );
}
