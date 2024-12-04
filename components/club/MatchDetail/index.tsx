"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type {
  GetSetsDetailData,
  MatchParticipantType,
} from "@/types/matchTypes";
import MatchParticipant from "./MatchParticipant";

interface MatchDetailProps {
  detail: GetSetsDetailData;
}

const MatchDetail = (props: MatchDetailProps) => {
  const { detail } = props;

  const isDoublesMatch = Boolean(detail.doubles_match);

  const getParticipants = (
    participants: (MatchParticipantType | undefined)[],
  ) =>
    participants.filter(
      (participant): participant is MatchParticipantType => !!participant,
    );

  const team1Participants = isDoublesMatch
    ? getParticipants([
        detail.doubles_match?.team1.participant1,
        detail.doubles_match?.team1.participant2,
      ])
    : getParticipants([detail.singles_match?.participant1]);

  const team2Participants = isDoublesMatch
    ? getParticipants([
        detail.doubles_match?.team2.participant1,
        detail.doubles_match?.team2.participant2,
      ])
    : getParticipants([detail.singles_match?.participant2]);

  // Extract scores and sets
  const sets = isDoublesMatch ? detail.doubles_sets : detail.singles_sets;
  const scores1 = sets?.map((set) => set.score1) || [];
  const scores2 = sets?.map((set) => set.score2) || [];
  const setNumbers = sets?.map((set) => set.set_number) || [];

  return (
    <Card className="w-full mx-auto overflow-hidden border-none bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 p-4">
        {/* Team 1 */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <MatchParticipant
            participants={team1Participants}
            matchType={isDoublesMatch ? "DOUBLES" : "SINGLES"}
          />
        </div>

        {/* VS Text */}
        <div className="flex items-center justify-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">VS</div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <MatchParticipant
            participants={team2Participants}
            matchType={isDoublesMatch ? "DOUBLES" : "SINGLES"}
          />
        </div>

        {/* Scoreboard */}
        {sets && sets.length !== 0 && (
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
                      key={`set-number-${set}`}
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
        )}
      </div>
    </Card>
  );
};

export default MatchDetail;
