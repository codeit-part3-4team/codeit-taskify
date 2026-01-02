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

import { useState } from "react";
import DropdownProgress, { ProgressValue } from "@/components/Dropdown/dropdown-progress/dropdownprogress";

export default function Page() {
  const [value, setValue] = useState<ProgressValue>("todo");

  return (
    <div style={{ padding: 40 }}>
      <DropdownProgress value={value} onChange={setValue} />
    </div>
  );
}
