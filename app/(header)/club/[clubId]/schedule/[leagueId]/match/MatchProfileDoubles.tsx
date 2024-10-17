import type { components } from "@/schemas/schema";
import MatchScoreModalDoubles from "./MatchScoreModalDoubles";

type MatchResponse = components["schemas"]["MatchResponse"];

interface MatchProfileDoublesProps {
  doublesMatch: MatchResponse["doubles_match"];
  isOpen: boolean;
  onClose: () => void;
}

function MatchProfileDoubles({
  doublesMatch,
  isOpen,
  onClose,
}: MatchProfileDoublesProps) {
  return (
    <div className="flex">
      <div className="flex rounded-md bg-gray-200 items-center w-[450px] p-2 justify-between">
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-4">
            <img
              src={doublesMatch?.team1?.participant1_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">
              {doublesMatch?.team1?.participant1_name}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src={doublesMatch?.team1?.participant2_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">
              {doublesMatch?.team1?.participant2_name}
            </p>
          </div>
        </div>
        <p className="text-black text-xl font-bold">1 vs 1</p>
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-4">
            <img
              src={doublesMatch?.team2?.participant1_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">
              {doublesMatch?.team2?.participant1_name}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src={doublesMatch?.team2?.participant2_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">
              {doublesMatch?.team2?.participant2_name}
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <MatchScoreModalDoubles
          doublesMatch={doublesMatch}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
}
export default MatchProfileDoubles;
