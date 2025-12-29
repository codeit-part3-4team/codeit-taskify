type DefaultModalProps = {
  title?: string;
  message?: string;
  actionsButton?: React.ReactNode;
  children?: React.ReactNode;
};

export default function DefaultModal({
  title,
  message,
  children,
  actionsButton,
}: DefaultModalProps) {
  return (
    <>
      {title && <h2>{title}</h2>}
      {message && <div>{message}</div>}
      {children}
      {/* 버튼컴포넌트 올 자리 */}
      {actionsButton && <div>{actionsButton}</div>}
    </>
  );
}
