import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/Logo/Logo.module.css';

/**
 * @component Logo 컴포넌트
 * 
 * @description
 * Taskify 서비스의 기본 로고 컴포넌트입니다.
 * 클릭 시 홈("/")으로 이동하며, 크기는 CSS에서 반응형으로 처리됩니다.
 * 
 */

export default function Logo() {
  return (
    <Link href="/" className={styles.logoLink} aria-label="홈으로 이동">
      <Image
        src="/logo.svg"
        alt="Taskify"
        width={120}
        height={40}
        priority
        className={styles.logo}
      />
    </Link>
  );
}

Logo.displayName = 'Logo';