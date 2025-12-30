'use client';

/**
 * AlimModal 컴포넌트
 *
 * @description
 * 간단한 알림 메시지를 표시하기 위한 모달 콘텐츠 컴포넌트 입니다.
 * 메시지와 단일 확인 버튼을 제공하며,
 * 확인 버튼 클릭 시 `router.back()`을 통해 모달을 닫힙니다.
 *
 * 이 컴포넌트는 `Modal` 컨테이너 내부에서 사용되는 것을 전제로 하며,
 * 모달의 열림/닫힘 및 오버레이 제어는 `Modal` 컴포넌트가 담당합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Modal type="alim">
 *   <AlimModal message="비밀번호가 일치하지 않습니다." />
 * </Modal>
 *
 * // 버튼 텍스트 커스터마이즈
 * <Modal type="alim">
 *   <AlimModal message="삭제되었습니다" buttonText="닫기" />
 * </Modal>
 * ```
 */

import { useRouter } from 'next/navigation';
import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import DefaultModal from '@/components/Modals/DefualtModal';
import Modal from '@/components/Modals/Modal';

type AlimModalProps = {
  message: string;
  buttonText?: string;
};

export default function AlimModal({ message, buttonText = '확인' }: AlimModalProps) {
  const router = useRouter();

  return (
    <DefaultModal
      message={message}
      actionsButton={
        <ModalButton type="button" onClick={() => router.back()}>
          {buttonText}
        </ModalButton>
      }
    />
  );
}
