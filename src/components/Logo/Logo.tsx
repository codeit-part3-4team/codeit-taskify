'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/Logo/Logo.module.css';

/**
 * @component Logo
 * 
 * @description
 * Taskify 서비스의 로고 컴포넌트입니다.
 * 반응형으로 모바일에서는 심볼만 표시합니다.
 * 
 * **클릭 동작:**
 * - /mydashboard: 클릭 불가 (현재 페이지)
 * - /dashboard/[id], /mypage: /mydashboard로 이동
 * - 기타: / (홈)으로 이동
 * 
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
export default function Logo() {
  const pathname = usePathname();

  // /mydashboard에서는 클릭 불가
  if (pathname === '/mydashboard') {
    return (
      <div className={styles.logoLink} aria-label="현재 페이지">
        {/* 데스크탑: 메인 로고 */}
        <Image
          src="/main-logo.svg"
          alt="Taskify"
          width={120}
          height={40}
          priority
          className={`${styles.logo} ${styles.desktop}`}
        />
        
        {/* 모바일: 심볼만 */}
        <Image
          src="/main-logo-symbol.svg"
          alt="Taskify"
          width={28}
          height={28}
          priority
          className={`${styles.logo} ${styles.mobile}`}
        />
      </div>
    );
  }

  // 이동할 경로 결정
  const targetPath = pathname?.startsWith('/dashboard/') || pathname === '/mypage'
    ? '/mydashboard'
    : '/';

  return (
    <Link 
      href={targetPath} 
      className={styles.logoLink} 
      aria-label={targetPath === '/mydashboard' ? '내 대시보드로 이동' : '홈으로 이동'}
    >
      {/* 데스크탑: 메인 로고 */}
      <Image
        src="/main-logo.svg"
        alt="Taskify"
        width={120}
        height={40}
        priority
        className={`${styles.logo} ${styles.desktop}`}
      />
      
      {/* 모바일: 심볼만 */}
      <Image
        src="/main-logo-symbol.svg"
        alt="Taskify"
        width={28}
        height={28}
        priority
        className={`${styles.logo} ${styles.mobile}`}
      />
    </Link>
  );
}

Logo.displayName = 'Logo';