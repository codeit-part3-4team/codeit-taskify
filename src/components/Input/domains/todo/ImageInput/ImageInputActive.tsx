import Image from 'next/image';

interface ImageInputActiveProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageInputActive({ 
  width = 76, 
  height = 76,
  className 
}: ImageInputActiveProps) {
  return (
    <Image
      src="/images/input/input-image-active.svg"
      alt="이미지 업로드됨"
      width={width}
      height={height}
      className={className}
    />
  );
}

