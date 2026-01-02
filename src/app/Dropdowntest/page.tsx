"use client";

import DropdownMenu, { DropdownItem } from "../../components/Dropdown/dropdown";

export default function DropdownMenuTest() {
  const items: DropdownItem[] = [
    { id: "edit", label: "수정하기" },
    { id: "delete", label: "삭제하기", variant: "danger" },
  ];

  return (
    <div style={{ padding: 40 }}>
      <DropdownMenu
        items={items}
        highlightedId="edit"
        triggerLabel="dropdown"
        align="left"
        onSelect={(item) => {
          console.log("selected:", item);
          alert(`${item.label} 클릭`);
        }}
      />
    </div>
  );
}
