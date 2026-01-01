'use client';

import { useRouter } from 'next/navigation';
import styles from '@/components/Modals/Modal.module.css';

type DefaultModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  children?: React.ReactNode;
  closeButton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * DefaultModal 컴포넌트
 *
 * @description
 * 모달 내부에서 공통으로 사용되는 기본 레이아웃 컴포넌트 입니다.
 * 제목, 메시지, 콘텐츠(children), 액션 버튼 영역을 조합해 렌더링하며,
 * 실제 모달의 열림/닫힘 제어는 상위 라우팅(@modal) 또는 부모 컴포넌트가 담당합니다.
 *
 * 이 컴포넌트는 레이아웃과 구조만 책임지고,
 * 데이터 처리나 상태 제어 로직은 포함하지 않습니다.
 *
 * @example
 * ```tsx
 * <DefaultModal
 *   title="제목 입력"
 *   message="메세지 입력"
 *   actionsButton={
 *     <>
 *       <ModalButton variant="secondary" onClick={onClose}>
 *         취소
 *       </ModalButton>
 *       <ModalButton type="submit" form="card-form">
 *         생성
 *       </ModalButton>
 *     </>
 *   }
 * >
 *   { children 영역 }
 *   <form id="card-form">
 *     <TextInput label="제목" />
 *   </form>
 * </DefaultModal>
 * ```
 */

export default function DefaultModal({
  title,
  message,
  children,
  actionsButton,
  closeButton,
  className = '',
}: DefaultModalProps) {
  const router = useRouter();

  return (
    <>
      {title && <h2 className={styles.modalTitle}>{title}</h2>}
      {message && <p className={styles.modalMessage}>{message}</p>}
      {children}
      {/* 버튼컴포넌트 올 자리 */}
      {actionsButton && <div className={styles.buttonBox}>{actionsButton}</div>}
      {closeButton && <button onClick={() => router.back()}>닫기</button>}
    </>
  );
}
