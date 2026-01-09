'use client';

import CreateDashBoard from '@/components/Modals/domains/DashBoard/CreateDashBoard';
import Modal from '@/components/Modals/Modal';

/**
 * @route /root/mydashboard/create
 * @description
 * mydashboard 페이지 위에 렌더링되는
 * "대시보드 생성 모달" 전용 인터셉트 라우트
 */
export default function CreateDashBoardModal() {
  return (
    <div>
      <Modal>
        <CreateDashBoard />
      </Modal>
    </div>
  );
}
