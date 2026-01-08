'use client';

import SideMenu from '@/components/SideMenu/SideMenu';
import styles from './page.module.css';

export default function SideMenuTestPage() {
  // Mock 데이터
  const mockDashboards = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `대시보드 ${i + 1}`,
    color: ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'][i % 5],
    createdByMe: i % 3 === 0,
  }));

  const handleDashboardClick = (id: number) => {
    console.log(`대시보드 ${id} 클릭!`);
  };

  const handleAddDashboard = () => {
    console.log('대시보드 추가 모달 열기');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SideMenu 테스트</h1>
        <p className={styles.description}>
          페이지네이션 경계값 테스트 (15개 vs 16개)
        </p>
      </div>

      {/* 케이스 1: 15개 이하 (페이지네이션 없음) */}
      <div className={styles.caseBox}>
        <h2 className={styles.caseTitle}>
          케이스 1: 대시보드 15개 (페이지네이션 없음 ❌)
        </h2>
        <div className={styles.caseContent}>
          <SideMenu
            selectedDashboardId={1}
            onDashboardClick={handleDashboardClick}
            onAddDashboardClick={handleAddDashboard}
          />

          <div className={styles.info}>
            <h3>📊 테스트 정보</h3>
            <ul>
              <li>✅ 총 대시보드: 15개</li>
              <li>✅ 페이지: 1/1</li>
              <li>✅ 페이지네이션 버튼: <strong>없음</strong></li>
              <li>✅ 모든 항목이 한 화면에 표시됨</li>
            </ul>
            <div className={styles.expected}>
              <h4>✅ 예상 결과:</h4>
              <p>• 하단에 페이지네이션 버튼이 <strong>보이지 않음</strong></p>
              <p>• 15개 항목이 모두 표시됨</p>
            </div>
          </div>
        </div>
      </div>

      {/* 케이스 2: 16개 이상 (페이지네이션 있음) */}
      <div className={styles.caseBox}>
        <h2 className={styles.caseTitle}>
          케이스 2: 대시보드 50개 (페이지네이션 있음 ✅)
        </h2>
        <div className={styles.caseContent}>
          <SideMenu
            selectedDashboardId={1}
            onDashboardClick={handleDashboardClick}
            onAddDashboardClick={handleAddDashboard}
          />

          <div className={styles.info}>
            <h3>📊 테스트 정보</h3>
            <ul>
              <li>✅ 총 대시보드: 50개</li>
              <li>✅ 총 페이지: 4개 (50 ÷ 15 = 3.33 → 4페이지)</li>
              <li>✅ 페이지네이션 버튼: <strong>있음</strong></li>
              <li>✅ 현재 페이지: 1페이지 (15개 표시)</li>
            </ul>
            <div className={styles.expected}>
              <h4>✅ 예상 결과:</h4>
              <p>• 하단에 <strong>{'<'} {'>'} 버튼이 보임</strong></p>
              <p>• 첫 페이지: 대시보드 1~15 표시</p>
              <p>• {'<'} 버튼: disabled (첫 페이지)</p>
              <p>• {'>'} 버튼: active (다음 페이지 있음)</p>
            </div>
            <div className={styles.action}>
              <h4>🔽 테스트 방법:</h4>
              <p>1. {'>'} 버튼 클릭 → 2페이지 (대시보드 16~30)</p>
              <p>2. {'>'} 버튼 클릭 → 3페이지 (대시보드 31~45)</p>
              <p>3. {'>'} 버튼 클릭 → 4페이지 (대시보드 46~50, 5개만)</p>
              <p>4. {'<'} 버튼으로 이전 페이지 이동</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}