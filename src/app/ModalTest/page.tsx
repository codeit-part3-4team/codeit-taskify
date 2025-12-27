'use client';
import '@/styles/reset.css';
import { useEffect, useState } from 'react';
import CardModalContent from '@/components/Modals/CardModal/CardModalContent';
import { getCardsByColumn } from './api';
import { CardModalUI, mapCardToModalUI } from '@/components/Modals/CardModal/CardModal.types';
import Modal from '@/components/Modals/Modal';

export default function ModalTest() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CardModalUI | null>(null);

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

  return (
    <>
      <button onClick={() => setModalIsOpen((prev) => !prev)}>모달 버튼</button>
      <Modal modalIsOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <CardModalContent
          cardData={cardData}
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      </Modal>
    </>
  );
}
