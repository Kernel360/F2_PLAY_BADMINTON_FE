"use client";

import OverlayMessage from "@/components/club/ScoreBoard/OverlayMessage";
import PlayerScore from "@/components/club/ScoreBoard/PlayerScore";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  useGetSetScore,
  usePatchSetScore,
  usePostMatchStart,
  usePostSetScore,
} from "@/lib/api/hooks/matchHook";
import type {
  MatchParticipantType,
  MatchStatusType,
  PatchMatchSetScoreRequest,
} from "@/types/matchTypes";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScoreboardProps {
  clubId: string;
  leagueId: string;
  matchId: string;
  currentSetNumber: number;
  matchStatus: MatchStatusType;
  player1: MatchParticipantType[];
  player2: MatchParticipantType[];
}

// 디바운스된 점수 업데이트 함수를 생성하는 훅
const useDebouncedUpdateScore = (
  patchSetScore: (updatedScore: PatchMatchSetScoreRequest) => void,
) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useCallback(
    debounce((updatedScore: PatchMatchSetScoreRequest) => {
      patchSetScore(updatedScore);
    }, 300), // 0.3초
    [patchSetScore], // patchSetScore 의존성 추가
  );
};

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

  const { mutate: patchSetScore } = usePatchSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const { mutate: postMatchStart } = usePostMatchStart(
    clubId,
    leagueId,
    matchId,
  );

  const { mutate: postSetScore } = usePostSetScore(
    clubId,
    leagueId,
    matchId,
    currentSetNumber,
  );

  const debouncedUpdateScore = useDebouncedUpdateScore(patchSetScore);

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

    setTempScore(updatedScore); // 로컬 상태 업데이트
    debouncedUpdateScore(updatedScore); // 디바운스된 API 호출
  };

  const handleInputChange = (player: "score1" | "score2", value: string) => {
    const parsedValue = Number(value);

    if (parsedValue > 30) {
      toast({
        title: "최대 점수 제한",
        description: "점수는 30점을 초과할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    const updatedScore = {
      ...tempScore,
      [player]: Math.min(Math.max(parsedValue, 0), 30),
    };

    setTempScore(updatedScore); // 로컬 상태 업데이트
    debouncedUpdateScore(updatedScore); // 디바운스된 API 호출
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
          players={player1}
          score={tempScore.score1}
          isEditing={isEditing}
          inputRef={inputRefPlayer1}
          onInputChange={(value) => handleInputChange("score1", value)}
          onScoreUpdate={() => updateScore("score1", 1)}
        />
        <PlayerScore
          players={player2}
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
