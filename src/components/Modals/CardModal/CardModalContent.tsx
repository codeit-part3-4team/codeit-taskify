'use client';

import { CardModalUI } from './CardModal.types';

interface CardModalProps {
  cardData?: CardModalUI | null;
}

export default function CardModalContent({ cardData }: CardModalProps) {
  console.log(cardData);
  return (
    <>
      안녕하세요
      <div>{cardData?.title}</div>
      <div>{cardData?.description}</div>
    </>
  );
}
