import Image from 'next/image';

interface ImageInputHoverProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageInputHover({ 
  width = 76, 
  height = 76,
  className 
}: ImageInputHoverProps) {
  return (
    <Image
      src="/images/input/input-image-hover.svg"
      alt="이미지 수정"
      width={width}
      height={height}
      className={className}
    />
  );
}

