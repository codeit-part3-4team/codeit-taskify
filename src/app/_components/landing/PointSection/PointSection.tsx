'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './PointSection.module.css';

interface PointCardProps {
  number: string;
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

/**
 * @component PointCard
 * @description 핵심 기능을 소개하는 개별 카드 컴포넌트
 */
function PointCard({ 
  number,
  title, 
  description, 
  imageSrc, 
  imageAlt,
  reverse = false 
}: PointCardProps) {
  return (
    <motion.div 
      className={`${styles.card} ${reverse ? styles.reverse : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* 텍스트 영역 */}
      <div className={styles.textContent}>
        <span className={styles.number}>{number}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* 이미지 영역 */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={594}
          height={497}
          className={styles.image}
        />
      </div>
    </motion.div>
  );
}

/**
 * @component PointSection
 * @description 랜딩 페이지의 핵심 기능 소개 섹션
 * 
 * - Point 1: 일의 우선순위 관리
 * - Point 2: 할 일 등록
 */
export default function PointSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Point 1: 우선순위 관리 */}
        <PointCard
          number="01"
          title={
            <>
              일의 우선순위를
              <br />
              관리하세요
            </>
          }
          description="Taskify를 사용하면 모든 작업을 체계적으로 정리하고, 중요한 일부터 처리할 수 있습니다."
          imageSrc="/images/landing/priority-management.png"
          imageAlt="일의 우선순위 관리 화면"
        />

        {/* Point 2: 할 일 등록 */}
        <PointCard
          number="02"
          title={
            <>
              해야 할 일을
              <br />
              등록하세요
            </>
          }
          description="간단하게 할 일을 추가하고, 마감일과 담당자를 지정하여 팀원들과 협업하세요."
          imageSrc="/images/landing/task-creation.png"
          imageAlt="할 일 등록 화면"
          reverse
        />
      </div>
    </section>
  );
}