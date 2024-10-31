"use client";

import MatchProfileDoubles from "@/components/club/MatchProfileDoubles";
// import MatchProfileSingles from "@/components/club/MatchProfileSingles";
// import { useGetMatches } from "@/lib/api/hooks/matchHook";
import type { components } from "@/schemas/schema";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

// type MatchResponse = components["schemas"]["MatchResponse"];

// function Match() {
//   const params = useParams();
//   const [matchDialog, setMatchDialog] = useState<number | null>(null);

//   /* TODO: useParams를 이용하여 URL id 가져오기, id 타입 넣어주기 기본은 string*/
//   const { data, isLoading, error } = useGetMatches(
//     Number(params.clubId),
//     Number(params.leagueId),
//   );

//   const [singleGames, doubleGames] = useMemo<
//     [MatchResponse[], MatchResponse[]]
//   >(() => {
//     if (data) {
//       const singleGames: MatchResponse[] = [];
//       const doubleGames: MatchResponse[] = [];

//       for (const match of data) {
//         if (match.match_type === "SINGLES") {
//           singleGames.push(match);
//         } else if (match.match_type === "DOUBLES") {
//           doubleGames.push(match);
//         }
//       }

//       return [singleGames, doubleGames];
//     }

//     return [[], []];
//   }, [data]);

//   const toggleMatchDialog = (index: number) => {
//     setMatchDialog((prevIndex) => (prevIndex === index ? null : index));
//   };

//   if (isLoading) {
//     <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>
//     );
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//         {singleGames.map((match) => {
//           if (!match.singles_match) {
//             return null;
//           }
//           return (
//             <button
//               type="button"
//               key={match.match_id}
//               onClick={() => toggleMatchDialog(match.match_id as number)}
//             >
//               <MatchProfileSingles
//                 singlesMatch={match.singles_match}
//                 isOpen={matchDialog === match.match_id}
//                 onClose={() => toggleMatchDialog(match.match_id as number)}
//               />
//             </button>
//           );
//         })}
//       </div>

//       <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10 w-full flex-wrap mt-5">
//         {doubleGames.map((match) => {
//           if (!match.doubles_match) {
//             return null;
//           }
//           return (
//             <button
//               type="button"
//               key={match.match_id}
//               onClick={() => toggleMatchDialog(match.match_id as number)}
//             >
//               <MatchProfileDoubles
//                 doublesMatch={match.doubles_match}
//                 isOpen={matchDialog === match.match_id}
//                 onClose={() => toggleMatchDialog(match.match_id as number)}
//               />
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Match;
