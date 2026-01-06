'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LoginButton from '@/components/Buttons/domains/login/LoginButton/LoginButton';
import styles from './HeroSection.module.css';

/**
 * @component HeroSection
 * @description 랜딩 페이지의 히어로 섹션 (메인 비주얼 영역)
 * 
 * - "새로운 일정 관리 Taskify" 타이틀 + 애니메이션
 * - 서브 타이틀 (소개 문구)
 * - 팀 협업 일러스트 이미지
 * - "로그인하기" CTA 버튼
 * - 반응형 대응 (데스크탑, 태블릿, 모바일)
 */
export default function HeroSection() {
  // 텍스트 애니메이션 설정
  const titleText = "새로운 일정 관리";
  const letters = titleText.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    }
  };

  const taskifyAnimation: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        type: "spring" as const,
        damping: 10,
      }
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* 일러스트레이션 이미지 */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/landing/hero-illustration.png"
            alt="팀 협업 일러스트"
            width={722}
            height={423}
            priority
            className={styles.illustration}
          />
        </motion.div>

        {/* 타이틀 */}
        <motion.h1
          className={styles.title}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={child}
              className={styles.letter}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <motion.span 
            variants={taskifyAnimation}
            className={styles.highlight}
            style={{ marginLeft: '15px' }}
          >
            Taskify
          </motion.span>
        </motion.h1>

        {/* 서브 타이틀 (줄바꿈 방지) */}
        <motion.h2
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Taskify로 모든 일을 한 곳에서 처리하고 빠르게 작업을 완료할 수 있습니다.{' '}
          <span className={styles.noWrap}>무료로 사용해보세요!</span>
        </motion.h2>

        {/* CTA 버튼 */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link href="/login">
            <LoginButton size="large" variant="active">
              로그인하기
            </LoginButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}