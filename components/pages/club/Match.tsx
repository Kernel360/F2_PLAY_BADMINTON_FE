"use client";

import MatchProfileDoubles from "@/components/club/MatchProfileDoubles";
import TournamentBracket from "@/components/club/TournamentBracket";
// import MatchProfileSingles from "@/components/club/MatchProfileSingles";
import { useGetMatches } from "@/lib/api/hooks/matchHook";
import type { components } from "@/schemas/schema";
import type { GetMatchesData } from "@/types/matchTypes";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

// type MatchResponse = components["schemas"]["MatchResponse"];

function Match() {
  const { clubId, leagueId } = useParams();

  // data의 match_generation_type에 따라 다른 컴포넌트 렌더링해줘야 함
  const { data } = useGetMatches(clubId as string, Number(leagueId));

  return <TournamentBracket nodeData={data as GetMatchesData} />;
}

export default Match;
