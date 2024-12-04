"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { GetSetsDetailData } from "@/types/matchTypes";
import { User } from "lucide-react";

interface MatchDetailProps {
  detail: GetSetsDetailData;
}

const MatchDetail = (props: MatchDetailProps) => {
  const { detail } = props;

  // Determine if it's a doubles or singles match
  const isDoublesMatch = Boolean(detail.doubles_match);

  // Extract data for players or teams
  const player1 = isDoublesMatch
    ? detail.doubles_match?.team1.participant1
    : detail.singles_match?.participant1;
  const player2 = isDoublesMatch
    ? detail.doubles_match?.team2.participant1
    : detail.singles_match?.participant2;
  const player3 = isDoublesMatch
    ? detail.doubles_match?.team1.participant2
    : null;
  const player4 = isDoublesMatch
    ? detail.doubles_match?.team2.participant2
    : null;

  // Extract scores and set details
  const sets = isDoublesMatch ? detail.doubles_sets : detail.singles_sets;
  const scores1 = sets?.map((set) => set.score1) || [];
  const scores2 = sets?.map((set) => set.score2) || [];
  const setNumbers = sets?.map((set) => set.set_number) || [];

  return (
    <Card className="w-full mx-auto overflow-hidden border-none bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 p-4">
        {/* Player/Team 1 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 flex items-center justify-center">
              {player1?.image ? (
                <img
                  src={player1.image}
                  alt={player1.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
              )}
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-sm md:text-lg text-gray-800">
              {player1?.name}
            </h3>
            {player3 && (
              <p className="text-xs md:text-sm text-gray-600">
                {player3?.name}
              </p>
            )}
          </div>
        </div>

        {/* VS Text */}
        <div className="flex items-center justify-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">VS</div>
        </div>

        {/* Player/Team 2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-100 flex items-center justify-center">
              {player2?.image ? (
                <img
                  src={player2.image}
                  alt={player2.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-red-600" />
              )}
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-sm md:text-lg text-gray-800">
              {player2?.name}
            </h3>
            {player4 && (
              <p className="text-xs md:text-sm text-gray-600">
                {player4?.name}
              </p>
            )}
          </div>
        </div>

        {/* Scoreboard */}
        <div className="col-span-1 md:col-span-3 mt-4">
          <Card className="overflow-hidden shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center bg-white p-4">
              {/* Player 1 Scores */}
              <div className="flex flex-col justify-evenly items-center space-y-3">
                {scores1.map((score) => (
                  <span
                    key={`player1-score-${score}`}
                    className="text-sm md:text-lg font-bold text-blue-600 flex items-center justify-center"
                  >
                    {score}
                  </span>
                ))}
              </div>

              {/* Set Information */}
              <div className="hidden md:flex flex-col justify-evenly items-center space-y-3">
                {setNumbers?.map((set) => (
                  <Badge
                    key={set}
                    className="text-xs md:text-sm font-medium rounded-full px-2 py-1 md:px-3 md:py-1.5 bg-blue-400 text-white"
                  >
                    {set}세트
                  </Badge>
                ))}
              </div>

              {/* Player 2 Scores */}
              <div className="flex flex-col justify-evenly items-center space-y-3">
                {scores2.map((score) => (
                  <span
                    key={`player2-score-${score}`}
                    className="text-sm md:text-lg font-bold text-pink-600 flex items-center justify-center"
                  >
                    {score}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default MatchDetail;
