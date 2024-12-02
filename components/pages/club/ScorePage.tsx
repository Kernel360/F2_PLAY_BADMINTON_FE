"use client";

import Scoreboard from "@/components/club/ScoreBoard";
import ParticipantSection from "@/components/club/ScorePage/ParticipantSection";
import PlayerProfile from "@/components/club/ScorePage/PlayerProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSetsDetail } from "@/lib/api/hooks/matchHook";
import { Trophy, User, Users } from "lucide-react";
import { useParams } from "next/navigation";

const MatchSet = ({ set }: { set: any }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <span className="text-sm font-medium text-muted-foreground">
      Set {set.set_number}
    </span>
    <span className="text-sm font-bold">
      {set.score1}-{set.score2}
    </span>
  </div>
);

export default function ScorePage() {
  const { clubId, leagueId, matchId } = useParams();
  const { data: setsDetail } = useGetSetsDetail(
    clubId as string,
    leagueId as string,
    matchId as string,
  );

  const isDoublesMatch = setsDetail?.doubles_match;

  const matchSets = isDoublesMatch
    ? setsDetail.doubles_sets
    : setsDetail?.singles_sets;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        배드민턴 챔피언십 2023
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              실시간 점수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Scoreboard
              clubId={clubId as string}
              leagueId={leagueId as string}
              matchId={matchId as string}
              matchStatus="NOT_STARTED"
              player1={
                isDoublesMatch
                  ? setsDetail.doubles_match?.team1.participant1.name
                  : setsDetail?.singles_match?.participant1.name
              }
              player2={
                isDoublesMatch
                  ? setsDetail.doubles_match?.team2.participant1.name
                  : setsDetail?.singles_match?.participant2.name
              }
            />
          </CardContent>
        </Card>

        {/* 참가자 프로필 */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              참가자 프로필
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isDoublesMatch ? (
              <>
                <ParticipantSection
                  team={setsDetail.doubles_match?.team1}
                  teamNumber={1}
                />
                <ParticipantSection
                  team={setsDetail.doubles_match?.team2}
                  teamNumber={2}
                />
              </>
            ) : (
              <div className="space-y-4">
                {setsDetail?.singles_match && (
                  <>
                    {" "}
                    <PlayerProfile
                      player={setsDetail?.singles_match?.participant1}
                    />
                    <PlayerProfile
                      player={setsDetail?.singles_match?.participant2}
                    />
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 세트 기록 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              세트 기록
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {matchSets?.map((set) => (
              <MatchSet key={set.set_number} set={set} />
            ))} */}
            세트 기록
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
