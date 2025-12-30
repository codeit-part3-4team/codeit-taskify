import DefaultModal from '@/components/Modals/DefualtModal';
import Modal from '@/components/Modals/Modal';

export default function ModalTest() {
  return (
    <>
      <h1>TEST PAGE</h1>
      <Modal size="default" width={500}>
        안녕
        <DefaultModal />
      </Modal>
    </>
  );
}
