"use client";

import styles from "@/components/CardTables/TableMembers/TableMembers.module.css";
import typo from "@/styles/typography.module.css";
import PaginationButton from "@/components/Buttons/shared/PaginationButton/PaginationButton";
import TextButton from "@/components/Buttons/shared/TextButton/TextButton";
import { useEffect, useState } from 'react';

function useIsMobile(breakpoint = 743) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}


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
  const isMobile = useIsMobile();

  return (
    <section className={`${styles.card} ${className}`}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={`${typo.base} ${typo.text2xl} ${typo.bold} ${styles.title}`}>{title}</h2>

        <div className={styles.headerRight} >
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

        </div>
      </header>


      <div className={`${typo.base} ${typo.textLg} ${typo.regular} ${styles.tableHead}`}>이름</div>


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

            <TextButton
              variant="delete"
              size={isMobile ? 'small' : 'large'}
                  className={
                    isMobile
                      ? styles.cancelSmall   // 52 × 32
                      : styles.cancelLarge   // 84 × 32
                  }
              onClick={() => onRemove?.(m.id)}
              disabled={!onRemove}
            >
              삭제
            </TextButton>
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
