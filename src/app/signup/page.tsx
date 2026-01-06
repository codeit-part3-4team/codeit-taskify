import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './SignupForm';
import styles from './page.module.css';

export default function SignupPage() {
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
        <p className={styles.welcomeText}>첫 방문을 환영합니다!</p>

        {/* 👇 인터랙션은 전부 client로 위임 */}
        <SignupForm />

        {/* 로그인 링크 */}
        <p className={styles.loginText}>
          이미 회원이신가요?{' '}
          <Link href="/login" className={styles.loginLink}>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
