'use client';

import styles from './LandingFooter.module.css';

import IcEmail from '@/assets/icons/IcEmail';
import IcFacebook from '@/assets/icons/IcFacebook';
import IcInstagram from '@/assets/icons/IcInstagram';

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left */}
        <span className={`${styles.copy} text-sm-medium`}>
          © codeit - 2026
        </span>

        {/* Center */}
        <div className={styles.links}>
          <button type="button" className={`${styles.link} text-sm-medium`}>
            Privacy Policy
          </button>
          <button type="button" className={`${styles.link} text-sm-medium`}>
            FAQ
          </button>
        </div>

        {/* Right */}
        <div className={styles.icons}>
          <IcEmail className={styles.icon} />
          <IcFacebook className={styles.icon} />
          <IcInstagram className={styles.icon} />
        </div>
      </div>
    </footer>
  );
}
