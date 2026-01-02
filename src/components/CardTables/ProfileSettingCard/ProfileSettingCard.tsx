"use client";

import styles from "./ProfileSettingCard.module.css";
import typo from "@/styles/typography.module.css";


import addIcon from "./add.svg";
import Image from "next/image";


type Props = {
  className?: string;
  title?: string;

  emailLabel?: string;
  nicknameLabel?: string;

  emailPlaceholder?: string;
  nicknamePlaceholder?: string;

  emailValue?: string;
  nicknameValue?: string;

  onChangeEmail?: (v: string) => void;
  onChangeNickname?: (v: string) => void;

  onUpload?: () => void;
  onSave?: () => void;

  saveText?: string;
};

export default function ProfileSettingCard({
  className = "",
  title = "프로필",

  emailLabel = "이메일",
  nicknameLabel = "닉네임",

  emailPlaceholder = "johndoe@gmail.com",
  nicknamePlaceholder = "배유철",

  emailValue = "",
  nicknameValue = "",

  onChangeEmail,
  onChangeNickname,

  onUpload,
  onSave,

  saveText = "저장",
}: Props) {
  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={`${styles.title} ${typo.base} ${typo.text2xl} ${typo.bold}`}>{title}</h2>

      <div className={styles.body}>
        {/* Left (PC) / Top (Mobile): image uploader */}
        <button
            type="button"
            className={styles.avatarBox}
            onClick={onUpload}
            aria-label="프로필 이미지 추가"
            >
            <Image src={addIcon} className={styles.addIconImg} alt="" aria-hidden="true" />
        </button>

        {/* Right (PC) / Bottom (Mobile): form */}
        <div className={styles.form}>
          <label className={styles.field}>
            <span className={`${styles.label} ${typo.base} ${typo.textLg} ${typo.regular}`}>
              {emailLabel}
            </span>
            <input
              className={`${styles.input} ${typo.base} ${typo.textLg} ${typo.regular}`}
              value={emailValue}
              placeholder={emailPlaceholder}
              onChange={(e) => onChangeEmail?.(e.target.value)}
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
            onClick={onSave}
          >
            {saveText}
          </button>
        </div>
      </div>
    </section>
  );
}
