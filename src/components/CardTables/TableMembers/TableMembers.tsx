"use client";

import styles from "./TableMembers.module.css";

import typo from "../../../styles/typography.module.css";

export type Member = {
  id: string | number;
  name: string;
  initial: string; // J, K, C, Y
  avatarColor: string; 
};

type Props = {
  title?: string; // 기본 "구성원"
  members: Member[];

  page: number; // 1-based
  totalPages: number;

  onPrev?: () => void;
  onNext?: () => void;
  onRemove?: (id: Member["id"]) => void;

  className?: string;
};

export default function TableMembers({
  title = "구성원",
  members,
  page,
  totalPages,
  onPrev,
  onNext,
  onRemove,
  className = "",
}: Props) {
  const canPrev = page > 1 && !!onPrev;
  const canNext = page < totalPages && !!onNext;

  return (
    <section className={`${styles.card} ${className}`}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold}`}>{title}</h2>

        <div className={styles.headerRight}>
          <span className={`${typo.base} ${typo.textMd} ${typo.regular} ${styles.pageText}`}>
            {page} 페이지 중 {totalPages}
          </span>

          {/* pager buttons: 붙어있는 2버튼 + 가운데 선 */}
          <div className={styles.pager} role="group" aria-label="페이지 이동">
            <button
              type="button"
              className={`${styles.pagerBtn} ${styles.pagerLeft}`}
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="이전 페이지"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.pagerBtn} ${styles.pagerRight}`}
              onClick={onNext}
              disabled={!canNext}
              aria-label="다음 페이지"
            >
              ›
            </button>
          </div>
        </div>
      </header>

      {/* Table head */}
      <div className={`${typo.base} ${typo.textLg} ${typo.regular} ${styles.tableHead}`}>이름</div>

      {/* Rows */}
      <ul className={styles.rows}>
        {members.map((m) => (
          <li key={m.id} className={styles.row}>
            <div className={styles.memberCell}>
              <span className={styles.avatar} style={{ background: m.avatarColor }} aria-hidden>
                <span className={`${typo.base} ${typo.textMd} ${typo.Regular} ${styles.avatarText}`}>
                  {m.initial}
                </span>
              </span>

              <span className={`${typo.base} ${typo.textMd} ${typo.Regular}`}>{m.name}</span>
            </div>

            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => onRemove?.(m.id)}
              disabled={!onRemove}
            >
              <span className={`${typo.base} ${typo.textMd} ${typo.regular}`}>삭제</span>
            </button>
          </li>
        ))}

        {members.length === 0 && (
          <li className={styles.emptyRow}>
            <p className={`${typo.base} ${typo.textMd} ${typo.regular} ${styles.emptyText}`}>
              구성원이 없습니다.
            </p>
          </li>
        )}
      </ul>
    </section>
  );
}
