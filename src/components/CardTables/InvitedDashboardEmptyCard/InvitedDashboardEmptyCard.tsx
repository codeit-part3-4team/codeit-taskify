"use client";

import styles from "./InvitedDashboardEmptyCard.module.css";
import typo from "@/styles/typography.module.css";

import Image from "next/image";
import emptyInvitation from "./emptyinvitation.svg";

type Props = {
  className?: string;
  title?: string;
  emptyText?: string;
};

export default function InvitedDashboardEmptyCard({
  className = "",
  title = "초대받은 대시보드",
  emptyText = "아직 초대받은 대시보드가 없어요",
}: Props) {
  return (
    <section className={`${styles.card} ${className}`} aria-label={title}>
      <header className={styles.header}>
        <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold} ${styles.title}`}>
          {title}
        </h2>
      </header>

      <div className={styles.empty}>
        <Image
            src={emptyInvitation}
            alt=""
            className={styles.icon}
            priority
        />
        <p className={`${typo.base} ${typo.textLg} ${typo.regular} ${styles.emptyText}`}>
            {emptyText}
        </p>
        </div>
    </section>
  );
}
