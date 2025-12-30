"use client";

import styles from "./TableInvitations.module.css";
import typo from "@/styles/typography.module.css";

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
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <div className={styles.cardWrapper}>
    <section className={`${styles.card} ${className}`}>
      {/* Header */}
      <header className={styles.header}>
        {/* ✅ 타이틀: 디자인시스템 타이포 적용 */}
        <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold} ${styles.title}`}>{title}</h2>

        <div className={styles.headerRight}>
          <span className={`${typo.base} ${typo.textMd} ${typo.regular} ${styles.pageText}`}>
            {page} 페이지 중 {totalPages}
          </span>

          <div className={styles.pager}>
            <button
              type="button"
              className={`${styles.pagerBtn} ${styles.pagerLeft}`}
              onClick={onPrev}
              disabled={isPrevDisabled}
              aria-label="이전 페이지"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.pagerBtn}
              onClick={onNext}
              disabled={isNextDisabled}
              aria-label="다음 페이지"
            >
              ›
            </button>
          </div>

          {/* ✅ 초대하기 버튼: 디자인시스템 타이포 */}
          <button
            type="button"
            className={`${styles.inviteBtn} ${typo.base} ${typo.textMd} ${typo.regular}`}
            onClick={onInvite}
          >
            <span className={styles.inviteIcon} aria-hidden="true">
            +
            </span>
            초대하기
          </button>
        </div>
      </header>

      {/* Table head */}
      <div className={`${styles.tableHead} ${typo.base} ${typo.textMd} ${typo.regular}`}>이메일</div>

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

              <button
                type="button"
                className={`${styles.cancelBtn} ${typo.base} ${typo.textMd} ${typo.medium}`}
                onClick={() => onCancel?.(inv.id)}
              >
                취소
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
    </div>
  );
}
