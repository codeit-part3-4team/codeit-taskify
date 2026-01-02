import DefaultModal from '@/components/Modals/DefaultModal';
import Modal from '@/components/Modals/Modal';

// 이 공간에서 CARD get요청을 다시 함.
// 그리고 parmas로 cardId를 받아서 받아온 데이터 cards[]중 현재 parmas로 받은 id의 데이터를 가져와서 뿌려줌.
// ui 그려야 함.
export default async function DetailCardModal() {
  return (
    <div>
      <Modal>
        <DefaultModal title="카드 상세 모달 입니다." />
      </Modal>
    </div>
  );
}
