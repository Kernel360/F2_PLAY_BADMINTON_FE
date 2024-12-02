"use client";

import Scoreboard from "@/components/club/ScoreBoard";
import TierBadge from "@/components/liveMatch/TierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tier } from "@/types/commonTypes";
import { Trophy, User, Users } from "lucide-react";

const PlayerProfile = ({ player }: { player: any }) => (
  <div className="flex items-center space-x-4 p-2">
    <Avatar className="h-10 w-10">
      <AvatarImage src={player.image} alt={player.name} />
      <AvatarFallback>{player.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium leading-none">{player.name}</p>
      <TierBadge tier={player.tier as Tier} />
    </div>
  </div>
);

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

const TeamSection = ({
  team,
  teamNumber,
}: { team: any; teamNumber: number }) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Team {teamNumber}</CardTitle>
    </CardHeader>
    <CardContent>
      <PlayerProfile player={team.participant1} />
      <PlayerProfile player={team.participant2} />
    </CardContent>
  </Card>
);

export default function ScorePage() {
  const singlesMatch = {
    match_id: 1,
    round_number: 1,
    match_status: "NOT_STARTED",
    participant1: {
      member_token: "token1",
      name: "김철수",
      image: "/images/dummy-image.jpg",
      tier: "GOLD",
      participant_win_set_count: 0,
    },
    participant2: {
      member_token: "token2",
      name: "이영희",
      image: "/images/dummy-image.jpg",
      tier: "SILVER",
      participant_win_set_count: 0,
    },
    winner_token: "string",
  };

  const doublesMatch = {
    match_id: 2,
    round_number: 1,
    match_status: "NOT_STARTED",
    team1: {
      participant1: {
        member_token: "token3",
        name: "박민수",
        image: "/images/dummy-image.jpg",
        tier: "GOLD",
        participant_win_set_count: 0,
      },
      participant2: {
        member_token: "token4",
        name: "최은영",
        image: "/images/dummy-image.jpg",
        tier: "SILVER",
        participant_win_set_count: 0,
      },
      team1_win_set_count: 0,
    },
    team2: {
      participant1: {
        member_token: "token5",
        name: "홍길동",
        image: "/images/dummy-image.jpg",
        tier: "GOLD",
        participant_win_set_count: 0,
      },
      participant2: {
        member_token: "token6",
        name: "이영수",
        image: "/images/dummy-image.jpg",
        tier: "SILVER",
        participant_win_set_count: 0,
      },
      team2_win_set_count: 0,
    },
    winners_token: ["string"],
  };

  const singlesSets = [
    { set_number: 1, score1: 21, score2: 15 },
    { set_number: 2, score1: 18, score2: 21 },
    { set_number: 3, score1: 21, score2: 19 },
  ];

  const doublesSets = [
    { set_number: 1, score1: 21, score2: 17 },
    { set_number: 2, score1: 21, score2: 18 },
  ];

  const isDoublesMatch = doublesMatch.match_id !== 0;

  const matchSets = isDoublesMatch ? doublesSets : singlesSets;

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
              player1={
                isDoublesMatch
                  ? doublesMatch.team1.participant1.name
                  : singlesMatch.participant1.name
              }
              player2={
                isDoublesMatch
                  ? doublesMatch.team2.participant1.name
                  : singlesMatch.participant2.name
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
                <TeamSection team={doublesMatch.team1} teamNumber={1} />
                <TeamSection team={doublesMatch.team2} teamNumber={2} />
              </>
            ) : (
              <div className="space-y-4">
                <PlayerProfile player={singlesMatch.participant1} />
                <PlayerProfile player={singlesMatch.participant2} />
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
            {matchSets.map((set) => (
              <MatchSet key={set.set_number} set={set} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
