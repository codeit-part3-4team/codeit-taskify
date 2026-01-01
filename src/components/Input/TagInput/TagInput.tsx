'use client';

import { useState, KeyboardEvent, forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './TagInput.module.css';

interface TagInputProps {
  /** Input 상단에 표시될 라벨 */
  label: string;
  /** placeholder */
  placeholder?: string;
  /** 현재 태그 목록 */
  tags: string[];
  /** 태그 변경 핸들러 */
  onTagsChange: (tags: string[]) => void;
  /** 추가 className */
  className?: string;
}

export interface TagInputRef {
  focus: () => void;
}

/**
 * TagInput 컴포넌트 (태그 입력용)
 *
 * @example
 * <TagInput
 *   label="태그"
 *   placeholder="입력 후 Enter"
 *   tags={tags}
 *   onTagsChange={setTags}
 * />
 */
const TagInput = forwardRef<TagInputRef, TagInputProps>(
  ({ label, placeholder, tags, onTagsChange, className }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (!tags.includes(newTag)) {
          onTagsChange([...tags, newTag]);
        }
        setInputValue('');
      }
    };

    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {tags.length > 0 && (
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';

export default TagInput;
