'use client';

import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import styles from '@/components/Modals/Modal.module.css';

interface AlertModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 알림 메시지 */
  message: string;
  /** 확인 버튼 텍스트 (기본값: "확인") */
  buttonText?: string;
  /** 확인 버튼 클릭 후 추가 동작 */
  onConfirm?: () => void;
}

/**
 * AlertModal 컴포넌트 (State 기반 알림 모달)
 *
 * @description
 * 라우팅 없이 state로 열고 닫을 수 있는 알림 모달 컴포넌트입니다.
 * 기존 AlimModal과 동일한 디자인이지만, router.back() 대신 onClose 콜백을 사용합니다.
 * 로그인/회원가입 페이지처럼 라우팅 기반 모달이 적합하지 않은 곳에서 사용합니다.
 *
 * @example
 * // 기본 사용
 * const [showModal, setShowModal] = useState(false);
 *
 * <AlertModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   message="비밀번호가 일치하지 않습니다."
 * />
 *
 * @example
 * // 확인 후 페이지 이동
 * <AlertModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   message="가입이 완료되었습니다!"
 *   onConfirm={() => router.push('/login')}
 * />
 */
export default function AlertModal({
  isOpen,
  onClose,
  message,
  buttonText = '확인',
  onConfirm,
}: AlertModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    onConfirm?.();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${styles.open}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className={`${styles.modal} ${styles.alim}`}>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.buttonBox}>
          <ModalButton type="button" onClick={handleConfirm}>
            {buttonText}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}

