'use client';

import { useEffect, useState } from 'react';
import DefaultModal from '@/components/Modals/DefaultModal';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import { ColorChip, DASHBOARD_COLORS } from '@/components/Chip/ColorChip';
import styles from './TableModal.module.css';

import { updateDashboard } from '@/app/dashboard-setting/api/dashboardsetting';

type Props = {
  dashboardId: number;
  defaultName?: string;
  defaultColor?: string;
  onSuccess?: () => void;
};

export default function TableModal({
  dashboardId,
  defaultName = '',
  defaultColor = DASHBOARD_COLORS[0],
  onSuccess,
}: Props) {
  const [name, setName] = useState(defaultName);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ defaultName/defaultColor가 바뀌면 input/chip도 따라 바뀜
  useEffect(() => {
    setName(defaultName);
    setSelectedColor(defaultColor);
  }, [defaultName, defaultColor]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ 이름 비면 막기
    if (!name.trim()) {
      alert('대시보드 이름을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      await updateDashboard(dashboardId, {
        title: name.trim(),
        color: selectedColor,
      });

      alert('저장됐어! 🎉');
      onSuccess?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패 😢');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DefaultModal
      title="비브리지"
      actionsButton={
        <ModalButton
          className={styles.button}
          type="submit"
          form="vbridge-edit-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? '변경 중...' : '변경'}
        </ModalButton>
      }
    >
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <form id="vbridge-edit-form" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <p className={styles.label}>대시보드 이름</p>
              <TextInput
                label=""
                placeholder="뉴프로젝트"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.chipRow} aria-label="색상 선택">
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
        </div>
      </div>
    </DefaultModal>
  );
}
