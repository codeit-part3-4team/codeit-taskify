import CreateCard from '@/components/Modals/domains/Card/CreateCard';
import Modal from '@/components/Modals/Modal';

// 대시보드상세페이지에서 coumnId, dashboardId를 props로 받아와야 함.
export default async function CreateCardModal() {
  return (
    <>
      <Modal size="large">
        <CreateCard />
      </Modal>
    </>
  );
}

// export default async function CreateCardModal() {
//   return <div>위 주석 풀어서 사용</div>;
// }
