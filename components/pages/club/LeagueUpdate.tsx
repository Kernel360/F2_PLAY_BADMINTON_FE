"use client";

import LeagueForm from "@/components/club/LeagueForm";
import { useGetLeagueDetail } from "@/lib/api/hooks/leagueHook";
import { useParams } from "next/navigation";

function LeagueUpdate() {
  const { clubId, leagueId } = useParams();
  const { data: league } = useGetLeagueDetail(
    clubId as string,
    leagueId as string,
  );

  return (
    <div className="container mx-auto rounded-lg space-y-6 ">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">경기 수정</h2>
      </div>
      {league && (
        <LeagueForm
          clubId={clubId as string}
          leagueId={leagueId as string}
          initialData={league}
        />
      )}
    </div>
  );
}

export default LeagueUpdate;
