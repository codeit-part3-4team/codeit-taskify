import AlimModal from '@/components/Modals/domains/Alim/AlimModal';
import Modal from '@/components/Modals/Modal';

export default function Page({
  searchParams,
}: {
  searchParams: { message?: string; buttonText?: string };
}) {
  return (
    <Modal type="alim">
        <AlimModal message="비밀번호가 일치하지 않습니다." />
    </Modal>
  );
}
