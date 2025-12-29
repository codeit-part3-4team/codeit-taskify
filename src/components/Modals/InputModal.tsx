import { useRouter } from 'next/navigation';

type InputModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  closeButton?: boolean;
};

export default function InputModal({
  title,
  message,
  actionsButton,
  closeButton,
}: InputModalProps) {
  const router = useRouter();

  return (
    <>
      <h2>{title}</h2>
      <p>{message}</p>
      {/* Input컴포넌트로 교체 */}
      <input type="text" />
      {/* 버튼컴포넌트 올 자리 */}
      {actionsButton && <div>{actionsButton}</div>}
      {closeButton && <button onClick={() => router.back()}>닫기</button>}
    </>
  );
}
