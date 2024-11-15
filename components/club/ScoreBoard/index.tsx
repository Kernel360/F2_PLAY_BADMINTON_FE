"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Edit2, Flag } from "lucide-react";
import { useState } from "react";

type ScoreboardProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  label: string;
};

export default function Scoreboard() {
  const [homeScore, setHomeScore] = useState<number>(12);
  const [visitorScore, setVisitorScore] = useState<number>(18);
  const [setCount, setSetCount] = useState<number>(2);

  const handleScoreClick = (
    setScore: React.Dispatch<React.SetStateAction<number>>,
    score: number,
  ) => {
    setScore(Math.min(30, score + 1));
  };

  //   const handleEditToggle = () => {
  //     setIsEditing(!isEditing);
  //   };

  //   const handleKeyPress = (
  //     event: React.KeyboardEvent<HTMLButtonElement>,
  //     setScore: React.Dispatch<React.SetStateAction<number>>,
  //     score: number,
  //   ) => {
  //     if (!isEditing && (event.key === "Enter" || event.key === " ")) {
  //       setScore(Math.min(30, score + 1));
  //     }
  //   };

  const ScoreDisplay = ({ score, setScore, label }: ScoreboardProps) => (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-white">{label}</h2>
      <button
        className="aspect-square w-56 h-56 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center border-4 border-zinc-700 shadow-lg relative overflow-hidden cursor-pointer"
        onClick={() => handleScoreClick(setScore, score)}
        // onKeyUp={(event) => handleKeyPress(event, setScore, score)}
        tabIndex={0}
        type="button"
        aria-label={`${label} score display`}
      >
        <span className="font-['DS-Digital'] text-red-500 text-9xl leading-none z-10">
          {score.toString().padStart(2, "0")}
        </span>
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-8 space-y-8 bg-gradient-to-br min-h-screen flex flex-col justify-center">
      <style jsx global>{`
        @font-face {
          font-family: 'DS-Digital';
          src: url('https://db.onlinewebfonts.com/t/8e22783d707ad140bffe18b2a3812529.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="text-sm flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50"
        >
          <Edit2 className="w-4 h-4" />
          수정
        </Button>
        <div className="font-['DS-Digital'] text-6xl text-center text-white bg-gradient-to-r from-zinc-900 to-black px-6 py-3 rounded-2xl border-2 border-zinc-700 shadow-lg">
          10:02
        </div>
        <Button
          variant="outline"
          className="text-sm flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50"
        >
          <Flag className="w-4 h-4" />
          현재 세트 종료
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 space-y-12 shadow-2xl rounded-3xl border-2 border-zinc-700">
        <div className="flex justify-around items-center">
          <ScoreDisplay
            score={homeScore}
            setScore={setHomeScore}
            label="Player 1"
          />

          <div className="text-center space-y-6">
            <div className="font-bold text-3xl text-white">Set {setCount}</div>
            <div className="flex justify-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center border-4 border-zinc-700 shadow-lg">
                <span className="font-['DS-Digital'] text-white text-4xl">
                  0
                </span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center border-4 border-zinc-700 shadow-lg">
                <span className="font-['DS-Digital'] text-white text-4xl">
                  1
                </span>
              </div>
            </div>
          </div>

          <ScoreDisplay
            score={visitorScore}
            setScore={setVisitorScore}
            label="Player 2"
          />
        </div>
      </Card>
    </div>
  );
}
