// components/gnb/variants/MyPageGnb/MyPageGnb.tsx

/**
 * @component MyPageGnb
 * @description 마이페이지용 네비게이션 바
 * 
 * - 좌측: "계정 관리" 고정 텍스트
 * - 우측: 사용자 프로필 (chip + 닉네임)
 * 
 * @example
 * ```tsx
 * <MyPageGnb
 *   currentUser={{ nickname: "공상우", profileImageUrl: null }}
 *   dashboardColor="#5534DA"
 * />
 * ```
 */

import Gnb from '@/components/gnb/Gnb';
import styles from './MyPageGnb.module.css';

// ============================================================================
// Types
// ============================================================================

interface MyPageGnbProps {
  /** 현재 로그인한 사용자 정보 */
  currentUser: {
    nickname: string;
    profileImageUrl: string | null;
  };
  /** 프로필 chip 배경색 (Hex 코드) */
  dashboardColor: string;
}

// ============================================================================
// Component
// ============================================================================

export default function MyPageGnb({
  currentUser,
  dashboardColor,
}: MyPageGnbProps) {
  return (
    <Gnb>
      {/* ========== LEFT: 계정 관리 (고정) ========== */}
      <Gnb.Left>
        <h1 className={styles.pageTitle}>계정 관리</h1>
      </Gnb.Left>

      {/* ========== RIGHT: 사용자 프로필만 ========== */}
      <Gnb.Right>
        <div className={styles.userArea}>
          <div
            className={styles.profileChip}
            style={{ backgroundColor: dashboardColor }}
          >
            {currentUser.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt={`${currentUser.nickname}님의 프로필 이미지`}
                className={styles.profileImage}
              />
            ) : (
              <span className={styles.profileInitial}>
                {currentUser.nickname[0]}
              </span>
            )}
          </div>
          <span className={styles.userName}>{currentUser.nickname}</span>
        </div>
      </Gnb.Right>
    </Gnb>
  );
}

MyPageGnb.displayName = 'MyPageGnb';