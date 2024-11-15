"use client";

import FreeBracket from "@/components/club/FreeBracket";
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

  /* TODO: useParams를 이용하여 URL id 가져오기, id 타입 넣어주기 기본은 string*/
  const { data, isLoading } = useGetMatches(clubId as string, Number(leagueId));

  return (
    <>
      {data?.match_generation_type === "FREE" ? (
        <FreeBracket nodeData={data as GetMatchesData} />
      ) : (
        <TournamentBracket nodeData={data as GetMatchesData} />
      )}
    </>
  );
}

export default Match;
