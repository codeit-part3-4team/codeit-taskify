'use client';

import { useState } from 'react';
import DefaultModal from '@/components/Modals/DefaultModal';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import { ColorChip, DASHBOARD_COLORS } from '@/components/Chip/ColorChip';
import styles from './TableModal.module.css';

type Props = {
  defaultName?: string;
  defaultColor?: string;
  onSubmit?: (payload: { name: string; color: string }) => void | Promise<void>;
};

export default function VbridgeEditModal({
  defaultName = '',
  defaultColor = DASHBOARD_COLORS[0],
  onSubmit,
}: Props) {
  const [name, setName] = useState(defaultName);
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit?.({ name, color: selectedColor });
  }

  return (
  <DefaultModal
    title="비브리지"
    actionsButton={
      <ModalButton className={styles.button} type="submit" form="vbridge-edit-form">
        변경
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