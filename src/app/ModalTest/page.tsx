'use client';

import ModalButton from '@/components/Buttons/ModalButton/ModalButton';
import CreateCard from '@/components/Modals/Card/CreateCard';
import DeleteCard from '@/components/Modals/Card/DeleteCard';
import EditCard from '@/components/Modals/Card/EditCard';
import EditColumn from '@/components/Modals/column/EditColumn';
import DefaultModal from '@/components/Modals/DefualtModal';
import Modal from '@/components/Modals/Modal';
import AlimModal from '@/components/Modals/AlimModal';
import { useState } from 'react';

export default function ModalTest() {
  const [title, setTitle] = useState('');

  return (
    <>
      <h1>TEST PAGE</h1>
      <Modal type="alim">
        <AlimModal message="안녕하세요" />
      </Modal>
    </>
  );
}
