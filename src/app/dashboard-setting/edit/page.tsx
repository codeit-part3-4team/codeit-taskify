'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import SideMenu from '@/components/SideMenu/SideMenu';
import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';
import TableMembers, { Member } from '@/components/CardTables/TableMembers/TableMembers';
import TableInvitations, { Invitation } from '@/components/CardTables/TableInvitations/TableInvitations';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import DeleteDashboardButton from '@/components/Buttons/domains/dashboard/DeleteDashboardButton/DeleteDashboardButton';
import TableModal from '@/components/CardTables/TableModal/TableModal';
import styles from './page.module.css';

import {
  deleteDashboard,
  getDashboardInvitations,
  cancelInvitation,
  getDashboardMembers,
} from '@/app/dashboard-setting/api/dashboardsetting';

export default function DashboardSettingsEditClient() {

  const router = useRouter();

  function handleOpenInvite() {
  router.push(`/dashboard-setting/invite?dashboardId=${selectedDashboardId}`);
}

  const dashboards = useMemo(
    () => [
      { id: 1, title: '대시보드', color: '#5534DA', createdByMe: true },
      { id: 2, title: '팀 프로젝트', color: '#76A5EA', createdByMe: false },
    ],
    []
  );

  const [selectedDashboardId, setSelectedDashboardId] = useState<number>(dashboards[0].id);
  const selectedDashboard =
    dashboards.find((d) => d.id === selectedDashboardId) ?? dashboards[0];

  /* ✅ 여기서 페이지 리셋까지 같이 처리 (effect 필요 없음) */
  const [memberPage, setMemberPage] = useState(1);
  const [invitePage, setInvitePage] = useState(1);

  function handleSelectDashboard(id: number) {
    setSelectedDashboardId(id);
    setMemberPage(1);
    setInvitePage(1);
  }

  /* ---------------- 사이드 메뉴 페이지 ---------------- */
  const [sidePage, setSidePage] = useState(1);

  /* ---------------- GNB ---------------- */
  const membersForGnb = [
    { id: 1, nickname: '홍길동', profileImageUrl: null },
    { id: 2, nickname: '김철수', profileImageUrl: null },
  ];
  const currentUser = { nickname: '현재사용자', profileImageUrl: null };

  /* =====================
     구성원 목록 (GET)
  ===================== */
  const MEMBER_SIZE = 20;
  const [memberTotalPages, setMemberTotalPages] = useState(1);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getDashboardMembers(selectedDashboardId, memberPage, MEMBER_SIZE);

        const mapped: Member[] = data.members.map((m) => ({
          id: m.id,
          name: m.nickname,
          initial: m.nickname?.[0] ?? '?',
          avatarColor: '#5534DA',
        }));

        setMembers(mapped);
        setMemberTotalPages(Math.max(1, Math.ceil(data.totalCount / MEMBER_SIZE)));
      } catch {
        setMembers([]);
        setMemberTotalPages(1);
      }
    }

    fetchMembers();
  }, [selectedDashboardId, memberPage]);

  /* =====================
     초대 목록 (GET)
  ===================== */
  const INVITE_SIZE = 10;
  const [inviteTotalPages, setInviteTotalPages] = useState(1);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    async function fetchInvites() {
      try {
        const data = await getDashboardInvitations(selectedDashboardId, invitePage, INVITE_SIZE);

        const mapped: Invitation[] = data.invitations.map((it) => ({
          id: it.id,
          email: it.invitee.email,
        }));

        setInvitations(mapped);
        setInviteTotalPages(Math.max(1, Math.ceil(data.totalCount / INVITE_SIZE)));
      } catch {
        setInvitations([]);
        setInviteTotalPages(1);
      }
    }

    fetchInvites();
  }, [selectedDashboardId, invitePage]);

  /* =====================
     초대 취소 (DELETE)
  ===================== */
  async function handleCancelInvite(invitationId: number | string) {
    if (!selectedDashboard.createdByMe) {
      alert('대시보드 생성자만 초대를 취소할 수 있어요.');
      return;
    }

    const ok = confirm('이 초대를 취소할까요?');
    if (!ok) return;

    await cancelInvitation(selectedDashboardId, Number(invitationId));

    setInvitations((prev) =>
      prev.filter((inv) => Number(inv.id) !== Number(invitationId))
    );
  }

  async function handleDeleteDashboard() {
    if (!selectedDashboard.createdByMe) {
      alert('대시보드 생성자만 삭제할 수 있어요.');
      return;
    }

    const ok = confirm(
      `"${selectedDashboard.title}" 대시보드를 정말 삭제할까요?\n삭제하면 복구할 수 없어요.`
    );
    if (!ok) return;

    try {
      await deleteDashboard(selectedDashboard.id);
      alert('대시보드가 삭제되었습니다.');
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('대시보드 삭제에 실패했어요 😢');
      }
    }
  }

  /* =====================
     🔙 돌아가기 버튼 로직 (추가된 부분)
  ===================== */
  function handleBack() {
    router.push(`/dashboard/${selectedDashboardId}`);
  }

//   function handleOpenInviteModal() {
//   router.push('/dashboard-setting/edit/invite-modal?dashboardId=' + selectedDashboardId);
// }

function handleOpenColumnModal() {
  router.push('/dashboard-setting/edit/column-modal');
}

  return (
    <div className={styles.layout}>
      <div className={styles.sideArea}>
        <SideMenu
          selectedDashboardId={selectedDashboardId}
          onDashboardClick={handleSelectDashboard}
          onAddDashboardClick={() => console.log('대시보드 추가')}
        />

        <PaginationButton
          size="large"
          prevDisabled={sidePage <= 1}
          nextDisabled={false}
          onPrevClick={() => setSidePage((p) => Math.max(1, p - 1))}
          onNextClick={() => setSidePage((p) => p + 1)}
        />
      </div>

      <div className={styles.mainArea}>
        <DashboardDetailGnb
          dashboardTitle={selectedDashboard.title}
          dashboardColor={selectedDashboard.color}
          members={membersForGnb}
          currentUser={currentUser}
          onManageClick={handleOpenColumnModal}
          onInviteClick={handleOpenInvite}
        />

        <main className={styles.content}>
          {/* 🔙 돌아가기 버튼 (수정된 부분) */}
          <button
            className={styles.backRow}
            onClick={handleBack}
            type="button"
          >
            ‹ 돌아가기
          </button>

          <section className={styles.card}>
            <TableModal
              dashboardId={selectedDashboard.id}
              defaultName={selectedDashboard.title}
              defaultColor={selectedDashboard.color}
              onSuccess={() => {}}
            />
          </section>

          <TableMembers
            members={members}
            page={memberPage}
            totalPages={memberTotalPages}
            onPrev={() => setMemberPage((p) => Math.max(1, p - 1))}
            onNext={() => setMemberPage((p) => Math.min(memberTotalPages, p + 1))}
          />

          <TableInvitations
            invitations={invitations}
            page={invitePage}
            totalPages={inviteTotalPages}
            onPrev={() => setInvitePage((p) => Math.max(1, p - 1))}
            onNext={() => setInvitePage((p) => Math.min(inviteTotalPages, p + 1))}
            onInvite={handleOpenInvite}
            onCancel={handleCancelInvite}
          />

          <DeleteDashboardButton
            size="desktop"
            onClick={handleDeleteDashboard}
          />
        </main>
      </div>
    </div>
  );
}
