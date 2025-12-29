// app/Test/page.tsx
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>TEST PAGE</h1>
      <Link href="/login">로그인 모달 열기</Link>
    </>
  );
}
