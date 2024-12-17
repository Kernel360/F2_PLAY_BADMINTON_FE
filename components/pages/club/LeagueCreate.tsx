"use client";

import LeagueForm from "@/components/club/LeagueForm";
import { useParams } from "next/navigation";

function LeagueCreate() {
  const { clubId, leagueId } = useParams();
  return (
    <div className="container mx-auto rounded-lg space-y-6 p-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">경기 생성</h2>
      </div>

      <LeagueForm clubId={clubId as string} leagueId={leagueId as string} />
    </div>
  );
}

export default LeagueCreate;
