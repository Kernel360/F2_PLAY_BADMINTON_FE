"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSetScore,
  usePatchSetScore,
  usePostMatchStart,
  usePostSetScore,
} from "@/lib/api/hooks/matchHook";
import type { MatchStatusType } from "@/types/matchTypes";
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

  const { mutate: patchSetScore } = usePatchSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const updateScore = (key: "score1" | "score2", increment: number) => {
    setScore((prev) => {
      const updatedScore = {
        ...prev,
        [key]: Math.max(0, prev[key] + increment),
      };
      patchSetScore(updatedScore);
      return updatedScore;
    });
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

    setScore(updatedScore);
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

  if (isLoading) {
    return <Skeleton className="w-full h-[450px] rounded-md" />;
  }

  return (
    <div
      ref={scoreboardRef}
      className="bg-gradient-to-br from-gray-800 to-gray-900 h-full flex flex-col items-center justify-center text-white shadow-2xl rounded-lg p-8 space-y-8 relative"
    >
      {matchStatus === "NOT_STARTED" && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <button
            type="button"
            onClick={() => postMatchStart()}
            className="bg-primary hover:bg-primary/50 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
          >
            경기 시작하기
          </button>
        </div>
      )}
      <>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-transform transform hover:scale-[1.02]"
        >
          {document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen"}
        </button>

        <div className="text-3xl font-extrabold tracking-wide text-gray-200">
          Set {currentSetNumber}
        </div>
        <div className="grid grid-cols-2 gap-12 w-full max-w-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-wide text-gray-100">
              {player1}
            </h2>
            {isEditing ? (
              <input
                ref={inputRefPlayer1}
                type="number"
                defaultValue={score.score1}
                min="0"
                max="30"
                step="1"
                className="bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => updateScore("score1", 1)}
                className="!mt-4 bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
              >
                {score.score1}
              </button>
            )}
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-wide text-gray-100">
              {player2}
            </h2>
            {isEditing ? (
              <input
                ref={inputRefPlayer2}
                type="number"
                defaultValue={score.score2}
                min="0"
                max="30"
                step="1"
                className="bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => updateScore("score2", 1)}
                className="!mt-4 bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
              >
                {score.score2}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-6">
          {isEditing ? (
            <button
              type="button"
              onClick={() => handleSaveScores()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
            >
              수정
            </button>
          )}
          <button
            type="button"
            onClick={() => postNextSet()}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
          >
            세트 종료
          </button>
        </div>
      </>
    </div>
  );
}
