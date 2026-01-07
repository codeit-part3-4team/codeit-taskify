'use client';

import { useState, ChangeEvent, useId } from 'react';
import Image from 'next/image';
import styles from './ImageInput.module.css';

interface ImageInputProps {
  /** 라벨 텍스트 */
  label?: string;
  /** 이미지 변경 시 호출되는 콜백 (File 객체 전달) */
  onChange?: (file: File | null) => void;
  /** 초기 이미지 URL (수정 모드에서 사용) */
  defaultImageUrl?: string;
  /** 컴포넌트 너비 */
  width?: number;
  /** 컴포넌트 높이 */
  height?: number;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 이미지 업로드 Input 컴포넌트
 *
 * @description input type="file"을 커스텀하여 이미지를 업로드하고 미리보기를 제공하는 컴포넌트입니다.
 * FileReader를 사용해 선택한 이미지의 미리보기를 표시합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <ImageInput onChange={(file) => console.log(file)} />
 *
 * // 라벨과 함께 사용
 * <ImageInput label="이미지" onChange={handleImageChange} />
 *
 * // 수정 모드 (기존 이미지가 있는 경우)
 * <ImageInput defaultImageUrl="/existing-image.jpg" onChange={handleImageChange} />
 *
 * // 크기 커스텀
 * <ImageInput width={100} height={100} onChange={handleImageChange} />
 * ```
 */
export default function ImageInput({
  label,
  onChange,
  defaultImageUrl,
  width = 76,
  height = 76,
  className,
}: ImageInputProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl || '');
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // FileReader를 사용해 이미지 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 부모 컴포넌트에 파일 전달
      onChange?.(file);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {label && <span className={styles.label}>{label}</span>}

      <label
        htmlFor={inputId}
        className={styles.imageLabel}
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!previewUrl ? (
          // 기본 상태: + 버튼
          <div className={styles.defaultState}>
            <Image
              src="/images/input/input-image-default.svg"
              alt="이미지 추가"
              width={width}
              height={height}
              className={styles.defaultImage}
            />
          </div>
        ) : (
          // 이미지가 선택된 상태
          <div className={styles.previewContainer}>
            <Image src={previewUrl} alt="업로드된 이미지" fill className={styles.previewImage} />
            {/* 호버 시 편집 오버레이 */}
            {isHovered && (
              <div className={styles.hoverOverlay}>
                <Image
                  src="/images/input/input-image-hover.svg"
                  alt="이미지 수정"
                  width={width}
                  height={height}
                  className={styles.hoverImage}
                />
              </div>
            )}
          </div>
        )}
      </label>

      {/* 실제 input은 숨김 처리 */}
      <input
        type="file"
        id={inputId}
        accept="image/*"
        onChange={handleImageChange}
        className={styles.hiddenInput}
      />
    </div>
  );
}
