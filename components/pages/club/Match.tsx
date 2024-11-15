"use client";

import MatchProfileDoubles from "@/components/club/MatchProfileDoubles";
import TournamentBracket from "@/components/club/TournamentBracket";
// import MatchProfileSingles from "@/components/club/MatchProfileSingles";
// import { useGetMatches } from "@/lib/api/hooks/matchHook";
import type { components } from "@/schemas/schema";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

// type MatchResponse = components["schemas"]["MatchResponse"];

function Match() {
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

  return <TournamentBracket />;
}

export default Match;
