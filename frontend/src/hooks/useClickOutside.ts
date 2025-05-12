// import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

// export const useClickOutside = (ref: RefObject, setState: Dispatch<SetStateAction<boolean>>,) => {
//     useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         const { current } = modalRef;
//         const { target } = event;
  
//         if (current && !current.contains(target as Node)) {
//           setOpenProfileModal(false);
//         }
//       };
  
//       document.addEventListener("mousedown", handleClickOutside);
  
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     });
// }