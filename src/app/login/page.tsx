import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 로고 */}
        <Link href="/" className={styles.logoLink}>
          <Image src="/main-logo-desktop.svg" alt="Taskify" width={200} height={280} priority />
        </Link>

        {/* 환영 메시지 */}
        <p className={styles.welcomeText}>오늘도 만나서 반가워요!</p>

        {/* 👇 인터랙션은 전부 client로 위임 */}
        <LoginForm />

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
