'use client';

import DashboardGnb from '@/components/Gnb/variants/DashboardGnb/DashboardGnb';

export default function DashboardGnbTestPage() {
  return (
    <div>
      {/* 기본 테스트 */}
      <DashboardGnb
        userNickname="이륭"
        dashboardColor="#9FEB8F"
        profileImageUrl={null}
        onManageClick={() => alert('관리 클릭!')}
        onInviteClick={() => alert('초대하기 클릭!')}
      />

      {/* 여러 색상으로 테스트 */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5' }}>
        <h2 style={{ marginBottom: '20px' }}>다양한 색상 테스트</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '8px' }}>🟠 주황색</p>
          <DashboardGnb
            userNickname="홍길동"
            dashboardColor="#FFA500"
            profileImageUrl={null}
            onManageClick={() => console.log('관리')}
            onInviteClick={() => console.log('초대')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '8px' }}>🟣 보라색</p>
          <DashboardGnb
            userNickname="김철수"
            dashboardColor="#5534DA"
            profileImageUrl={null}
            onManageClick={() => console.log('관리')}
            onInviteClick={() => console.log('초대')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '8px' }}>🖼️ 프로필 이미지 있음</p>
          <DashboardGnb
            userNickname="박영희"
            dashboardColor="#E53E3E"
            profileImageUrl="https://via.placeholder.com/38"
            onManageClick={() => console.log('관리')}
            onInviteClick={() => console.log('초대')}
          />
        </div>
      </div>
    </div>
  );
}