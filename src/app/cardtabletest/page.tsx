"use client";

// import TableMembers from "@/components/CardTables/TableMembers/TableMembers";

// const members = [
//   { id: 1, name: "정만철", initial: "J", avatarColor: "#B9AFA3" },
//   { id: 2, name: "김태순", initial: "K", avatarColor: "#A9D8F0" },
//   { id: 3, name: "최주협", initial: "C", avatarColor: "#F5D35C" },
//   { id: 4, name: "윤지현", initial: "Y", avatarColor: "#F2C35E" },
// ];

// export default function Page() {
//   return (
//     <main style={{ minHeight: "100vh", padding: 40 }}>
//       <div style={{ width: 620 }}>
//         <TableMembers
//           members={members}
//           page={1}
//           totalPages={1}
//           onPrev={() => console.log("prev")}
//           onNext={() => console.log("next")}
//           onRemove={(id) => alert(`remove ${id}`)}
//         />
//       </div>
//     </main>
//   );
// }

// import TableInvitations from "@/components/CardTables/TableInvitations/TableInvitations";

// const invitations = [
//   { id: 1, email: "codeitA@codeit.com" },
//   { id: 2, email: "codeitB@codeit.com" },
//   { id: 3, email: "codeitC@codeit.com" },
//   { id: 4, email: "codeitD@codeit.com" },
//   { id: 5, email: "codeitE@codeit.com" },
// ];

// export default function InvitationsTestPage() {
//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 40,
//       }}
//     >
//       <TableInvitations
//         invitations={invitations}
//         page={1}
//         totalPages={1}
//         onPrev={() => console.log("prev")}
//         onNext={() => console.log("next")}
//         onInvite={() => alert("초대하기 클릭")}
//         onCancel={(id) => alert(`취소 클릭: ${id}`)}
//       />
//     </main>
//   );
// }

// import InvitedDashboardEmptyCard from "@/components/CardTables/InvitedDashboardEmptyCard/InvitedDashboardEmptyCard";

// export default function Page() {
//   return (
//     <div
//       style={{
//         padding: "40px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <InvitedDashboardEmptyCard />
//     </div>
//   );
// }

import TableInvitedDashboards from "@/components/CardTables/TableInvitedDashboards/TableInvitedDashboards";

export default function Page() {
  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <TableInvitedDashboards
        items={[
          { id: 1, name: "프로덕트 디자인", inviter: "손동희" },
          { id: 2, name: "새로운 기획 문서", inviter: "안귀영" },
          { id: 3, name: "유닛 A", inviter: "장혁" },
          { id: 4, name: "유닛 B", inviter: "강나무" },
          { id: 5, name: "유닛 C", inviter: "김태현" },
          { id: 6, name: "유닛 D", inviter: "김태현" },
        ]}
      />
    </div>
  );
}


// import { useState } from "react";
// import ProfileSettingCard from "@/components/CardTables/ProfileSettingCard/ProfileSettingCard";

// export default function Page() {
//   const [email, setEmail] = useState("");
//   const [nickname, setNickname] = useState("");

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         padding: 40,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//       }}
//     >
//       <ProfileSettingCard
//         title="프로필"
//         emailValue={email}
//         nicknameValue={nickname}
//         onChangeEmail={setEmail}
//         onChangeNickname={setNickname}
//         onUpload={() => alert("업로드 클릭")}
//         onSave={() => alert(`저장\nemail: ${email}\nnickname: ${nickname}`)}
//       />
//     </main>
//   );
// }

// import { useState } from "react";
// import PasswordChangeCard from "@/components/CardTables/PasswordChangeCard/PasswordChangeCard";

// export default function Page() {
//   const [currentPw, setCurrentPw] = useState("");
//   const [newPw, setNewPw] = useState("");
//   const [confirmPw, setConfirmPw] = useState("");

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         padding: 40,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//       }}
//     >
//       <PasswordChangeCard
//         currentValue={currentPw}
//         newValue={newPw}
//         confirmValue={confirmPw}
//         onChangeCurrent={setCurrentPw}
//         onChangeNew={setNewPw}
//         onChangeConfirm={setConfirmPw}
//         onSubmit={() => {
//           alert(
//             `변경 클릭\n현재: ${currentPw}\n새 비번: ${newPw}\n새 비번 확인: ${confirmPw}`
//           );
//         }}
//       />
//     </main>
//   );
// }

