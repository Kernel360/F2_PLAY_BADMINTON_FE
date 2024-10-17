import type { components } from "@/schemas/schema";
import MatchScoreModalSingles from "./MatchScoreModalSingles";

type MatchResponse = components["schemas"]["MatchResponse"];

interface MatchProfileSinglesProps {
  singlesMatch: Exclude<MatchResponse["singles_match"], undefined>;
  isOpen: boolean;
  onClose: () => void;
}

function MatchProfileSingles({
  singlesMatch,
  isOpen,
  onClose,
}: MatchProfileSinglesProps) {
  const {
    participant1_name,
    participant1_image,
    participant2_name,
    participant2_image,
    participant1_win_set_count,
    participant2_win_set_count,
  } = singlesMatch;

  return (
    <div className="flex">
      <div className="flex rounded-md bg-gray-200 items-center w-72 p-2 justify-between">
        <div className="flex flex-col items-center gap-4">
          <img
            src={participant1_image}
            alt="user"
            className="h-20 w-20 rounded-full"
          />
          <p className="text-black">{participant1_name}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black text-2xl font-bold">
            {participant1_win_set_count} : {participant2_win_set_count}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={participant2_image}
            alt="user"
            className="h-20 w-20 rounded-full"
          />
          <p className="text-black">{participant2_name}</p>
        </div>
      </div>
      {isOpen && (
        <MatchScoreModalSingles
          isOpen={isOpen}
          singlesMatch={singlesMatch}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default MatchProfileSingles;
