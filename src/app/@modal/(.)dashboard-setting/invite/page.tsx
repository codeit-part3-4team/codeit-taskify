'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DefaultModal from '@/components/Modals/DefaultModal';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';

import styles from '@/components/Modals/Modal.module.css';

export default function InviteModalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dashboardId = searchParams.get('dashboardId');

  const onClose = () => router.back();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '').trim();

    if (!email) {
      alert('이메일을 입력해 주세요.');
      return;
    }

    if (!dashboardId) {
      alert('dashboardId가 없습니다.');
      return;
    }

    try {
      // TODO: 초대 API 호출 자리
      alert('초대가 전송되었습니다.');
      router.back();
    } catch {
      alert('초대에 실패했어요 😢');
    }
  }

  return (
    <div className={`${styles.overlay} ${styles.open}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <DefaultModal
          title="초대하기"
          actionsButton={
            <>
              <ModalButton variant="secondary" onClick={onClose} type="button">
                취소
              </ModalButton>
              <ModalButton type="submit" form="invite-form">
                초대
              </ModalButton>
            </>
          }
        >
          <form id="invite-form" onSubmit={handleSubmit}>
            <TextInput name="email" label="이메일" placeholder="example@email.com" />
          </form>
        </DefaultModal>
      </div>
    </div>
  );
}
