"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./dropdownprogress.module.css";

export type ProgressValue = "todo" | "inprogress" | "done";

export type ProgressOption = {
  value: ProgressValue;
  label: string;
};

type Props = {
  value: ProgressValue;
  options?: ProgressOption[];
  onChange: (next: ProgressValue) => void;
  disabled?: boolean;
};

const DEFAULT_OPTIONS: ProgressOption[] = [
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "On Progress" },
  { value: "done", label: "Done" },
];

export default function DropdownProgress({
  value,
  options = DEFAULT_OPTIONS,
  onChange,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? options[0],
    [options, value]
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t)) setOpen(false);
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

  const toggle = () => {
    if (disabled) return;
    setOpen((v) => !v);
  };

  const handlePick = (next: ProgressValue) => {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {/* 닫힌 상태 버튼: 217 x 48 */}
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.control} ${open ? styles.controlOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        disabled={disabled}
      >
        <span className={styles.chip}>
          <span className={styles.dot} aria-hidden="true" />
          <span className="text-md-regular">{selected.label}</span>
        </span>

        <span
          className={`${styles.caret} ${open ? styles.caretUp : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* ✅ 목록은 버튼 "아래"로 뜸 / ✅ 높이 144px */}
      {open && (
        <div id={menuId} role="listbox" className={styles.panel}>
          {options.map((opt) => {
            const isSelected = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={styles.row}
                onClick={() => handlePick(opt.value)}
              >
                <div className={styles.leftGroup}>
                    <span className={styles.checkArea} aria-hidden="true">
                    {isSelected && <span className={styles.checkIcon}>✓</span>}
                    </span>

                    <span className={styles.chip}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className="text-md-regular">{opt.label}</span>
                    </span>
                </div>
                <span className={styles.smallCaret} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
