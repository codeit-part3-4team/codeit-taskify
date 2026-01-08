'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import styles from '@/app/dashboard/[dashboardId]/dashboardDetail.module.css';
import ColumnList from '@/components/Column/ColumnList';
import { ColumnUI } from '@/components/Column/ColumnUI.type';
import { CardUI } from '@/components/Card/CardUI.type';
import CardItem from '@/components/Card/CardItem';
import { useState } from 'react';
import { updateCard } from '../dashboard.api';
import { useMountedReady } from '@/hooks/useMountedReady';

type ColumnListProps = {
  columns: ColumnUI[];
  cardsByColumn: CardUI[][];
  dashboardId: number;
  className?: string;
};

export default function DashboardDetailClient({
  columns,
  cardsByColumn,
  dashboardId,
}: ColumnListProps) {
  const mounted = useMountedReady();

  const [cardsState, setCardsState] = useState<CardUI[][]>(cardsByColumn);
  const [activeCard, setActiveCard] = useState<CardUI | null>(null);

  function handleDragStart(event: DragStartEvent, cardsByColumn: CardUI[][]) {
    const activeId = event.active.id;

    for (const columnCards of cardsByColumn) {
      const found = columnCards.find((card) => card.id === activeId);
      if (found) {
        setActiveCard(found);
        return;
      }
    }
  }

  // 더 나은 방법: 별도의 에러 상태를 관리
  // const [error, setError] = useState<string | null>(null);

  // // handleDragEnd 내부:
  // try {
  //   await updateCard(cardId, { columnId: toColumnId });
  //   setActiveCard(null);
  // } catch (error) {
  //   console.error('카드 이동 실패:', error);
  //   setCardsState(cardsByColumn); // 초기 상태로 롤백
  //   setError('카드 이동에 실패했습니다.');
  //   // 토스트 알림 표시
  // }

  function handleDragEnd(event: DragEndEvent) {
    // console.log('active:', event.active.id);
    // console.log('over:', event.over?.id);
    // active: 옮긴 카드
    // over: 놔둔 자리
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as number;
    const toColumnId = over.id as number;

    // 1. UI 상태 먼저 변경
    setCardsState((prev) => {
      // fromColumnIndex: 이동할 카드가 원래 들어있던 컬럼의 index
      // fromCardIndex:   그 컬럼 안에서 카드의 위치(index)
      let fromColumnIndex = 0;
      let fromCardIndex = 0;

      // 드래그된 카드(cardId)가 어느 컬럼, 어느 위치에 있는지 찾는다
      prev.forEach((columnCards, colIndex) => {
        const index = columnCards.findIndex((c) => c.id === cardId);
        if (index >= 0) {
          fromColumnIndex = colIndex; // 카드가 있던 컬럼
          fromCardIndex = index; // 그 컬럼 안에서의 카드 위치
        }
      });

      // 2. 드롭된 컬럼의 id(toColumnId)의 index를 찾는다
      const toColumnIndex = columns.findIndex((c) => c.id === toColumnId);

      // 🔑 같은 컬럼이면 이동 없음
      if (fromColumnIndex === toColumnIndex) return prev;

      // 3. 실제로 이동시킬 카드 객체
      const movedCard = prev[fromColumnIndex][fromCardIndex];

      // 4. 컬럼별 카드 배열을 다시 만들어서 반환한다
      return prev.map((columnCards, idx) => {
        // 4-1. 카드가 빠져야 하는 "원래 컬럼"
        //      → 이동한 카드 하나만 제거
        if (idx === fromColumnIndex) {
          return columnCards.filter((card, index) => index !== fromCardIndex);
        }

        // 4-2. 카드가 들어가야 하는 "목표 컬럼"
        //      → 이동한 카드를 추가
        if (idx === toColumnIndex) {
          return [...columnCards, movedCard];
        }

        // 4-3. 영향을 받지 않는 컬럼은 그대로 유지
        return columnCards;
      });
    });

    // 2. 서버에 반영
    updateCard(cardId, { columnId: toColumnId }).catch((error) => {
      console.error('카드 이동 실패:', error);
      // 실패 시 이전 상태로 롤백
      setCardsState(prev);
      // TODO: 사용자에게 에러 토스트 표시
    });

    // activeCard 정리
    setActiveCard(null);
  }

  return (
    <div>
      {mounted && (
        <DndContext
          onDragStart={(e) => handleDragStart(e, cardsState)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveCard(null)}
        >
          <div className={styles.columnSection}>
            <ColumnList columns={columns} cardsByColumn={cardsState} dashboardId={dashboardId} />
          </div>

          <DragOverlay>
            {activeCard ? <CardItem card={activeCard} dashboardId={dashboardId} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
