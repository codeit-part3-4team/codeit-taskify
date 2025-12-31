/**
 * @component LandingGnb
 * @description
 * 랜딩 페이지에서 사용되는 GNB입니다.
 * 좌측에는 서비스 로고, 우측에는 로그인/회원가입 링크를 노출합니다.
 * 인증 상태와 무관하게 항상 동일한 구조를 가집니다.
 */

import Link from 'next/link';
import Gnb from '@/components/gnb/Gnb';
import Logo from '@/components/Logo/Logo';
import styles from '@/components/gnb/variants/LandingGnb/LandingGnb.module.css';


export default function LandingGnb() {
  return (
    <Gnb className={styles.gnb}>
      <Gnb.Left>
        <Logo />
      </Gnb.Left>

      <Gnb.Right>
        <nav className={styles.authLinks}>
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
          <Link href="/signup" className={styles.signup}>
            회원가입
          </Link>
        </nav>
      </Gnb.Right>
    </Gnb>
  );
}

LandingGnb.displayName = 'LandingGnb';
