import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Taskify</h1>
      <Link href="/cards">모달 열기</Link>
    </main>
  );
}
