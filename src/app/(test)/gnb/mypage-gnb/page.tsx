// app/(test)/gnb/mypage-gnb/page.tsx

'use client';

import MyPageGnb from '@/components/gnb/variants/MyPageGnb';

export default function MyPageGnbTestPage() {
  return (
    <div>
      <h2 style={{ padding: '20px' }}>MyPageGnb 테스트</h2>

      {/* 기본 테스트 */}
      <MyPageGnb
        currentUser={{ nickname: '공상우', profileImageUrl: null }}
        dashboardColor="#5534DA"
      />

      {/* 다른 색상 */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ padding: '0 20px', color: '#666' }}>주황색</p>
        <MyPageGnb
          currentUser={{ nickname: '홍길동', profileImageUrl: null }}
          dashboardColor="#FFA500"
        />
      </div>

      {/* 프로필 이미지 있음 */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ padding: '0 20px', color: '#666' }}>프로필 이미지 있음</p>
        <MyPageGnb
          currentUser={{
            nickname: '김철수',
            profileImageUrl: 'https://i.pravatar.cc/38?img=1',
          }}
          dashboardColor="#9FEB8F"
        />
      </div>

      {/* 긴 닉네임 */}
      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <p style={{ padding: '0 20px', color: '#666' }}>긴 닉네임</p>
        <MyPageGnb
          currentUser={{ nickname: '매우긴닉네임입니다', profileImageUrl: null }}
          dashboardColor="#E53E3E"
        />
      </div>
    </div>
  );
}
