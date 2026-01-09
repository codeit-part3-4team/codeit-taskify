// app/(test)/gnb/dashboard-detail-gnb/page.tsx

'use client';

import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';

export default function DashboardDetailGnbTestPage() {
  // Mock 데이터
  const mockMembers = [
    { id: 1, nickname: '홍길동', profileImageUrl: null },
    { id: 2, nickname: '김철수', profileImageUrl: null },
    { id: 3, nickname: '박영희', profileImageUrl: null },
    { id: 4, nickname: '이순신', profileImageUrl: null },
    { id: 5, nickname: '강감찬', profileImageUrl: null },
    { id: 6, nickname: '세종대왕', profileImageUrl: null },
  ];

  return (
    <div>
      <h2 style={{ padding: '20px' }}>DashboardDetailGnb 테스트</h2>

      {/* 기본 테스트 */}
      <DashboardDetailGnb
        dashboardTitle="예시 대시보드"
        dashboardColor="#5534DA"
        members={mockMembers}
        currentUser={{ nickname: '공상우', profileImageUrl: null }}
        onManageClick={() => alert('관리 클릭!')}
        onInviteClick={() => alert('초대하기 클릭!')}
      />

      {/* 멤버 1명 */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ padding: '0 20px' }}>멤버 1명</p>
        <DashboardDetailGnb
          dashboardTitle="테스트 대시보드"
          dashboardColor="#FFA500"
          members={[mockMembers[0]]}
          currentUser={{ nickname: '공상우', profileImageUrl: null }}
          onManageClick={() => console.log('관리')}
          onInviteClick={() => console.log('초대')}
        />
      </div>

      {/* 멤버 없음 */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ padding: '0 20px' }}>멤버 없음 (나만)</p>
        <DashboardDetailGnb
          dashboardTitle="개인 대시보드"
          dashboardColor="#9FEB8F"
          members={[]}
          currentUser={{ nickname: '공상우', profileImageUrl: null }}
          onManageClick={() => console.log('관리')}
          onInviteClick={() => console.log('초대')}
        />
      </div>

      {/* 긴 제목 테스트 */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ padding: '0 20px' }}>긴 제목</p>
        <DashboardDetailGnb
          dashboardTitle="이것은 매우 긴 대시보드 제목입니다 어떻게 표시될까요"
          dashboardColor="#E53E3E"
          members={mockMembers.slice(0, 3)}
          currentUser={{ nickname: '공상우', profileImageUrl: null }}
          onManageClick={() => console.log('관리')}
          onInviteClick={() => console.log('초대')}
        />
      </div>
    </div>
  );
}