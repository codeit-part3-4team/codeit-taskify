import { useRouter } from 'next/navigation';

type DefaultModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  children?: React.ReactNode;
  closeButton?: boolean;
};

export default function DefaultModal({
  title,
  message,
  children,
  actionsButton,
  closeButton,
}: DefaultModalProps) {
  const router = useRouter();

  return (
    <>
      {title && <h2>{title}</h2>}
      {message && <div>{message}</div>}
      {children}
      {/* 버튼컴포넌트 올 자리 */}
      {actionsButton && <div>{actionsButton}</div>}
      {closeButton && <button onClick={() => router.back()}>닫기</button>}
    </>
  );
}
