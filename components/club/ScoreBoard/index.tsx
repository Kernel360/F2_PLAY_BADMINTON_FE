"use client";

import { Button } from "@/components/ui/Button";
import { Edit2, Flag, History } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Scoreboard() {
  const [homeScore, setHomeScore] = useState<number>(0);
  const [visitorScore, setVisitorScore] = useState<number>(0);
  const [setCount, setSetCount] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const homeInputRef = useRef<HTMLInputElement>(null);
  const visitorInputRef = useRef<HTMLInputElement>(null);

  const handleScoreChange = (
    setScore: React.Dispatch<React.SetStateAction<number>>,
    score: number,
    change: number,
  ) => {
    setScore(Math.max(0, Math.min(30, score + change)));
  };

  const handleScoreInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement>,
  ) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
  };

  const handleFinishEditing = () => {
    if (homeInputRef.current && visitorInputRef.current) {
      if (
        Number(homeInputRef.current.value) > 30 ||
        Number(visitorInputRef.current.value) > 30
      ) {
        alert("점수는 0점 이상 30점 이하만 입력 가능합니다.");
        return;
      }

      if (
        Number(homeInputRef.current.value) < 0 ||
        Number(visitorInputRef.current.value) < 0
      ) {
        alert("점수는 0점 이상 30점 이하만 입력 가능합니다.");
        return;
      }

      setHomeScore(Number(homeInputRef.current.value));
      setVisitorScore(Number(visitorInputRef.current.value));
    }
    setIsEditing(false);
  };

  const ScoreDisplay = ({
    score,
    setScore,
    label,
    isEditing,
    inputRef,
  }: {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    label: string;
    isEditing: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-black">{label}</h2>
      <div className="flex justify-center items-center gap-6">
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            max="30"
            min="0"
            defaultValue={score}
            onChange={(e) => handleScoreInputChange(e, inputRef)}
            className=" w-32 sm:w-56 h-32 sm:h-56  text-center text-black text-6xl sm:text-9xl bg-transparent border-b-4 border-red-500 focus:outline-none"
            aria-label={`${label} score input`}
          />
        ) : (
          <button
            className="aspect-square w-32 sm:w-56 h-32 sm:h-56 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center border-4 border-zinc-700 shadow-lg relative overflow-hidden cursor-pointer transition-transform duration-200 transform hover:scale-[1.02]"
            onClick={() => handleScoreChange(setScore, score, 1)}
            tabIndex={0}
            type="button"
            aria-label={`${label} score display`}
          >
            <span className="text-red-500 text-6xl sm:text-9xl leading-none z-10">
              {score.toString().padStart(2, "0")}
            </span>
          </button>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (isEditing) {
      if (homeInputRef.current) homeInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 bg-white p-8 rounded-2xl">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <div className="flex gap-2 justify-center items-center">
          <Button variant="outline" className="text-sm flex items-center gap-2">
            <History className="w-4 h-4" />
            경기 기록 조회
          </Button>
          <Button variant="outline" className="text-sm flex items-center gap-2">
            <Flag className="w-4 h-4" />
            세트 종료
          </Button>
        </div>
        <Button
          variant="ghost"
          className="text-sm flex items-center gap-2"
          onClick={() => {
            if (isEditing) {
              handleFinishEditing();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? "완료" : "수정"}
        </Button>
      </div>

      <div className="flex justify-between items-center w-full space-x-10">
        <ScoreDisplay
          score={homeScore}
          setScore={setHomeScore}
          label="TEAM-A"
          isEditing={isEditing}
          inputRef={homeInputRef}
        />

        <div className="text-center space-y-6">
          <div className="font-bold text-4xl text-black">Set {setCount}</div>
          <div className="flex justify-center gap-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gray-200">
              <span className="text-black text-4xl">{setCount}</span>
            </div>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gray-200">
              <span className="text-black text-4xl">{setCount - 1}</span>
            </div>
          </div>
        </div>

        <ScoreDisplay
          score={visitorScore}
          setScore={setVisitorScore}
          label="TEAM-B"
          isEditing={isEditing}
          inputRef={visitorInputRef}
        />
      </div>
    </div>
  );
}
