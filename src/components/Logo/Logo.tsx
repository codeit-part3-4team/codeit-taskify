import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/Logo/Logo.module.css';

/**
 * @component Logo
 * 
 * @description
 * Taskify 서비스의 로고 컴포넌트입니다.
 * 클릭 시 홈("/")으로 이동하며, 반응형으로 모바일에서는 심볼만 표시합니다.
 * 
 * - 데스크탑: main-logo.svg (Taskify 텍스트 포함)
 * - 모바일: logo-symbol.svg (번개 심볼만)
 * 
 * @example
 * ```tsx
 * <Logo />
 * ```
 */

export default function Logo() {
  return (
    <Link href="/" className={styles.logoLink} aria-label="홈으로 이동">
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