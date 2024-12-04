import { Button } from "@/components/ui/Button";
import type { RefObject } from "react";

interface PlayerScoreProps {
  player: string;
  score: number;
  isEditing: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onScoreUpdate: () => void;
}

function PlayerScore({
  player,
  score,
  isEditing,
  inputRef,
  onScoreUpdate,
}: PlayerScoreProps) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-100">
        {player}
      </h2>
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          defaultValue={score}
          min={0}
          max={30}
          step={1}
          className="bg-black hover:bg-zinc-800 w-24 h-24 sm:w-32 sm:h-32 text-red-500 text-4xl sm:text-6xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      ) : (
        <Button
          onClick={onScoreUpdate}
          className="!mt-4 bg-black hover:bg-zinc-800 w-24 h-24 sm:w-32 sm:h-32 text-red-500 text-4xl sm:text-6xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
        >
          {score}
        </Button>
      )}
    </div>
  );
}

export default PlayerScore;
