'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginInput from '@/components/Input/domains/login/LoginInput/LoginInput';
import LoginButton from '@/components/Buttons/domains/login/LoginButton/LoginButton';
import { signup } from './api/signup';
import styles from './page.module.css';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return '';
    }
    if (!emailRegex.test(value)) {
      return '이메일 형식으로 작성해 주세요.';
    }
    return '';
  };

  // 닉네임 유효성 검사
  const validateNickname = (value: string) => {
    if (!value) {
      return '';
    }
    if (value.length > 10) {
      return '열 자 이하로 작성해주세요.';
    }
    return '';
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    if (!value) {
      return '';
    }
    if (value.length < 8) {
      return '8자 이상 입력해주세요.';
    }
    return '';
  };

  // 비밀번호 확인 유효성 검사
  const validatePasswordConfirm = (value: string, originalPassword: string) => {
    if (!value) {
      return '';
    }
    if (value !== originalPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  // Blur 핸들러들
  const handleEmailBlur = useCallback(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  const handleNicknameBlur = useCallback(() => {
    setNicknameError(validateNickname(nickname));
  }, [nickname]);

  const handlePasswordBlur = useCallback(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  const handlePasswordConfirmBlur = useCallback(() => {
    setPasswordConfirmError(validatePasswordConfirm(passwordConfirm, password));
  }, [passwordConfirm, password]);

  // 비밀번호가 변경될 때 비밀번호 확인도 다시 검사
  useEffect(() => {
    if (passwordConfirm) {
      setPasswordConfirmError(validatePasswordConfirm(passwordConfirm, password));
    }
  }, [password, passwordConfirm]);

  // 버튼 활성화 여부
  const isButtonActive = 
    email.length > 0 && 
    nickname.length > 0 && 
    password.length > 0 && 
    passwordConfirm.length > 0 && 
    !emailError && 
    !nicknameError && 
    !passwordError && 
    !passwordConfirmError && 
    termsAgreed;

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 최종 유효성 검사
    const emailErr = validateEmail(email);
    const nicknameErr = validateNickname(nickname);
    const passwordErr = validatePassword(password);
    const passwordConfirmErr = validatePasswordConfirm(passwordConfirm, password);
    
    if (emailErr || nicknameErr || passwordErr || passwordConfirmErr) {
      setEmailError(emailErr);
      setNicknameError(nicknameErr);
      setPasswordError(passwordErr);
      setPasswordConfirmError(passwordConfirmErr);
      return;
    }

    if (!termsAgreed) {
      return;
    }

    setIsLoading(true);
    
    try {
      await signup({ email, nickname, password });
      
      alert('가입이 완료되었습니다');
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('이미 사용중인 이메일')) {
          setModalMessage('이미 사용중인 이메일입니다');
          setShowModal(true);
        } else {
          alert(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 회원가입 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <LoginInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            error={emailError}
          />
          <LoginInput
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleNicknameBlur}
            error={nicknameError}
          />
          <LoginInput
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            error={passwordError}
          />
          <LoginInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={handlePasswordConfirmBlur}
            error={passwordConfirmError}
          />
        </div>

        {/* 이용약관 체크박스 */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>이용약관에 동의합니다.</span>
        </label>

        <div className={styles.buttonWrapper}>
          <LoginButton
            type="submit"
            variant={isButtonActive ? 'active' : 'inactive'}
            fullWidth
            disabled={!isButtonActive || isLoading}
          >
            {isLoading ? '가입 중...' : '가입하기'}
          </LoginButton>
        </div>
      </form>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalText}>{modalMessage}</p>
            <button 
              className={styles.modalButton}
              onClick={() => setShowModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}

