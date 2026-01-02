"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./dropdownmanager.module.css";

export type Manager = {
  id: string;
  name: string;
};

type Props = {
  managers: Manager[];             
  value?: Manager | null;           
  onChange: (next: Manager | null) => void;

  placeholder?: string;             // "이름을 입력해 주세요"
  disabled?: boolean;
};

function getInitial(name: string) {
  return name?.trim()?.[0] ?? "";
}

function avatarTone(id: string) {
  const n = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return n % 2 === 0 ? "green" : "orange";
}

export default function ManagerSelect({
  managers,
  value,
  onChange,
  placeholder = "이름을 입력해 주세요",
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listId = useId();

  const displayValue = open ? query : value?.name ?? "";

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return managers;

    return managers.filter((m) => m.name.includes(q));
  }, [managers, query]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openDropdown = () => {
    if (disabled) return;
    setOpen(true);
    setQuery("");
  };

  const handlePick = (m: Manager) => {
    onChange(m);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={`${styles.control} ${open ? styles.controlFocused : ""}`}>
        {/* 선택값이 있을 때만 아바타(초록/주황) 표시 */}
        {value && !open && (
          <span
            className={`${styles.avatar} ${
              avatarTone(value.id) === "green" ? styles.avatarGreen : styles.avatarOrange
            }`}
            aria-hidden="true"
          >
            {getInitial(value.name)}
          </span>
        )}

        <input
          ref={inputRef}
          className={`${styles.input} text-md-regular`}
          value={displayValue}
          placeholder={value ? "" : placeholder}
          onFocus={openDropdown}
          onClick={openDropdown}
          onChange={(e) => {
            setOpen(true);
            setQuery(e.target.value);
          }}
          disabled={disabled}
          aria-expanded={open}
          aria-controls={listId}
        />

        <span className={`${styles.caret} ${open ? styles.caretUp : ""}`} aria-hidden="true" />
      </div>

      {open && filtered.length > 0 && (
        <div id={listId} role="listbox" className={styles.panel}>
          {filtered.map((m) => {
            const selected = value?.id === m.id;
            const tone = avatarTone(m.id);

            return (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={styles.row}
                onClick={() => handlePick(m)}
              >
                <span className={styles.checkArea} aria-hidden="true">
                  {selected && <span className={styles.checkIcon}>✓</span>}
                </span>

                <span
                  className={`${styles.avatar} ${
                    tone === "green" ? styles.avatarGreen : styles.avatarOrange
                  }`}
                  aria-hidden="true"
                >
                  {getInitial(m.name)}
                </span>

                <span className={`${styles.name} text-md-regular`}>{m.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
