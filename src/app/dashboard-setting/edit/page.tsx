'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SideMenu from '@/components/SideMenu/SideMenu';
import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';
import TableMembers, { Member } from '@/components/CardTables/TableMembers/TableMembers';
import TableInvitations, { Invitation } from '@/components/CardTables/TableInvitations/TableInvitations';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import DeleteDashboardButton from '@/components/Buttons/domains/dashboard/DeleteDashboardButton/DeleteDashboardButton';

import styles from './page.module.css';

export default function DashboardSettingsEditClient() {
  const router = useRouter();

  /* ---------------- 사이드 메뉴 ---------------- */
  const dashboards = [
    { id: 1, title: '대시보드', color: '#5534DA', createdByMe: true },
    { id: 2, title: '팀 프로젝트', color: '#76A5EA', createdByMe: false },
  ];

  const [selectedDashboardId, setSelectedDashboardId] = useState(1);

  /* ✅ 사이드메뉴 페이지네이션 (예시 상태) */
  const [sidePage, setSidePage] = useState(1);
  const sideTotalPages = 3;
  const sideCanPrev = sidePage > 1;
  const sideCanNext = sidePage < sideTotalPages;

  /* ---------------- GNB ---------------- */
  const membersForGnb = [
    { id: 1, nickname: '홍길동', profileImageUrl: null },
    { id: 2, nickname: '김철수', profileImageUrl: null },
    { id: 3, nickname: '이영희', profileImageUrl: null },
  ];

  const currentUser = {
    nickname: '현재사용자',
    profileImageUrl: null,
  };

  /* ---------------- 구성원 테이블 ---------------- */
  const [memberPage, setMemberPage] = useState(1);
  const members: Member[] = [
    { id: 1, name: '홍길동', initial: '홍', avatarColor: '#5534DA' },
    { id: 2, name: '김철수', initial: '김', avatarColor: '#76A5EA' },
    { id: 3, name: '이영희', initial: '이', avatarColor: '#FFA500' },
  ];

  /* ---------------- 초대 내역 테이블 ---------------- */
  const [invitePage, setInvitePage] = useState(1);
  const invitations: Invitation[] = [
    { id: 1, email: 'test1@email.com' },
    { id: 2, email: 'test2@email.com' },
  ];

  const handleBack = () => {
    // ✅ 추천: settings/edit로 진입한 이전 경로가 애매하면 고정 경로로 보내는 게 안전
    router.back();
    // router.push('/dashboard'); // 필요하면 이걸로 교체
  };

  return (
    <div className={styles.layout}>
      {/* ✅ 왼쪽 사이드 메뉴 + 페이지네이션 */}
      <div className={styles.sideArea}>
        <SideMenu
          dashboards={dashboards}
          selectedDashboardId={selectedDashboardId}
          onDashboardClick={(id) => setSelectedDashboardId(id)}
          onAddDashboardClick={() => console.log('대시보드 추가 클릭')}
        />

        <PaginationButton
          size="large"
          prevDisabled={!sideCanPrev}
          nextDisabled={!sideCanNext}
          onPrevClick={() => setSidePage((p) => Math.max(1, p - 1))}
          onNextClick={() => setSidePage((p) => Math.min(sideTotalPages, p + 1))}
          className={styles.sidePagination}
        />
      </div>

      {/* ✅ 오른쪽 메인 영역 */}
      <div className={styles.mainArea}>
        <DashboardDetailGnb
          dashboardTitle="대시보드"
          dashboardColor="#5534DA"
          members={membersForGnb}
          currentUser={currentUser}
          onManageClick={() => console.log('관리 클릭')}
          onInviteClick={() => console.log('초대 클릭')}
        />

        <main className={styles.content}>
          {/* ✅ 돌아가기 (하얀 카드들 위) */}
          <button type="button" className={styles.backRow} onClick={handleBack}>
            <span className={styles.backIcon} aria-hidden="true">
              ‹
            </span>
            <span className={styles.backText}>돌아가기</span>
          </button>

          {/* 1️⃣ 새로운 대시보드 생성(추후 TableModal 들어갈 자리) */}
          <section className={styles.card}>{/* <TableModal /> */}</section>

          {/* 2️⃣ 구성원 내역 */}
          <TableMembers
            members={members}
            page={memberPage}
            totalPages={2}
            onPrev={() => setMemberPage((p) => Math.max(1, p - 1))}
            onNext={() => setMemberPage((p) => p + 1)}
            onRemove={(id) => console.log('구성원 삭제:', id)}
          />

          {/* 3️⃣ 초대 내역 */}
          <TableInvitations
            invitations={invitations}
            page={invitePage}
            totalPages={1}
            onPrev={() => setInvitePage((p) => Math.max(1, p - 1))}
            onNext={() => setInvitePage((p) => p + 1)}
            onInvite={() => console.log('초대하기 클릭')}
            onCancel={(id) => console.log('초대 취소:', id)}
          />

          {/* ✅ 초대 내역 아래 24px 갭 + 삭제 버튼 */}
          <div className={styles.deleteSection}>
            <DeleteDashboardButton
              size="desktop"
              onClick={() => console.log('대시보드 삭제하기 클릭')}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
