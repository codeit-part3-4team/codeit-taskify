import Image from 'next/image';

interface ImageInputDefaultProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageInputDefault({ 
  width = 76, 
  height = 76,
  className 
}: ImageInputDefaultProps) {
  return (
    <Image
      src="/images/input/input-image-default.svg"
      alt="이미지 추가"
      width={width}
      height={height}
      className={className}
    />
  );
}
