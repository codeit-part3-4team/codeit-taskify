'use client';

import { useRouter } from 'next/navigation';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import DefaultModal from '@/components/Modals/DefualtModal';

type AlimModalProps = {
  message: string;
  buttonText?: string;
};

/**
 * Renders modal content that displays a message and a single confirmation button.
 *
 * @param message - The message to display inside the modal.
 * @param buttonText - Text for the confirmation button; defaults to '확인'.
 * @returns An element showing the message and a confirmation button that calls `router.back()` when clicked.
 */

export default function AlimModal({ message, buttonText = '확인' }: AlimModalProps) {
  const router = useRouter();

  return (
    <DefaultModal
      message={message}
      actionsButton={
        <ModalButton type="button" onClick={() => router.back()}>
          {buttonText}
        </ModalButton>
      }
    />
  );
}