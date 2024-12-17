import { Button } from "@/components/ui/Button";
import type { MatchParticipantType } from "@/types/matchTypes";
import type { RefObject } from "react";

interface PlayerScoreProps {
  players: MatchParticipantType[];
  score: number;
  isEditing: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onScoreUpdate: () => void;
  onInputChange: (value: string) => void;
  disabled?: boolean;
}

function PlayerScore({
  players,
  score,
  isEditing,
  inputRef,
  onScoreUpdate,
  onInputChange,
  disabled = false,
}: PlayerScoreProps) {
  return (
    <div className="text-center space-y-4">
      {players?.map((player) => (
        <h2
          key={player.image}
          className="text-lg sm:text-xl font-bold tracking-wide text-gray-100"
        >
          {player.name}
        </h2>
      ))}
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          defaultValue={score}
          min={0}
          max={30}
          step={1}
          onChange={(e) => {
            const value = Math.max(0, Math.min(Number(e.target.value), 30)); // 값 제한
            onInputChange(value.toString()); // 변경된 값 상위 컴포넌트로 전달
          }}
          className="bg-black hover:bg-zinc-800 w-24 h-24 sm:w-32 sm:h-32 text-red-500 text-4xl sm:text-6xl text-center rounded-lg shadow-inner focus:ring-4 focus:ring-primary-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={disabled}
        />
      ) : (
        <Button
          onClick={() => {
            if (!disabled) {
              onScoreUpdate();
            }
          }}
          className="!mt-4 bg-black hover:bg-zinc-800 w-24 h-24 sm:w-32 sm:h-32 text-red-500 text-4xl sm:text-6xl text-center rounded-lg shadow-inner transition-transform transform hover:scale-[1.02]"
          disabled={disabled}
        >
          {score}
        </Button>
      )}
    </div>
  );
}

export default PlayerScore;
