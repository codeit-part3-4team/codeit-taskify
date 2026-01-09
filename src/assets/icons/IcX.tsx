/**
 * X (닫기) 아이콘
 *
 * @description 모달, 다이얼로그 등을 닫을 때 사용하는 X 형태 아이콘입니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <IcX />
 *
 * // 크기 변경
 * <IcX width={32} height={32} />
 *
 * // 클릭 이벤트
 * <IcX onClick={handleClose} />
 * ```
 */
export default function IcX({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
