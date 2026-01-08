'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SideMenu from '@/components/SideMenu/SideMenu';
import DashboardDetailGnb from '@/components/Gnb/variants/DashboardDetailGnb/DashboardDetailGnb';
import ProfileSettingCard from '@/components/CardTables/ProfileSettingCard/ProfileSettingCard';
import PasswordChangeCard from '@/components/CardTables/PasswordChangeCard/PasswordChangeCard';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';

import styles from './page.module.css';

export default function DashboardSettingsEditClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  /* ---------------- 사이드 메뉴 ---------------- */
  const [selectedDashboardId, setSelectedDashboardId] = useState(1);

  /* ---------------- 사이드메뉴 페이지네이션 ---------------- */
  const [sidePage, setSidePage] = useState(1);
  const sideTotalPages = 3;
  const sideCanPrev = sidePage > 1;
  const sideCanNext = sidePage < sideTotalPages;

  /* ---------------- GNB ---------------- */
  const membersForGnb = [
    { id: 1, nickname: '홍길동', profileImageUrl: null },
    { id: 2, nickname: '김철수', profileImageUrl: null },
    { id: 3, nickname: '이영희', profileImageUrl: null },
  ];

  const currentUser = {
    nickname: '현재사용자',
    profileImageUrl: null,
  };

  /* ===============================
     계정관리 상태 (핵심)
     =============================== */

  // 🔐 "실제 현재 비밀번호" (서버 대신 임시로 들고 있음)
  const [realPassword, setRealPassword] = useState('1234');

  // 프로필
  const [email] = useState('johndoe@gmail.com'); // 이메일은 수정 불가
  const [nickname, setNickname] = useState('배유철');

  // 비밀번호 변경 input
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  /* ---------------- 이벤트 핸들러 ---------------- */

  const handleBack = () => {
    router.back();
  };

  /** ✅ 프로필 저장 (닉네임 + 이미지) */
  const handleSaveProfile = (payload: { nickname: string; imageFile: File | null }) => {
    setNickname(payload.nickname);

    console.log('프로필 저장됨:', {
      nickname: payload.nickname,
      imageFile: payload.imageFile,
    });

    alert('프로필 정보가 저장되었습니다.');
  };

  const handleChangePassword = () => {
    // 1️⃣ 현재 비밀번호 틀린 경우 → 모달
    if (currentPw !== realPassword) {
      router.push(
        '/account/alim?message=' +
          encodeURIComponent('현재 비밀번호가 틀립니다') +
          '&buttonText=' +
          encodeURIComponent('확인')
      );
      return;
    }

    // 2️⃣ 새 비밀번호 확인 불일치 (안전망)
    if (newPw !== confirmPw) {
      router.push(
        '/account/alim?message=' +
          encodeURIComponent('비밀번호가 일치하지 않습니다') +
          '&buttonText=' +
          encodeURIComponent('확인')
      );
      return;
    }

    // 3️⃣ 맞으면 비밀번호 변경
    setRealPassword(newPw);

    // (선택) 성공 모달
    router.push(
      '/account/alim?message=' +
        encodeURIComponent('비밀번호가 변경되었습니다') +
        '&buttonText=' +
        encodeURIComponent('확인')
    );

    // 4️⃣ input 초기화
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  /* ===============================
     렌더링
     =============================== */

  return (
    <div className={styles.layout}>
      {/* 왼쪽 사이드 메뉴 */}
      <div className={styles.sideArea}>
        <SideMenu
          selectedDashboardId={selectedDashboardId}
          onDashboardClick={(id) => setSelectedDashboardId(id)}
          onAddDashboardClick={() => console.log('대시보드 추가 클릭')}
        />

        <PaginationButton
          size="large"
          prevDisabled={!sideCanPrev}
          nextDisabled={!sideCanNext}
          onPrevClick={() => setSidePage((p) => Math.max(1, p - 1))}
          onNextClick={() => setSidePage((p) => Math.min(sideTotalPages, p + 1))}
          className={styles.sidePagination}
        />
      </div>

      {/* 오른쪽 메인 영역 */}
      <div className={styles.mainArea}>
        <div className={styles.gnbSpacer}>
          <DashboardDetailGnb
            dashboardTitle="계정 관리"
            dashboardColor="#5534DA"
            members={membersForGnb}
            currentUser={currentUser}
            onManageClick={() => console.log('관리 클릭')}
            onInviteClick={() => console.log('초대 클릭')}
          />
        </div>

        <main className={styles.content}>
          {/* 돌아가기 */}
          <button type="button" className={styles.backRow} onClick={handleBack}>
            <span className={styles.backIcon} aria-hidden="true">
              ‹
            </span>
            <span className={styles.backText}>돌아가기</span>
          </button>

          {/* 프로필 카드 */}
          <ProfileSettingCard
            title="프로필"
            emailValue={email}
            nicknameValue={nickname}
            onChangeNickname={setNickname}
            imageFile={imageFile}
            onChangeImageFile={setImageFile}
            onSave={handleSaveProfile}
            saveText="저장"
          />

          {/* 비밀번호 변경 카드 */}
          <section className={styles.card}>
            <PasswordChangeCard
              title="비밀번호 변경"
              currentValue={currentPw}
              newValue={newPw}
              confirmValue={confirmPw}
              onChangeCurrent={setCurrentPw}
              onChangeNew={setNewPw}
              onChangeConfirm={setConfirmPw}
              onSubmit={handleChangePassword}
              buttonText="변경"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
