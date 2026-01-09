'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultModal from '@/components/Modals/DefaultModal';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import { ColorChip, DASHBOARD_COLORS } from '@/components/Chip/ColorChip';
import styles from '@/components/Modals/Modal.module.css';
import { createDashboard } from '@/lib/api/dashboards';

const DASHBOARD_UPDATED_EVENT = 'dashboard:updated';

export default function CreateDashBoard() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(DASHBOARD_COLORS[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);

      await createDashboard({
        title,
        color: selectedColor,
      });

      // ✅ 대시보드 목록 갱신 신호 발행
      window.dispatchEvent(new Event(DASHBOARD_UPDATED_EVENT));

      // ✅ 모달 닫기
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
          <ModalButton variant="secondary" onClick={() => router.back()} disabled={loading}>
            취소
          </ModalButton>
          <ModalButton type="submit" form="dashboard-create-form" disabled={loading}>
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
