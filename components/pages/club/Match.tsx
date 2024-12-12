"use client";

import Spinner from "@/components/Spinner";
import FreeBracket from "@/components/club/FreeBracket";
import TournamentBracket from "@/components/club/TournamentBracket";
import { useGetMatches } from "@/lib/api/hooks/matchHook";
import type { GetMatchesData } from "@/types/matchTypes";
import { useParams } from "next/navigation";

function Match() {
  const { clubId, leagueId } = useParams();

  // data의 match_generation_type에 따라 다른 컴포넌트 렌더링해줘야 함
  const { data, isLoading } = useGetMatches(clubId as string, Number(leagueId));

  if (isLoading) {
    return (
      <div className="container mx-auto  min-h-[530px] flex items-center justify-center bg-white rounded-lg space-y-6">
        <Spinner />
      </div>
    );
  }

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
