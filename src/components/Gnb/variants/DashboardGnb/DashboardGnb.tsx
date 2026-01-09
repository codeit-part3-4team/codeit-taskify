/**
 * DashboardGnb
 *
 * 대시보드 화면에서 사용되는 Gnb 변형 컴포넌트입니다.
 * 좌측에는 "내 대시보드" 텍스트,
 * 우측에는 관리 / 초대하기 버튼과
 * 사용자 프로필 이미지(없을 경우 대시보드 컬러 칩), 사용자 닉네임을 표시합니다.
 */

import Gnb from '@/components/Gnb/Gnb';
import styles from '@/components/Gnb/variants/DashboardGnb/DashboardGnb.module.css';

interface DashboardGnbProps {
  userNickname: string;
  dashboardColor: string;
  profileImageUrl?: string | null;
  onManageClick?: () => void;
  onInviteClick?: () => void;
  showActions?: boolean;
}

export default function DashboardGnb({
  userNickname,
  dashboardColor,
  profileImageUrl,
  onManageClick,
  onInviteClick,
  showActions = true,
}: DashboardGnbProps) {
  return (
    <Gnb>
      <Gnb.Left>
        <span className={styles.title}>내 대시보드</span>
      </Gnb.Left>

      <Gnb.Right>
      {showActions && ( 
          <>
            <button
              type="button"
              className={styles.actionButton}
              onClick={onManageClick}
            >
              <img src="/icons/ic-setting.svg" alt="" aria-hidden />
              관리
            </button>

            <button
              type="button"
              className={styles.actionButton}
              onClick={onInviteClick}
            >
              <img src="/icons/ic-invite.svg" alt="" aria-hidden />
              초대하기
            </button>

            <span className={styles.divider} />
          </>
        )}

        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${userNickname} 프로필`}
            className={styles.profileImage}
          />
        ) : (
          <span
            className={styles.colorChip}
            style={{ backgroundColor: dashboardColor }}
          />
        )}

        <span className={styles.userName}>{userNickname}</span>
      </Gnb.Right>
    </Gnb>
  );
}

DashboardGnb.displayName = 'DashboardGnb';
