// app/(test)/gnb/mypage-gnb/page.tsx
'use client';

import MyPageGnb from '@/components/Gnb/variants/MyPageGnb/MyPageGnb';

export default function MyPageGnbTestPage() {
  const mockMembers = [
    { id: 1, nickname: '홍길동', profileImageUrl: null },
    { id: 2, nickname: '김철수', profileImageUrl: null },
    { id: 3, nickname: '박영희', profileImageUrl: null },
    { id: 4, nickname: '이순신', profileImageUrl: null },
    { id: 5, nickname: '강감찬', profileImageUrl: null },
  ];

  return (
    <div>
      {/* 기본 테스트 */}
      <MyPageGnb
        dashboardColor="#5534DA"
        members={mockMembers}
        currentUser={{ nickname: '공상우', profileImageUrl: null }}
        onManageClick={() => alert('관리 클릭!')}
        onInviteClick={() => alert('초대하기 클릭!')}
      />
      <h2 style={{ padding: '20px' }}>MyPageGnb 테스트</h2>
    </div>
  );
}