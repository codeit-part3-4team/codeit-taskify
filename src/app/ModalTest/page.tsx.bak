'use client';
import '@/styles/reset.css';
import { useEffect, useRef, useState } from 'react';
import CardModalContent from '@/components/Modals/CardModal/CardModalContent';
import { getCardsByColumn } from './api';
import { CardModalUI, mapCardToModalUI } from '@/components/Modals/CardModal/CardModal.types';
import Modal from '@/components/Modals/Modal';

export default function ModalTest() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CardModalUI | null>(null);

  const modalBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCards() {
      const data = await getCardsByColumn(
        58140,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4NywidGVhbUlkIjoiMjAtNCIsImlhdCI6MTc2Njc0NDY0NSwiaXNzIjoic3AtdGFza2lmeSJ9.HOjAslVpV5SaFhwCb1ankip7UyjIQ3hEDPgQHrKCnFg',
      );
      const card = data.cards[0];
      const modalUIData = mapCardToModalUI(card);
      setCardData(modalUIData);
    }

    fetchCards();
  }, []);

  // 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalBoxRef.current && !modalBoxRef.current.contains(e.target as Node)) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={() => setModalIsOpen((prev) => !prev)}>모달 버튼</button>
      <Modal modalIsOpen={modalIsOpen} modalRef={modalBoxRef}>
        <CardModalContent
          cardData={cardData}
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      </Modal>
    </>
  );
}
