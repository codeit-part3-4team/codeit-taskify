'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LoginInput from '@/components/Input/domains/login/LoginInput/LoginInput';
import LoginButton from '@/components/Buttons/domains/login/LoginButton/LoginButton';
import { login } from './api/login';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    if (!value) {
      return '';
    }
    if (value.length < 8) {
      return '8자 이상 작성해 주세요.';
    }
    return '';
  };

  // 이메일 blur 핸들러
  const handleEmailBlur = useCallback(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  // 비밀번호 blur 핸들러
  const handlePasswordBlur = useCallback(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  // 버튼 활성화 여부
  const isButtonActive = 
    email.length > 0 && 
    password.length > 0 && 
    !emailError && 
    !passwordError;

  // 로그인 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 최종 유효성 검사
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await login({ email, password });
      
      // 액세스 토큰 저장
      localStorage.setItem('accessToken', response.accessToken);
      
      // mydashboard로 이동
      router.push('/mydashboard');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('비밀번호')) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 로고 */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/main-logo-desktop.svg"
            alt="Taskify"
            width={200}
            height={280}
            priority
          />
        </Link>

        {/* 환영 메시지 */}
        <p className={styles.welcomeText}>오늘도 만나서 반가워요!</p>

        {/* 로그인 폼 */}
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
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              error={passwordError}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <LoginButton
              type="submit"
              variant={isButtonActive ? 'active' : 'inactive'}
              fullWidth
              disabled={!isButtonActive || isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </LoginButton>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <p className={styles.signupText}>
          회원이 아니신가요?{' '}
          <Link href="/signup" className={styles.signupLink}>
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}

