/**
 * Checkbox Active (활성) 아이콘
 *
 * @description 체크된 상태의 체크박스 아이콘입니다. 로그인 유지 등의 체크박스 UI에 사용됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <IcCheckboxActive />
 *
 * // 크기 변경
 * <IcCheckboxActive width={24} height={24} />
 *
 * // 클릭 이벤트
 * <IcCheckboxActive onClick={() => setChecked(false)} />
 *
 * // 조건부 렌더링
 * {isChecked && <IcCheckboxActive />}
 *
 * // 토글 예시
 * {isChecked ? <IcCheckboxActive onClick={toggle} /> : <IcCheckbox onClick={toggle} />}
 * ```
 */
export default function IcCheckboxActive({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#F1EFFD" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#D9D9D9" />
      <path
        d="M5 10L9 14L15 6"
        stroke="#5534DA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
