// "use client";

// import { type SheetMusic } from "@prisma/client";
// import Image from "next/image";
// import { FaRegEdit } from "react-icons/fa";
// import { FaTrash } from "react-icons/fa6";
// import KeyDecor from "resources/music-key.svg";

// import { IconButton } from "common/UI";

// type SheetCardProps = {
//   data: SheetMusic;
//   deleteSheet: (id: string) => void;
//   editSheet: () => void;
// };

// export function SheetCard({ data, deleteSheet, editSheet }: SheetCardProps) {
//   const { id, title } = data;
//   return (
//     <div
//       className={
//         "relative flex aspect-square flex-col items-center justify-center rounded-xl border border-ok_main-700 bg-ok_main-200 p-2"
//       }
//     >
//       <h5 className={"text-center text-sm font-medium"}>{title}</h5>
//       <IconButton
//         onClick={editSheet}
//         startIcon={
//           <FaRegEdit
//             className={
//               "size-4 text-lime-800 transition-all group-hover:scale-105 group-hover:text-lime-600"
//             }
//           />
//         }
//         className={{ button: "absolute left-1 top-1 z-10" }}
//       />
//       <form action={() => deleteSheet(id)}>
//         <IconButton
//           type={"submit"}
//           startIcon={
//             <FaTrash
//               className={
//                 "size-4 text-red-500 transition-all group-hover:scale-105 group-hover:text-red-400"
//               }
//             />
//           }
//           className={{ button: "absolute right-1 top-1 z-10" }}
//         />
//       </form>
//       <Image
//         src={KeyDecor}
//         alt={"Keys"}
//         aria-hidden
//         fill
//         className={"z-0 select-none object-contain py-8 opacity-5"}
//       />
//     </div>
//   );
// }
