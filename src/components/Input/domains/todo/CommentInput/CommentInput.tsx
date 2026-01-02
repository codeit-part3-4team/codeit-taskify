'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './CommentInput.module.css';

interface CommentInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** 입력창 크기 */
  size: 'large' | 'small';
  /** 입력 버튼 클릭 핸들러 */
  onSubmit?: () => void;
}

/**
 * CommentInput 컴포넌트 (댓글 입력용)
 *
 * @example
 * // Large 사이즈
 * <CommentInput
 *   size="large"
 *   value={comment}
 *   onChange={(e) => setComment(e.target.value)}
 *   onSubmit={() => handleSubmit()}
 * />
 *
 * @example
 * // Small 사이즈
 * <CommentInput
 *   size="small"
 *   value={comment}
 *   onChange={(e) => setComment(e.target.value)}
 *   onSubmit={() => handleSubmit()}
 * />
 */
const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ size, onSubmit, className, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <label className={`${styles.label} ${styles[size]}`}>댓글</label>
        <div className={styles.inputWrapper}>
          <textarea
            ref={ref}
            className={`${styles.textarea} ${styles[size]}`}
            placeholder="댓글 작성하기"
            {...props}
          />
          <button
            type="button"
            className={`${styles.submitButton} ${styles[size]}`}
            onClick={onSubmit}
          >
            입력
          </button>
        </div>
      </div>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
