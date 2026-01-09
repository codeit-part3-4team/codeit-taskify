'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultModal from '@/components/Modals/DefaultModal';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import { ColorChip, DASHBOARD_COLORS } from '@/components/Chip/ColorChip';
import styles from '@/components/Modals/Modal.module.css';
import { createDashboard } from '@/lib/api/dashboards';

/**
 * CreateDashBoard 컴포넌트
 *
 * @description
 * 대시보드 생성을 담당하는 모달 전용 도메인 컴포넌트입니다.
 *
 * - 사용자 입력(title, color)을 수집합니다.
 * - 대시보드 생성 API를 호출하는 유일한 책임 주체입니다.
 * - 생성 성공 시 router.refresh()로 목록을 동기화한 뒤
 *   router.back()으로 모달을 닫습니다.
 *
 * 이 프로젝트에서는:
 * - 대시보드 수가 많지 않고
 * - 생성/삭제/수정 빈도가 낮기 때문에
 * router.refresh()를 사용하는 단순한 동기화 전략을 채택합니다.
 */
export default function CreateDashBoard() {
  const router = useRouter();

  /** 대시보드 제목 */
  const [title, setTitle] = useState('');

  /** 선택된 대시보드 색상 (Hex 코드) */
  const [selectedColor, setSelectedColor] = useState<string>(
    DASHBOARD_COLORS[0]
  );

  /** 생성 요청 중 상태 */
  const [loading, setLoading] = useState(false);

  /**
   * 대시보드 생성 submit 핸들러
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await createDashboard({
        title,
        color: selectedColor,
      });

      // ✅ 현재 페이지 데이터 재요청 (대시보드 목록 갱신)
      router.refresh();

      // ✅ URL 상태 복구 → 모달 닫기
      router.back();
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
      alert('대시보드 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultModal
      title="새로운 대시보드"
      actionsButton={
        <>
          <ModalButton
            variant="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            취소
          </ModalButton>
          <ModalButton
            type="submit"
            form="dashboard-create-form"
            disabled={loading}
          >
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

        <div className={styles.chipRow} aria-label="대시보드 색상 선택">
          {DASHBOARD_COLORS.map((color) => (
            <ColorChip
              key={color}
              color={color}
              size="medium"
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </form>
    </DefaultModal>
  );
}
