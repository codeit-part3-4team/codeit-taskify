'use client';

import { useState, useEffect } from 'react';
import Gnb from '@/components/Gnb/Gnb';
import styles from '@/components/Gnb/Variants/DashboardDetailGnb/DashboardDetailGnb.module.css';

interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface DashboardDetailGnbProps {
  dashboardTitle: string;
  dashboardColor: string;
  members: Member[];
  currentUser: {
    nickname: string;
    profileImageUrl: string | null;
  };
  onManageClick?: () => void;
  onInviteClick?: () => void;
}

/**
 * @component DashboardDetailGnb
 * @description 대시보드 상세 페이지용 네비게이션 바
 * 
 * - 좌측: 대시보드 제목 + 왕관 아이콘
 * - 우측: 관리/초대하기 버튼 + 초대된 멤버들(겹침) + 내 프로필
 * - 반응형: 모바일에서 멤버 최대 3개, 데스크탑/태블릿 4개
 * 
 * @example
 * ```tsx
 * <DashboardDetailGnb
 *   dashboardTitle="예시 대시보드"
 *   dashboardColor="#5534DA"
 *   members={[
 *     { id: 1, nickname: "홍길동", profileImageUrl: null },
 *     { id: 2, nickname: "김철수", profileImageUrl: null }
 *   ]}
 *   currentUser={{ nickname: "공상우", profileImageUrl: null }}
 * />
 * ```
 */
export default function DashboardDetailGnb({
  dashboardTitle,
  dashboardColor,
  members,
  currentUser,
  onManageClick,
  onInviteClick,
}: DashboardDetailGnbProps) {
  // 반응형: 화면 크기에 따라 멤버 표시 개수 조정
  const [maxDisplayMembers, setMaxDisplayMembers] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      // 모바일(767px 이하): 3개, 데스크탑/태블릿: 4개
      setMaxDisplayMembers(window.innerWidth <= 767 ? 3 : 4);
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayMembers = members.slice(0, maxDisplayMembers);
  const remainingCount = members.length - maxDisplayMembers;

  return (
    <Gnb>
      <Gnb.Left>
        <div className={styles.titleArea}>
          <h1 className={styles.dashboardTitle}>{dashboardTitle}</h1>
          <img
            src="/icons/crown.svg"
            alt="왕관"
            className={styles.crownIcon}
            aria-hidden="true"
          />
        </div>
      </Gnb.Left>

      <Gnb.Right>
        <div className={styles.actions}>
          {/* 관리 버튼 */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={onManageClick}
            aria-label="대시보드 관리"
          >
            <img src="/icons/ic-setting.svg" alt="" aria-hidden="true" />
            <span>관리</span>
          </button>

          {/* 초대하기 버튼 */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={onInviteClick}
            aria-label="멤버 초대하기"
          >
            <img src="/icons/ic-invite.svg" alt="" aria-hidden="true" />
            <span>초대하기</span>
          </button>

          {/* 구분선 */}
          <div className={styles.divider} aria-hidden="true" />

          {/* 초대된 멤버들 (겹쳐서 표시) */}
          {members.length > 0 && (
            <div className={styles.membersArea}>
              {displayMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={styles.memberChip}
                  style={{
                    zIndex: displayMembers.length - index,
                    marginLeft: index > 0 ? '-12px' : '0',
                  }}
                  title={member.nickname}
                  aria-label={`${member.nickname}님의 프로필`}
                >
                  {member.profileImageUrl ? (
                    <img
                      src={member.profileImageUrl}
                      alt={member.nickname}
                      className={styles.memberImage}
                    />
                  ) : (
                    <div
                      className={styles.memberInitialWrapper}
                      style={{ backgroundColor: dashboardColor }}
                    >
                      <span className={styles.memberInitial}>
                        {member.nickname[0]}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* 최대 표시 개수 초과 시 "+N" 표시 */}
              {remainingCount > 0 && (
                <div
                  className={styles.moreCount}
                  style={{ marginLeft: '-12px' }}
                  title={`${remainingCount}명 더 보기`}
                >
                  +{remainingCount}
                </div>
              )}
            </div>
          )}

          {/* 내 프로필 */}
          <div className={styles.currentUserArea}>
            <div
              className={styles.currentUserChip}
              style={{ backgroundColor: dashboardColor }}
            >
              {currentUser.profileImageUrl ? (
                <img
                  src={currentUser.profileImageUrl}
                  alt={currentUser.nickname}
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
        </div>
      </Gnb.Right>
    </Gnb>
  );
}

DashboardDetailGnb.displayName = 'DashboardDetailGnb';