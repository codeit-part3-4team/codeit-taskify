/**
 * Checkbox (비활성) 아이콘
 *
 * @description 체크되지 않은 상태의 체크박스 아이콘입니다. 로그인 유지 등의 체크박스 UI에 사용됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <IcCheckbox />
 *
 * // 크기 변경
 * <IcCheckbox width={24} height={24} />
 *
 * // 클릭 이벤트
 * <IcCheckbox onClick={() => setChecked(true)} />
 *
 * // 조건부 렌더링
 * {!isChecked && <IcCheckbox />}
 * ```
 */
export default function IcCheckbox({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#D9D9D9" />
    </svg>
  );
}
