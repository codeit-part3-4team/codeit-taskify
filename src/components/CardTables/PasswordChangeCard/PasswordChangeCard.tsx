"use client";

import styles from "./PasswordChangeCard.module.css";
import typo from "@/styles/typography.module.css";

type Props = {
  className?: string;
  title?: string;

  currentLabel?: string;
  newLabel?: string;
  confirmLabel?: string;

  currentPlaceholder?: string;
  newPlaceholder?: string;
  confirmPlaceholder?: string;

  currentValue?: string;
  newValue?: string;
  confirmValue?: string;

  onChangeCurrent?: (v: string) => void;
  onChangeNew?: (v: string) => void;
  onChangeConfirm?: (v: string) => void;

  onSubmit?: () => void;
  buttonText?: string;
};

export default function PasswordChangeCard({
  className = "",
  title = "비밀번호 변경",

  currentLabel = "현재 비밀번호",
  newLabel = "새 비밀번호",
  confirmLabel = "새 비밀번호 확인",

  currentPlaceholder = "비밀번호 입력",
  newPlaceholder = "새 비밀번호 입력",
  confirmPlaceholder = "새 비밀번호 입력",

  currentValue = "",
  newValue = "",
  confirmValue = "",

  onChangeCurrent,
  onChangeNew,
  onChangeConfirm,

  onSubmit,
  buttonText = "변경",
}: Props) {
  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={`${styles.title} ${typo.base} ${typo.text2xl} ${typo.bold}`}>{title}</h2>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
      >
        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
            {currentLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
            value={currentValue}
            placeholder={currentPlaceholder}
            onChange={(e) => onChangeCurrent?.(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
            {newLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
            value={newValue}
            placeholder={newPlaceholder}
            onChange={(e) => onChangeNew?.(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
            {confirmLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
            value={confirmValue}
            placeholder={confirmPlaceholder}
            onChange={(e) => onChangeConfirm?.(e.target.value)}
          />
        </label>

        <button type="submit" className={`${styles.submitBtn} ${typo.base} ${typo.textLg} ${typo.medium}`}>
          {buttonText}
        </button>
      </form>
    </section>
  );
}
