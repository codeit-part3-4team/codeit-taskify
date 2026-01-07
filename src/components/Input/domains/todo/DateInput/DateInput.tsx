'use client';

import { InputHTMLAttributes, forwardRef, ChangeEvent } from 'react';
import IcCalender from '@/assets/icons/IcCalender';
import styles from './DateInput.module.css';

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Input 상단에 표시될 라벨 */
  label: string;
  /** 시간 포함 여부 (true: datetime-local, false: date only) */
  includeTime?: boolean;
  /** 값 변경 핸들러 (API 형식 "YYYY-MM-DD HH:MM"으로 변환된 값 전달) */
  onChange?: (e: ChangeEvent<HTMLInputElement>, formattedValue?: string) => void;
}

/**
 * DateInput 컴포넌트 (마감일 입력용)
 *
 * @description 날짜 또는 날짜+시간을 입력받는 컴포넌트입니다.
 * includeTime이 true이면 시간도 함께 입력받으며, API 형식 "YYYY-MM-DD HH:MM"으로 변환된 값을 제공합니다.
 *
 * @example
 * // 날짜만 입력
 * <DateInput
 *   label="마감일"
 *   placeholder="날짜를 입력해 주세요"
 *   value={dueDate}
 *   onChange={(e) => setDueDate(e.target.value)}
 * />
 *
 * @example
 * // 날짜 + 시간 입력 (API 형식으로 변환)
 * <DateInput
 *   label="마감일"
 *   includeTime
 *   value={dueDate}
 *   onChange={(e, formattedValue) => setDueDate(formattedValue || e.target.value)}
 * />
 */
const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, className, value, defaultValue, includeTime = false, onChange, ...props }, ref) => {
    const hasValue = (value !== undefined && value !== '') || (defaultValue !== undefined && defaultValue !== '');

    /**
     * datetime-local의 값(YYYY-MM-DDTHH:MM)을 API 형식(YYYY-MM-DD HH:MM)으로 변환
     */
    const formatToApiFormat = (datetimeLocalValue: string): string => {
      if (!datetimeLocalValue) return '';
      // "2023-01-20T14:30" → "2023-01-20 14:30"
      return datetimeLocalValue.replace('T', ' ');
    };

    /**
     * API 형식(YYYY-MM-DD HH:MM)을 datetime-local 형식(YYYY-MM-DDTHH:MM)으로 변환
     */
    const formatToInputFormat = (apiValue: string | number | readonly string[] | undefined): string => {
      if (!apiValue || typeof apiValue !== 'string') return '';
      // "2023-01-20 14:30" → "2023-01-20T14:30"
      return apiValue.replace(' ', 'T');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        if (includeTime) {
          const formattedValue = formatToApiFormat(e.target.value);
          onChange(e, formattedValue);
        } else {
          onChange(e);
        }
      }
    };

    // includeTime일 때 value/defaultValue를 datetime-local 형식으로 변환
    const inputValue = includeTime && value !== undefined ? formatToInputFormat(value) : value;
    const inputDefaultValue = includeTime && defaultValue !== undefined ? formatToInputFormat(defaultValue) : defaultValue;

    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <IcCalender className={`${styles.icon} ${hasValue ? styles.iconActive : ''}`} />
          <input
            ref={ref}
            type={includeTime ? 'datetime-local' : 'date'}
            className={styles.input}
            {...(value !== undefined ? { value: inputValue } : {})}
            {...(defaultValue !== undefined && value === undefined ? { defaultValue: inputDefaultValue } : {})}
            onChange={handleChange}
            {...props}
          />
        </div>
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
