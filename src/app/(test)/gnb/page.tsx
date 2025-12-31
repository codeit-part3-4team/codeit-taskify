// src/app/(test)/gnb/page.tsx
import Gnb from '@/components/gnb/Gnb';

export default function GnbTestPage() {
  return (
    <div>
      <Gnb>
        <Gnb.Left>
          <span>Taskify</span>
        </Gnb.Left>

        <Gnb.Center>
          <span>내 대시보드</span>
        </Gnb.Center>

        <Gnb.Right>
          <button>로그인</button>
          <button>회원가입</button>
          <button>위치3 예시</button>
        </Gnb.Right>
      </Gnb>
    </div>
  );
}