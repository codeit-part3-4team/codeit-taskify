'use client';
import '@/styles/reset.css';
import Modal from '@/components/Modals/Modal';
import { useState } from 'react';

export default function ModalTest() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setModalIsOpen((prev) => !prev)}>모달 버튼</button>
      <Modal modalIsOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  );
}
