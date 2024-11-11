"use client";

import LeagueForm from "@/components/club/LeagueForm";
import { useParams } from "next/navigation";

function LeagueCreatePage() {
  const { clubId } = useParams();

  return (
    <div className="container mx-auto rounded-lg space-y-6 ">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">경기 생성</h2>
      </div>
      <LeagueForm clubId={clubId as string} />
    </div>
  );
}

export default LeagueCreatePage;
