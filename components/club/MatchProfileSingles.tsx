// import type { components } from "@/schemas/schema";
// import MatchScoreModalSingles from "./MatchScoreModalSingles";

// type MatchResponse = components["schemas"]["MatchResponse"];

// interface MatchProfileSinglesProps {
//   singlesMatch: Exclude<MatchResponse["singles_match"], undefined>;
//   isOpen: boolean;
//   onClose: () => void;
// }

// function MatchProfileSingles({
//   singlesMatch,
//   isOpen,
//   onClose,
// }: MatchProfileSinglesProps) {
//   const {
//     participant1_name,
//     participant1_image,
//     participant2_name,
//     participant2_image,
//     participant1_win_set_count,
//     participant2_win_set_count,
//   } = singlesMatch;

//   return (
//     <div className="flex items-center justify-center">
//       <div className="flex rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 items-center w-80 p-4 justify-between shadow-lg">
//         <div className="flex flex-col items-center gap-2">
//           <img
//             src={participant1_image}
//             alt={participant1_name}
//             className="h-24 w-24 rounded-full object-cover border-4 border-blue-400 shadow-md"
//           />
//           <p className="text-gray-700 font-semibold">{participant1_name}</p>
//         </div>
//         <div className="flex flex-col items-center justify-center">
//           <p className="text-indigo-600 text-2xl font-bold">
//             {participant1_win_set_count} : {participant2_win_set_count}
//           </p>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <img
//             src={participant2_image}
//             alt={participant2_name}
//             className="h-24 w-24 rounded-full object-cover border-4 border-purple-400 shadow-md"
//           />
//           <p className="text-gray-700 font-semibold">{participant2_name}</p>
//         </div>
//       </div>
//       {isOpen && (
//         <MatchScoreModalSingles
//           isOpen={isOpen}
//           singlesMatch={singlesMatch}
//           onClose={onClose}
//         />
//       )}
//     </div>
//   );
// }

// export default MatchProfileSingles;
