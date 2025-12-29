'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import IcCalender from '@/assets/icons/IcCalender';
import styles from './DateInput.module.css';

/**
 * DateInput 컴포넌트 (마감일 입력용)
 * 
 * @example
 * <DateInput
 *   label="마감일"
 *   placeholder="날짜를 입력해 주세요"
 *   value={dueDate}
 *   onChange={(e) => setDueDate(e.target.value)}
 * />
 */

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Input 상단에 표시될 라벨 */
  label: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, className, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== '';

    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <IcCalender className={`${styles.icon} ${hasValue ? styles.iconActive : ''}`} />
          <input
            ref={ref}
            type="date"
            className={styles.input}
            value={value}
            {...props}
          />
        </div>
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;

