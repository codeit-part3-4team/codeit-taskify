"use client";

import TableMembers from "@/components/CardTables/TableMembers/TableMembers";

const members = [
  { id: 1, name: "정만철", initial: "J", avatarColor: "#B9AFA3" },
  { id: 2, name: "김태순", initial: "K", avatarColor: "#A9D8F0" },
  { id: 3, name: "최주협", initial: "C", avatarColor: "#F5D35C" },
  { id: 4, name: "윤지현", initial: "Y", avatarColor: "#F2C35E" },
];

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", padding: 40 }}>
      <div style={{ width: 620 }}>
        <TableMembers
          members={members}
          page={1}
          totalPages={1}
          onPrev={() => console.log("prev")}
          onNext={() => console.log("next")}
          onRemove={(id) => alert(`remove ${id}`)}
        />
      </div>
    </main>
  );
}
