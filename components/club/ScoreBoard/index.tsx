"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreboardProps {
  player1: string;
  player2: string;
}

export default function Scoreboard({ player1, player2 }: ScoreboardProps) {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [setCount, setSetCount] = useState(1);
  const inputRefPlayer1 = useRef<HTMLInputElement>(null);
  const inputRefPlayer2 = useRef<HTMLInputElement>(null);
  const scoreboardRef = useRef<HTMLDivElement | null>(null);

  const updateScore = (player: "player1" | "player2", increment: number) => {
    setScore((prev) => ({
      ...prev,
      [player]: Math.max(0, prev[player] + increment),
    }));
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      scoreboardRef.current?.requestFullscreen();
    }
  };

  const handleSaveScores = () => {
    const newPlayer1Score = inputRefPlayer1.current?.value || "0";
    const newPlayer2Score = inputRefPlayer2.current?.value || "0";

    setScore({
      player1: Math.min(Math.max(Number(newPlayer1Score), 0), 30),
      player2: Math.min(Math.max(Number(newPlayer2Score), 0), 30),
    });
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRefPlayer1.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={scoreboardRef}
      className="bg-gradient-to-br from-gray-800 to-gray-900 h-full flex flex-col items-center justify-center text-white shadow-2xl rounded-lg p-8 space-y-8 relative"
    >
      {/* Fullscreen button */}
      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-transform transform hover:scale-[1.02]"
      >
        {document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      {/* Set count */}
      <div className="text-3xl font-extrabold tracking-wide text-gray-200">
        Set {setCount}
      </div>
      <div className="grid grid-cols-2 gap-12 w-full max-w-2xl">
        {/* Player 1 */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-wide text-gray-100">
            {player1}
          </h2>
          {isEditing ? (
            <input
              ref={inputRefPlayer1}
              type="number"
              defaultValue={score.player1}
              min="0"
              max="30"
              step="1"
              className="bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          ) : (
            <button
              type="button"
              onClick={() => updateScore("player1", 1)}
              className="!mt-4 bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
            >
              {score.player1}
            </button>
          )}
        </div>

        {/* Player 2 */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-wide text-gray-100">
            {player2}
          </h2>
          {isEditing ? (
            <input
              ref={inputRefPlayer2}
              type="number"
              defaultValue={score.player2}
              min="0"
              max="30"
              step="1"
              className="bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          ) : (
            <button
              type="button"
              onClick={() => updateScore("player2", 1)}
              className="!mt-4 bg-black w-40 h-40 text-red-500 text-8xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
            >
              {score.player2}
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-6 mt-6">
        {isEditing ? (
          <button
            type="button"
            onClick={handleSaveScores}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
          >
            Save Scores
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
          >
            Edit Scores
          </button>
        )}
        <button
          type="button"
          onClick={() => setSetCount(setCount + 1)}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-[1.02]"
        >
          Next Set
        </button>
      </div>
    </div>
  );
}
