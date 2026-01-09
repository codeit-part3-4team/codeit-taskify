import type { Metadata } from 'next';
import '@/styles/reset.css';
import '@/app/globals.css';
import '@/styles/tokens.css';

export const metadata: Metadata = {
  title: 'Taskify',
  description: '일정 관리 프로젝트',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
