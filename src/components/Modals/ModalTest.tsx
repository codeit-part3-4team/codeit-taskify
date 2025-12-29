'use client';

import { useRouter } from 'next/navigation';

type ModalProps = {
  children: React.ReactNode;
};

export default function ModalTest({ children }: ModalProps) {
  const router = useRouter();

  return (
    <div style={{ border: '2px solid red', padding: 20 }}>
      <button onClick={() => router.back()}>닫기</button>
      {children}
    </div>
  );
}
