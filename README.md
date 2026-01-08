# TASKIFY — 커뮤니티 기반 일정·할 일 협업 관리 서비스

## 프로젝트에 대한 소개
<img width="1900" height="863" alt="image" src="https://github.com/user-attachments/assets/c2391709-9641-4e8c-b19f-82799d9d17df" />

일정과 할 일은 여러 사람이 함께 관리할수록 쉽게 흩어지고 누락된다.
TASKIFY는 이 문제를 커뮤니티 단위로 일정과 할 일을 한 공간에서 관리하는 방식으로 해결한다.
사용자는 커뮤니티를 만들고 멤버를 초대해 카드 형태로 일정을 공유한다.
모든 변경 사항은 즉시 반영되어 협업 과정에서의 혼선을 줄인다.

<BR><BR>

## 우리는 어떤 문제를 해결하려 했는가
- 여러 사람이 함께 쓰는 일정과 할 일이 메신저·메모 등으로 흩어져 관리되는 문제
- 일정 변경 사항이 즉시 공유되지 않아 생기는 협업 혼선
- 개인 중심 일정 관리 도구가 팀 단위 협업에 적합하지 않은 문제


<BR><BR>


## 어떻게 풀어가려고 했는가
- 개인이 아닌 커뮤니티 단위로 일정과 할 일을 관리하도록 구조를 설계
- 일정과 할 일을 카드 형태로 시각화해 공유와 변경을 단순화
- 상태가 아닌 라우팅 흐름 중심으로 화면을 구성해 사용 맥락을 유지


<BR><BR>


## 배포주소
- [codeit-taskify.vercel.app](https://codeit-taskify.vercel.app/)

<BR><BR>

## 팀 프로젝트 구성원 및 R&R
### (팀장)이륭
- 프론트엔드 리드
- GitHub 저장소 및 협업 환경 초기 세팅
- Issues, Wiki, Milestones 등 협업 관리 체계 구축
- Vercel 자동 배포 파이프라인 구성 (머지 시 자동 배포)
- CodeRabbit 도입으로 PR 코드 리뷰 자동화 환경 구축
- **컴포넌트: side menu, gnb, chip**
- **페이지: 랜딩페이지, 다의 내시보드 페이지**

### 최가을
- **컴포넌트: card-table, design system(font/color), dropdown**
- **페이지: 대시보드 수정 페이지, 계정 관리 페이지**

### 김다연
- **컴포넌트: input, button, icon**
- **페이지: 인증페이지(로그인, 회원가입)**

### 홍요한
- **컴포넌트: modal, card**
- **페이지: 대시보드 상세페이지**

<BR><BR>

## 서비스 핵심 기능 소개
### 커뮤니티 기반 일정·할 일 관리
<img width="1920" height="1080" alt="my dashboard" src="https://github.com/user-attachments/assets/97a11dc5-add7-462f-844c-dd7c22f9a9e1" />

- 개인 단위가 아닌 커뮤니티 단위로 일정과 할 일을 관리한다. 이를 통해 "누가 무엇을 언제까지 해야 하는지"가 명확해진다.

<BR>

### 카드 중심의 일정 공유 구조
<img width="7680" height="4320" alt="dashboardid" src="https://github.com/user-attachments/assets/da66a96d-6103-4038-b5dc-e36f6259f178" />

- 일정과 할 일을 카드 형태로 표현해 정보를 빠르게 파악하고, 수정·이동·삭제 흐름을 단순화했다.

<BR>

### 멤버 초대 및 협업 기능
- <img width="1920" height="1453" alt="board edit" src="https://github.com/user-attachments/assets/9883af9b-524e-46fb-b9d7-5bf6b04c709f" />

- 커뮤니티에 멤버를 초대해 일정 공유, 댓글 소통을 통해 협업 맥락을 유지한다.
 

<BR><BR>


## 서비스 플로우
<img width="831" height="338" alt="image" src="https://github.com/user-attachments/assets/0d438e58-a118-45af-812a-4adcee0390c7" />


<br><br>

## 기술스택
- **Framework / Language:** Next.js(App Router), TypeScript
- **Styling:** CSS Module
- **Routing & Rendering:** App Router 기반 라우팅, Server Component 중심 설계
- **State & Data Handling:** 서버 데이터 패칭 구조, 클라이언트 최소화 전략
- **Collaboration / Tooling:** GitHub Issues·Wiki·Milestones, CodeRabbit 코드 리뷰, Vercel 자동 배포

## 사용한 외부 라이브러리
- **framer-motion:** React 환경에서 자연스럽고 선언적인 애니메이션을 구현하기 위한 라이브러리
- **dnd-kit:** 접근성과 성능을 고려한 모던 Drag & Drop 인터랙션 구현 라이브러리

<BR><BR>

## 의사결정 로그 (Decision Log)

- 각 회의는 하나의 문제를 중심으로 기록
- "무엇을 만들까"가 아니라 **“어떤 문제가 있었는가”**로 시작
- 논의된 선택지와 채택하지 않은 이유를 함께 남김
- 최종 결정과 그 결정의 근거를 명확히 정리
- 회의 날짜·참여자·결론만 간결하게 기록
