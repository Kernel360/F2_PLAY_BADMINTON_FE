"use client";

import OverlayMessage from "@/components/club/ScoreBoard/OverlayMessage";
import PlayerScore from "@/components/club/ScoreBoard/PlayerScore";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { postSetScore } from "@/lib/api/functions/matchFn";
import {
  useGetSetScore,
  usePatchSetScore,
  usePostMatchStart,
  usePostSetScore,
} from "@/lib/api/hooks/matchHook";
import type {
  MatchStatusType,
  PatchMatchSetScoreRequest,
} from "@/types/matchTypes";
import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ScoreboardProps {
  clubId: string;
  leagueId: string;
  matchId: string;
  currentSetNumber: number;
  matchStatus: MatchStatusType;
  player1: string;
  player2: string;
}

export default function Scoreboard(props: ScoreboardProps) {
  const {
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
    matchStatus,
    player1,
    player2,
  } = props;

  const { toast } = useToast();
  const inputRefPlayer1 = useRef<HTMLInputElement>(null);
  const inputRefPlayer2 = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempScore, setTempScore] = useState<PatchMatchSetScoreRequest>({
    score1: 0,
    score2: 0,
  });

  const { data: scoreData, isLoading } = useGetSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
    matchStatus,
  );

  const { mutate: postMatchStart } = usePostMatchStart(
    clubId,
    leagueId,
    matchId,
  );

  const { mutate: patchSetScore } = usePatchSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const { mutate: postSetScore } = usePostSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  useEffect(() => {
    if (scoreData?.data) {
      setTempScore({
        score1: scoreData.data.set_score1,
        score2: scoreData.data.set_score2,
      });
    }
  }, [scoreData]);

  const updateScore = (key: "score1" | "score2", increment: number) => {
    if (isEditing) return;

    const currentScore = tempScore[key];
    if (currentScore >= 30 && increment > 0) {
      toast({
        title: "최대 점수 제한",
        description: "점수는 30점을 초과할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    const updatedScore = {
      ...tempScore,
      [key]: Math.min(30, currentScore + increment),
    };

    setTempScore(updatedScore);
    patchSetScore(updatedScore);
  };

  const handleInputChange = (player: "score1" | "score2", value: string) => {
    if (Number(value) >= 30) {
      toast({
        title: "최대 점수 제한",
        description: "점수는 30점을 초과할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }
    setTempScore((prev) => ({
      ...prev,
      [player]: Math.min(Math.max(Number(value), 0), 30),
    }));
  };

  const handleSaveScores = () => {
    patchSetScore(tempScore);
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setTempScore({
      score1: scoreData?.data?.set_score1 || 0,
      score2: scoreData?.data?.set_score2 || 0,
    });
    setIsEditing(false);
  };

  const postNextSet = () => {
    postSetScore(tempScore);
  };
  if (isLoading) {
    return <Skeleton className="w-full h-[450px] rounded-md" />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white shadow-2xl rounded-lg p-6 space-y-6 relative transition-all duration-300">
      <OverlayMessage
        matchStatus={matchStatus}
        postMatchStart={postMatchStart}
      />
      <div className="grid grid-cols-2 gap-6 w-full">
        <PlayerScore
          player={player1}
          score={tempScore.score1}
          isEditing={isEditing}
          inputRef={inputRefPlayer1}
          onInputChange={(value) => handleInputChange("score1", value)}
          onScoreUpdate={() => updateScore("score1", 1)}
        />
        <PlayerScore
          player={player2}
          score={tempScore.score2}
          isEditing={isEditing}
          inputRef={inputRefPlayer2}
          onInputChange={(value) => handleInputChange("score2", value)}
          onScoreUpdate={() => updateScore("score2", 1)}
        />
      </div>
      <div className="flex justify-center space-x-4 mt-6 gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSaveScores}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition-all"
            >
              저장
            </button>
            <button
              type="button"
              onClick={handleCancelEditing}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition-all"
            >
              취소
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            수정
          </button>
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={postNextSet}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all transform hover:scale-105"
          >
            세트 종료
          </button>
        )}
      </div>
    </div>
  );
}
