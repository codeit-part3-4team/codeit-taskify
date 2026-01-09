'use client';

import { useState, useMemo } from 'react';
import styles from './PasswordChangeCard.module.css';
import typo from '@/styles/typography.module.css';

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
  className = '',
  title = '비밀번호 변경',

  currentLabel = '현재 비밀번호',
  newLabel = '새 비밀번호',
  confirmLabel = '새 비밀번호 확인',

  currentPlaceholder = '비밀번호 입력',
  newPlaceholder = '새 비밀번호 입력',
  confirmPlaceholder = '새 비밀번호 입력',

  currentValue = '',
  newValue = '',
  confirmValue = '',

  onChangeCurrent,
  onChangeNew,
  onChangeConfirm,

  onSubmit,
  buttonText = '변경',
}: Props) {
  /** ✅ confirm input이 한 번이라도 blur 되었는지 */
  const [confirmTouched, setConfirmTouched] = useState(false);

  /** ✅ blur 이후에만 불일치 판단 */
  const isPasswordMismatch = useMemo(() => {
    if (!confirmTouched) return false;
    if (!confirmValue) return false;
    return newValue !== confirmValue;
  }, [confirmTouched, newValue, confirmValue]);

  /** 버튼 활성화 조건 */
  const isAllFilled = Boolean(currentValue && newValue && confirmValue);
  const canSubmit = isAllFilled && !isPasswordMismatch;

  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={`${styles.title} ${typo.base} ${typo.text2xl} ${typo.bold}`}>
        {title}
      </h2>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          onSubmit?.();
        }}
      >
        {/* 현재 비밀번호 */}
        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg}`}>
            {currentLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg}`}
            value={currentValue}
            placeholder={currentPlaceholder}
            onChange={(e) => onChangeCurrent?.(e.target.value)}
          />
        </label>

        {/* 새 비밀번호 */}
        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg}`}>
            {newLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg}`}
            value={newValue}
            placeholder={newPlaceholder}
            onChange={(e) => onChangeNew?.(e.target.value)}
          />
        </label>

        {/* ✅ 새 비밀번호 확인 */}
        <label className={styles.field}>
          <span className={`${styles.label} ${typo.base} ${typo.textLg}`}>
            {confirmLabel}
          </span>
          <input
            type="password"
            className={`${styles.input} ${typo.base} ${typo.textLg} ${
              isPasswordMismatch ? styles.inputError : ''
            }`}
            value={confirmValue}
            placeholder={confirmPlaceholder}
            onChange={(e) => onChangeConfirm?.(e.target.value)}
            onBlur={() => setConfirmTouched(true)}   // ⭐ focus out
            aria-invalid={isPasswordMismatch}
          />

          {/* ⭐ blur 이후 + 불일치 시에만 에러 메시지 */}
          {isPasswordMismatch && (
            <p className={`${styles.errorText} ${typo.base} ${typo.textSm}`}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </label>

        <button
          type="submit"
          className={`${styles.submitBtn} ${typo.base} ${typo.textLg}`}
          disabled={!canSubmit}
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}
