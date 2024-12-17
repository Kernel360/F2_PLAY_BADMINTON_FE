"use client";

import OverlayMessage from "@/components/club/ScoreBoard/OverlayMessage";
import PlayerScore from "@/components/club/ScoreBoard/PlayerScore";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSetScore,
  usePatchSetScore,
  usePostMatchStart,
  usePostSetScore,
} from "@/lib/api/hooks/matchHook";
import type { MatchStatusType } from "@/types/matchTypes";
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

  const [isEditing, setIsEditing] = useState(false);
  const inputRefPlayer1 = useRef<HTMLInputElement>(null);
  const inputRefPlayer2 = useRef<HTMLInputElement>(null);
  const scoreboardRef = useRef<HTMLDivElement | null>(null);

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

  const [score, setScore] = useState<{ score1: number; score2: number }>({
    score1: 0,
    score2: 0,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (scoreData?.data) {
      setScore({
        score1: scoreData.data.set_score1,
        score2: scoreData.data.set_score2,
      });
    }
  }, [scoreData]);

  const { mutate: postSetScore } = usePostSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const { mutate: patchSetScore, isPending } = usePatchSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const updateScore = (key: "score1" | "score2", increment: number) => {
    if (isLoading || isPending) return;

    const updatedScore = {
      ...score,
      [key]: Math.max(0, score[key] + increment),
    };

    patchSetScore(updatedScore);
  };

  const postNextSet = () => {
    postSetScore(score);
  };

  const handleSaveScores = () => {
    const newPlayer1Score = inputRefPlayer1.current?.value || "0";
    const newPlayer2Score = inputRefPlayer2.current?.value || "0";

    const updatedScore = {
      score1: Math.min(Math.max(Number(newPlayer1Score), 0), 30),
      score2: Math.min(Math.max(Number(newPlayer2Score), 0), 30),
    };

    // setScore(updatedScore);
    patchSetScore(updatedScore);
    setIsEditing(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      scoreboardRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRefPlayer1.current?.focus();
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isEditing]);

  if (isLoading) {
    return <Skeleton className="w-full h-[450px] rounded-md" />;
  }

  return (
    <div
      ref={scoreboardRef}
      className="bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white shadow-2xl rounded-lg p-6 space-y-6 relative transition-all duration-300"
    >
      <OverlayMessage
        matchStatus={matchStatus}
        postMatchStart={postMatchStart}
      />
      <>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-none hover:bg-none text-whiterounded-lg hover:scale-105"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        <div className="text-2xl font-extrabold tracking-wide text-gray-200">
          Set {currentSetNumber}
        </div>
        <div className="grid grid-cols-2 gap-6 w-full">
          <PlayerScore
            player={player1}
            score={score.score1}
            isEditing={isEditing}
            inputRef={inputRefPlayer1}
            onScoreUpdate={() => updateScore("score1", 1)}
            disabled={isLoading || isPending}
          />
          <PlayerScore
            player={player2}
            score={score.score2}
            isEditing={isEditing}
            inputRef={inputRefPlayer2}
            onScoreUpdate={() => updateScore("score2", 1)}
            disabled={isLoading || isPending}
          />
        </div>

        {!isFullscreen && (
          <div className="flex justify-center space-x-8 mt-4 gap-6">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveScores}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all transform hover:scale-105"
              >
                저장
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all transform hover:scale-105"
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
        )}
      </>
    </div>
  );
}
