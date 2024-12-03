"use client";

import Scoreboard from "@/components/club/ScoreBoard";
import ParticipantSection from "@/components/club/ScorePage/ParticipantSection";
import PlayerProfile from "@/components/club/ScorePage/PlayerProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSetsDetail } from "@/lib/api/hooks/matchHook";
import type { MatchStatusType, SetType } from "@/types/matchTypes";
import { History, Trophy, Users } from "lucide-react";
import { useParams } from "next/navigation";

const MatchSet = ({ set }: { set: SetType }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <span className="text-sm font-medium text-muted-foreground">
      세트 {set.set_number}
    </span>
    <span className="text-sm font-bold">
      {set.score1}-{set.score2}
    </span>
  </div>
);

export default function ScorePage() {
  const { clubId, leagueId, matchId } = useParams();
  const { data: setDetail } = useGetSetsDetail(
    clubId as string,
    leagueId as string,
    matchId as string,
  );

  const isDoublesMatch = setDetail?.doubles_match;

  const currentSetNumber = isDoublesMatch
    ? (setDetail.doubles_sets?.length ?? 0 + 1)
    : (setDetail?.singles_sets?.length ?? 0 + 1);

  const matchSets = isDoublesMatch
    ? setDetail.doubles_sets
    : setDetail?.singles_sets;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {setDetail?.league_title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-5 w-5" />
              실시간 점수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Scoreboard
              clubId={clubId as string}
              leagueId={leagueId as string}
              matchId={matchId as string}
              currentSetNumber={currentSetNumber}
              matchStatus={
                isDoublesMatch
                  ? (setDetail?.doubles_match?.match_status as MatchStatusType)
                  : (setDetail?.singles_match?.match_status as MatchStatusType)
              }
              player1={
                isDoublesMatch
                  ? (setDetail.doubles_match?.team1.participant1.name as string)
                  : (setDetail?.singles_match?.participant1.name as string)
              }
              player2={
                isDoublesMatch
                  ? (setDetail.doubles_match?.team2.participant1.name as string)
                  : (setDetail?.singles_match?.participant2.name as string)
              }
            />
          </CardContent>
        </Card>

        {/* 참가자 프로필 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5" />
              참가자 프로필
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isDoublesMatch ? (
              <>
                <ParticipantSection
                  // biome-ignore lint/style/noNonNullAssertion: <explanation>
                  team={setDetail.doubles_match?.team1!}
                  teamNumber={1}
                />
                <ParticipantSection
                  // biome-ignore lint/style/noNonNullAssertion: <explanation>
                  team={setDetail.doubles_match?.team2!}
                  teamNumber={2}
                />
              </>
            ) : (
              <div className="space-y-4">
                {setDetail?.singles_match && (
                  <>
                    <PlayerProfile
                      player={setDetail?.singles_match?.participant1}
                    />
                    <PlayerProfile
                      player={setDetail?.singles_match?.participant2}
                    />
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 세트 기록 */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-5 w-5" />
              세트 기록
            </CardTitle>
          </CardHeader>
          <CardContent>
            {matchSets?.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
                <span className="text-black">종료된 세트가 없습니다</span>
              </div>
            )}
            {matchSets?.map((set) => (
              <MatchSet key={set.set_number} set={set} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
