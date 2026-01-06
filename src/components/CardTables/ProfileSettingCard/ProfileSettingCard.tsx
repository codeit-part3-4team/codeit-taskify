'use client';

import { useRef, useMemo, useEffect } from 'react';
import Image from 'next/image';

import styles from './ProfileSettingCard.module.css';
import typo from '@/styles/typography.module.css';

import addIcon from './add.svg';

type Props = {
  className?: string;
  title?: string;

  emailLabel?: string;
  nicknameLabel?: string;

  emailPlaceholder?: string;
  nicknamePlaceholder?: string;

  emailValue?: string;
  nicknameValue?: string;

  onChangeNickname?: (v: string) => void;

  // ✅ 저장 시 최종 데이터 넘겨주기
  imageFile?: File | null;
  onChangeImageFile?: (file: File | null) => void;

  onSave?: (payload: { nickname: string; imageFile: File | null }) => void;

  saveText?: string;
};

export default function ProfileSettingCard({
  className = '',
  title = '프로필',

  emailLabel = '이메일',
  nicknameLabel = '닉네임',

  emailPlaceholder = 'johndoe@gmail.com',
  nicknamePlaceholder = '배유철',

  emailValue = '',
  nicknameValue = '',

  onChangeNickname,

  imageFile = null,
  onChangeImageFile,

  onSave,

  saveText = '저장',
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ imageFile로부터 "파생값"으로 previewUrl 만들기 (state X)
  const previewUrl = useMemo(() => {
    if (!imageFile) return '';
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  // ✅ URL 해제만 effect에서 처리 (setState 없음 → 룰 통과)
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChangeImageFile?.(file);

    // 같은 파일 다시 선택 가능하도록 value 리셋
    e.target.value = '';
  };

  const handleSave = () => {
    onSave?.({ nickname: nicknameValue, imageFile });
  };

  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={`${styles.title} ${typo.base} ${typo.text2xl} ${typo.bold}`}>{title}</h2>

      <div className={styles.body}>
        {/* ✅ 이미지 업로더 */}
        <button
          type="button"
          className={styles.avatarBox}
          onClick={handleClickUpload}
          aria-label="프로필 이미지 업로드"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="업로드한 프로필 이미지 미리보기"
              fill
              className={styles.previewImg}
              sizes="120px"
              priority={false}
            />
          ) : (
            <Image src={addIcon} className={styles.addIconImg} alt="" aria-hidden="true" />
          )}
        </button>

        {/* ✅ 실제 파일 input (숨김) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* ✅ 폼 */}
        <div className={styles.form}>
          <label className={styles.field}>
            <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
              {emailLabel}
            </span>
            <input
              type="email"
              className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
              value={emailValue}
              placeholder={emailPlaceholder}
              readOnly
            />
          </label>

          <label className={styles.field}>
            <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
              {nicknameLabel}
            </span>
            <input
              className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
              value={nicknameValue}
              placeholder={nicknamePlaceholder}
              onChange={(e) => onChangeNickname?.(e.target.value)}
            />
          </label>

          <button
            type="button"
            className={`${styles.saveBtn} ${typo.base} ${typo.textLg} ${typo.medium}`}
            onClick={handleSave}
          >
            {saveText}
          </button>
        </div>
      </div>
    </section>
  );
}
