"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "././dropdownmenu.module.css";

export type DropdownItem = {
  id: string;
  label: string;
  variant?: "default" | "danger";
};

type Props = {
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;

  /** 예: '수정하기'를 기본 강조 */
  highlightedId?: string;

  /** 테스트용 트리거 라벨 */
  triggerLabel?: string;

  /** 메뉴 정렬 */
  align?: "left" | "right";
};

export default function DropdownMenu({
  items,
  onSelect,
  highlightedId,
  triggerLabel = "dropdown",
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  // 바깥 클릭 / ESC 닫기
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!rootRef.current?.contains(target)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (item: DropdownItem) => {
    onSelect?.(item);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="dropdown menu"
          className={`${styles.menu} ${
            align === "right" ? styles.alignRight : styles.alignLeft
          }`}
        >
          <div className={styles.itemsWrap}>
            {items.map((item) => {
              const isHighlighted = highlightedId === item.id;
              const isDanger = item.variant === "danger";

              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={[
                    styles.item,
                    isHighlighted ? styles.itemHighlighted : "",
                    isDanger ? styles.itemDanger : "",
                  ].join(" ")}
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
