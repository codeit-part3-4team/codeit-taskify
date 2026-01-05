"use client";

import styles from "@/components/CardTables/TableInvitations/TableInvitations.module.css";
import typo from "@/styles/typography.module.css";
import PaginationButton from "@/components/Buttons/shared/PaginationButton/PaginationButton";
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import { useEffect, useState } from 'react';

function useIsMobile(breakpoint = 360) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}


export type Invitation = {
  id: number | string;
  email: string;
};

type Props = {
  className?: string;
  title?: string;

  invitations: Invitation[];

  page: number;
  totalPages: number;

  onPrev?: () => void;
  onNext?: () => void;

  onInvite?: () => void;
  onCancel?: (id: Invitation["id"]) => void;
};

export default function TableInvitations({
  className = "",
  title = "초대 내역",
  invitations,
  page,
  totalPages,
  onPrev,
  onNext,
  onInvite,
  onCancel,
}: Props) {
  const canPrev = page > 1 && !!onPrev;
  const canNext = page < totalPages && !!onNext;
  const isMobile = useIsMobile();


  return (
    <div className={styles.cardWrapper}>
      <section className={`${styles.card} ${className}`}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold} ${styles.title}`}>
            {title}
          </h2>

          <div className={styles.headerRight}>
            <span className={`${typo.base} ${typo.textMd} ${typo.regular} ${styles.pageText}`}>
              {page} 페이지 중 {totalPages}
            </span>

            <PaginationButton
              size="small"             
              prevDisabled={!canPrev}
              nextDisabled={!canNext}
              onPrevClick={onPrev}
              onNextClick={onNext}
              className={styles.pager}   
            />

            {/* ✅ PC 전용 초대하기 버튼 (모바일에서는 숨김) */}
            <button
              type="button"
              className={`${styles.inviteBtn} ${styles.inviteBtnDesktop} ${typo.base} ${typo.textMd} ${typo.regular}`}
              onClick={onInvite}
            >
              <span className={styles.inviteIcon} aria-hidden="true">
                +
              </span>
              초대하기
            </button>
          </div>
        </header>

        {/* ✅ SubHeader: 모바일에서 "이메일" + "초대하기" 한 줄 */}
        <div className={styles.subHeader}>
          <div className={`${styles.tableHead} ${typo.base} ${typo.textMd} ${typo.regular}`}>
            이메일
          </div>

          {/* ✅ 모바일 전용 초대하기 버튼 (PC에서는 숨김) */}
          <button
            type="button"
            className={`${styles.inviteBtn} ${styles.inviteBtnMobile} ${typo.base} ${typo.textMd} ${typo.regular}`}
            onClick={onInvite}
          >
            <span className={styles.inviteIcon} aria-hidden="true">
              +
            </span>
            초대하기
          </button>
        </div>
        
        {/* Rows */}
        <ul className={styles.rows}>
          {invitations.length === 0 ? (
            <li className={styles.emptyRow}>
              <p className={`${styles.emptyText} ${typo.base} ${typo.textMd} ${typo.regular}`}>
                초대 내역이 없습니다.
              </p>
            </li>
          ) : (
            invitations.map((inv) => (
              <li key={inv.id} className={styles.row}>
                <span className={`${typo.base} ${typo.textLg} ${typo.regular} ${styles.email}`}>
                  {inv.email}
                </span>

                <ModalButton
                  variant="secondary"
                  size={isMobile ? 'small' : 'large'}
                  className={
                    isMobile
                      ? styles.cancelSmall   // 52 × 32
                      : styles.cancelLarge   // 84 × 32
                  }
                  onClick={() => onCancel?.(inv.id)}
                >
                  취소
                </ModalButton>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
