"use client";

import styles from "./TableInvitedDashboards.module.css";
import typo from "@/styles/typography.module.css";

import Image from "next/image";
import searchIcon from "./search.svg";

export type InvitedDashboard = {
  id: number | string;
  name: string; // 대시보드 이름
  inviter: string; // 초대자
};

type Props = {
  className?: string;
  title?: string;

  items: InvitedDashboard[];

  searchValue?: string;
  onSearchChange?: (value: string) => void;

  onAccept?: (id: InvitedDashboard["id"]) => void;
  onReject?: (id: InvitedDashboard["id"]) => void;
};

export default function TableInvitedDashboards({
  className = "",
  title = "초대받은 대시보드",
  items,
  searchValue = "",
  onSearchChange,
  onAccept,
  onReject,
}: Props) {
  return (
    <section className={`${styles.card} ${className}`} aria-label={title}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold} ${styles.title}`}>{title}</h2>
      </header>

      {/* Search */}
      <div className={styles.searchWrap}>
        <label className={styles.searchBox}>
          <span className={styles.searchIcon} aria-hidden="true">
            <Image src={searchIcon} alt="" fill priority />
          </span>

          <input
            className={`${styles.searchInput} ${typo.base} ${typo.textLg} ${typo.regular}`}
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </label>
      </div>

      {/* Desktop Table Head */}
      <div className={styles.tableHead}>
        <span className={`${styles.th} ${typo.base} ${typo.textLg} ${typo.regular}`}>이름</span>
        <span className={`${styles.th} ${typo.base} ${typo.textLg} ${typo.regular}`}>초대자</span>
        <span className={`${styles.th} ${styles.actionsHead} ${typo.base} ${typo.textLg} ${typo.regular}`}>수락 여부</span>
      </div>

      {/* Rows (Desktop: table-row / Mobile: card) */}
      <ul className={styles.rows}>
        {items.map((it) => (
          <li key={it.id} className={styles.row}>
            {/* Desktop cells */}
            <span className={`${styles.td} ${styles.name} ${typo.base} ${typo.textLg} ${typo.regular}`}>
              {it.name}
            </span>
            <span className={`${styles.td} ${styles.inviter} ${typo.base} ${typo.textLg} ${typo.regular}`}>
              {it.inviter}
            </span>

            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.primaryBtn} ${typo.base} ${typo.textMd} ${typo.medium}`}
                onClick={() => onAccept?.(it.id)}
              >
                수락
              </button>
              <button
                type="button"
                className={`${styles.ghostBtn} ${typo.base} ${typo.textMd} ${typo.medium}`}
                onClick={() => onReject?.(it.id)}
              >
                거절
              </button>
            </div>

            {/* Mobile layout (only visible on <=360) */}
            <div className={styles.mobileBlock}>
            <div className={styles.mobileTwoCol}>
                {/* 왼쪽: 라벨 열 */}
                <div className={styles.mobileCol}>
                <span className={`${styles.mobileLabel} ${typo.base} ${typo.textLg} ${typo.regular}`}>
                    이름
                </span>
                <span className={`${styles.mobileLabel} ${typo.base} ${typo.textLg} ${typo.regular}`}>
                    초대자
                </span>
                </div>

                {/* 오른쪽: 값 열 */}
                <div className={styles.mobileCol}>
                <span className={`${styles.mobileValue} ${typo.base} ${typo.textLg} ${typo.regular}`}>
                    {it.name}
                </span>
                <span className={`${styles.mobileValue} ${typo.base} ${typo.textLg} ${typo.regular}`}>
                    {it.inviter}
                </span>
                </div>
            </div>

            <div className={styles.mobileActions}>
                <button
                type="button"
                className={`${styles.mobilePrimaryBtn} ${typo.base} ${typo.textMd} ${typo.medium}`}
                onClick={() => onAccept?.(it.id)}
                >
                수락
                </button>
                <button
                type="button"
                className={`${styles.mobileGhostBtn} ${typo.base} ${typo.textMd} ${typo.medium}`}
                onClick={() => onReject?.(it.id)}
                >
                거절
                </button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
