'use client';

import { useState } from 'react';
import SideMenu from '@/components/SideMenu/SideMenu';
import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';
import TableModal from '@/components/CardTables/TableModal/TableModal';
import TableMembers, { Member } from '@/components/CardTables/TableMembers/TableMembers';
import TableInvitations, { Invitation } from '@/components/CardTables/TableInvitations/TableInvitations';
import styles from './page.module.css';

export default function DashboardSettingsEditClient() {
  /* ---------------- 사이드 메뉴 ---------------- */
  const dashboards = [
    { id: 1, title: '가을 대시보드', color: '#5534DA', createdByMe: true },
    { id: 2, title: '팀 프로젝트', color: '#76A5EA', createdByMe: false },
  ];

  const [selectedDashboardId, setSelectedDashboardId] = useState(1);

  /* ---------------- GNB ---------------- */
  const membersForGnb = [
    { id: 1, nickname: '홍길동'},
    { id: 2, nickname: '김철수' },
    { id: 3, nickname: '이영희' },
  ];

  const currentUser = {
    nickname: '현재사용자'
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

  return (
    <div className={styles.layout}>
      {/* ✅ 왼쪽 사이드 메뉴 */}
      <SideMenu
        dashboards={dashboards}
        selectedDashboardId={selectedDashboardId}
        onDashboardClick={(id) => setSelectedDashboardId(id)}
        onAddDashboardClick={() => {
          console.log('대시보드 추가 클릭');
        }}
      />

      {/* ✅ 오른쪽 메인 영역 */}
      <div className={styles.mainArea}>
        {/* 상단 GNB */}
        <DashboardDetailGnb
          dashboardTitle="대시보드"
          dashboardColor="#5534DA"
          members={membersForGnb}
          currentUser={currentUser}
          onManageClick={() => console.log('관리 클릭')}
          onInviteClick={() => console.log('초대 클릭')}
        />

        {/* ================== 본문 ================== */}
        <main className={styles.content}>
          {/* 1️⃣ 새로운 대시보드 생성 */}
          <section className={styles.card}>
          <TableModal />
          </section>

          {/* 2️⃣ 구성원 내역 */}
          <TableMembers
            members={members}
            page={memberPage}
            totalPages={2}
            onPrev={() => setMemberPage((p) => Math.max(1, p - 1))}
            onNext={() => setMemberPage((p) => p + 1)}
            onRemove={(id) => {
              console.log('구성원 삭제:', id);
            }}
          />

          {/* 3️⃣ 초대 내역 */}
          <TableInvitations
            invitations={invitations}
            page={invitePage}
            totalPages={1}
            onPrev={() => setInvitePage((p) => Math.max(1, p - 1))}
            onNext={() => setInvitePage((p) => p + 1)}
            onInvite={() => {
              console.log('초대하기 클릭');
            }}
            onCancel={(id) => {
              console.log('초대 취소:', id);
            }}
          />
        </main>
      </div>
    </div>
  );
}
