"use client";

import Spinner from "@/components/Spinner";
import MatchDetail from "@/components/club/MatchDetail";
import MatchParticipant from "@/components/club/MatchDetail/MatchParticipant";
import Scoreboard from "@/components/club/ScoreBoard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSetsDetail } from "@/lib/api/hooks/matchHook";
import type { MatchParticipantType, MatchStatusType } from "@/types/matchTypes";
import { RadioTower, Trophy } from "lucide-react";
import { useParams } from "next/navigation";

export default function MatchDetailPage() {
  const { clubId, leagueId, matchId } = useParams();
  const { data: setDetail, isLoading } = useGetSetsDetail(
    clubId as string,
    leagueId as string,
    matchId as string,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!setDetail) {
    return (
      <div className="text-center text-red-500">
        데이터를 불러오지 못했습니다. 다시 시도해주세요.
      </div>
    );
  }

  const isDoublesMatch = Boolean(setDetail?.doubles_match);
  const matchStatus = isDoublesMatch
    ? setDetail?.doubles_match?.match_status
    : setDetail?.singles_match?.match_status;

  const participants1 = isDoublesMatch
    ? [
        setDetail.doubles_match?.team1.participant1,
        setDetail.doubles_match?.team1.participant2,
      ]
    : [setDetail.singles_match?.participant1];

  const validParticipants1 = participants1?.filter(
    (participant): participant is MatchParticipantType =>
      participant !== undefined,
  );

  const participants2 = isDoublesMatch
    ? [
        setDetail.doubles_match?.team2.participant1,
        setDetail.doubles_match?.team2.participant2,
      ]
    : [setDetail.singles_match?.participant2];

  const validParticipants2 = participants2?.filter(
    (participant): participant is MatchParticipantType =>
      participant !== undefined,
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header Section */}
      <div className="bg-primary text-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Trophy className="text-3xl" />
          <h1 className="text-xl font-bold">
            {setDetail?.league_title || "리그 정보"}
          </h1>
        </div>
      </div>

      {/* Match Result Section */}
      <MatchDetail detail={setDetail} />

      {/* Scoreboard Section */}
      {matchStatus !== "FINISHED" && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <RadioTower className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg font-bold">실시간 점수</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Scoreboard
              clubId={clubId as string}
              leagueId={leagueId as string}
              matchId={matchId as string}
              currentSetNumber={setDetail?.set_number_in_progress}
              matchStatus={matchStatus as MatchStatusType}
              player1={participants1[0]?.name || "Player 1"}
              player2={participants2[0]?.name || "Player 2"}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
