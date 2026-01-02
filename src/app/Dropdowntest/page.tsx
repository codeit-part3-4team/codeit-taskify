"use client";

// import DropdownMenu, { DropdownItem } from "@/components/Dropdown/dropdown-menu/dropdownmenu";


// export default function DropdownMenuTest() {
//   const items: DropdownItem[] = [
//     { id: "edit", label: "수정하기" },
//     { id: "delete", label: "삭제하기", variant: "danger" },
//   ];

//   return (
//     <div style={{ padding: 40 }}>
//       <DropdownMenu
//         items={items}
//         highlightedId="edit"
//         triggerLabel="•••"
//         align="left"
//         onSelect={(item) => {
//           console.log("selected:", item);
//           alert(`${item.label} 클릭`);
//         }}
//       />
//     </div>
//   );
// }

// import { useState } from "react";
// import DropdownProgress, { ProgressValue } from "@/components/Dropdown/dropdown-progress/dropdownprogress";

// export default function Page() {
//   const [value, setValue] = useState<ProgressValue>("todo");

//   return (
//     <div style={{ padding: 40 }}>
//       <DropdownProgress value={value} onChange={setValue} />
//     </div>
//   );
// }

import { useState } from "react";
import ManagerSelect, { Manager } from "@/components/Dropdown/dropdown-manager/dropdownmanager";

const DUMMY: Manager[] = [
  { id: "1", name: "배유철" },
  { id: "2", name: "배동석" },
];

export default function Page() {
  const [selected, setSelected] = useState<Manager | null>(DUMMY[0]);

  return (
    <div style={{ padding: 40 }}>
      <ManagerSelect managers={DUMMY} value={selected} onChange={setSelected} />
    </div>
  );
}
