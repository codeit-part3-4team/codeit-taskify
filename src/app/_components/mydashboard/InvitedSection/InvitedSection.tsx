'use client';

import { useState, useEffect } from 'react';
import styles from './InvitedSection.module.css';
import TableInvitedDashboards from '@/components/CardTables/TableInvitedDashboards/TableInvitedDashboards';
import InvitedDashboardEmptyCard from '@/components/CardTables/InvitedDashboardEmptyCard/InvitedDashboardEmptyCard';
import { getMyInvitations, respondToInvitation } from '@/lib/api/invitations';
import { Invitation } from '@/types/dashboard';

export default function InvitedSection() {
  const [searchValue, setSearchValue] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvitations() {
      try {
        setLoading(true);
        const data = await getMyInvitations(1, 100);
        setInvitations(data.invitations);
      } catch (err) {
        console.error('초대 목록 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInvitations();
  }, []);

  const filteredInvitations = invitations.filter((inv) =>
    inv.dashboard.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAccept = async (id: number | string) => {
    try {
      await respondToInvitation(Number(id), true);
      console.log(`초대 수락: ${id}`);
      
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error('초대 수락 실패:', err);
      alert('초대 수락에 실패했습니다.');
    }
  };

  const handleReject = async (id: number | string) => {
    try {
      await respondToInvitation(Number(id), false);
      console.log(`초대 거절: ${id}`);
      
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      
      // ✅ alert 제거 (성공 시)
    } catch (err) {
      console.error('초대 거절 실패:', err);
      alert('초대 거절에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className={styles.container}>
        <InvitedDashboardEmptyCard />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TableInvitedDashboards
        items={filteredInvitations.map((inv) => ({
          id: inv.id,
          name: inv.dashboard.title,
          inviter: inv.inviter.nickname,
        }))}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}