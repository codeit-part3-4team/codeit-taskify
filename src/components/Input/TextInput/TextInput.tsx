'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './TextInput.module.css';

/**
 * TextInput 컴포넌트 (제목, 설명 등 텍스트 입력용)
 * 
 * @example
 * <TextInput
 *   label="제목"
 *   required
 *   placeholder="제목을 입력해 주세요"
 *   value={title}
 *   onChange={(e) => setTitle(e.target.value)}
 * />
 */

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 상단에 표시될 라벨 */
  label: string;
  /** 필수 입력 여부 (라벨 옆에 * 표시) */
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, required, className, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <input
          ref={ref}
          type="text"
          className={styles.input}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;

