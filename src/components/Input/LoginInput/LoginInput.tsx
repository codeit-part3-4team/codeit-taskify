'use client';

import { useState, InputHTMLAttributes, forwardRef } from 'react';
import IcEyeOn from '@/assets/icons/IcEyeOn';
import IcEyeOff from '@/assets/icons/IcEyeOff';
import styles from './LoginInput.module.css';

/**
 * LoginInput 컴포넌트 (로그인/회원가입 페이지 전용)
 * 
 * @example
 * // 기본 사용
 * <LoginInput
 *   label="이메일"
 *   type="email"
 *   placeholder="이메일을 입력해 주세요"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * @example
 * // 에러 상태
 * <LoginInput
 *   label="비밀번호"
 *   type="password"
 *   placeholder="비밀번호를 입력해 주세요"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   error="8자 이상 입력해 주세요."
 * />
 */

interface LoginInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 상단에 표시될 라벨 */
  label: string;
  /** Input 타입 */
  type?: 'text' | 'email' | 'password';
  /** 에러 메시지 (있으면 에러 상태 표시) */
  error?: string;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ label, type = 'text', error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={inputType}
            className={`${styles.input} ${error ? styles.error : ''}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <IcEyeOn className={styles.eyeIcon} />
              ) : (
                <IcEyeOff className={styles.eyeIcon} />
              )}
            </button>
          )}
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

LoginInput.displayName = 'LoginInput';

export default LoginInput;

