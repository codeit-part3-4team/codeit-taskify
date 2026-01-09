/**
 * Email (이메일) 아이콘
 *
 * @description 편지 봉투 모양의 이메일 아이콘입니다. 이메일 주소 표시나 연락처 정보에서 사용됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <IcEmail />
 *
 * // 크기 변경
 * <IcEmail width={24} height={24} />
 *
 * // 이메일 링크와 함께
 * <a href="mailto:contact@example.com">
 *   <IcEmail /> contact@example.com
 * </a>
 * ```
 */
export default function IcEmail({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M10 13.75C9.3543 13.75 8.70859 13.5382 8.15781 13.109L0 6.76562V15.625C0 16.6602 0.839453 17.5 1.875 17.5H18.125C19.1605 17.5 20 16.6605 20 15.625V6.76562L11.8438 13.1133C11.293 13.5391 10.6445 13.75 10 13.75ZM0.636328 5.67578L8.92539 12.125C9.55781 12.6172 10.4437 12.6172 11.0762 12.125L19.3652 5.67578C19.7305 5.36328 20 4.88281 20 4.375C20 3.33945 19.1602 2.5 18.125 2.5H1.875C0.839453 2.5 0 3.33945 0 4.375C0 4.88281 0.234766 5.36328 0.636328 5.67578Z"
        fill="currentColor"
      />
    </svg>
  );
}
