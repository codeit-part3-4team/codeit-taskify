'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './SettingsSection.module.css';

interface SettingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

function SettingCard({
  title,
  description,
  imageSrc,
  imageAlt,
  index,
}: SettingCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.imageInner}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.textContent}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
}

export default function SettingsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          생산성을 높이는 다양한 설정{' '}
          <span className={styles.emoji}>⚡</span>
        </motion.h2>

        <div className={styles.grid}>
          <SettingCard
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요"
            imageSrc="/images/landing/dashboard-settings.png"
            imageAlt="대시보드 설정 화면"
            index={0}
          />

          <SettingCard
            title="초대"
            description="새로운 팀원을 초대할 수 있어요"
            imageSrc="/images/landing/member-invitation.png"
            imageAlt="팀원 초대 화면"
            index={1}
          />

          <SettingCard
            title="구성원"
            description="구성원을 초대하고 내보낼 수 있어요"
            imageSrc="/images/landing/team-management.png"
            imageAlt="구성원 관리 화면"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
