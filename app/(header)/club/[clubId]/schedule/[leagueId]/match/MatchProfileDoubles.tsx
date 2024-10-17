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
    <div className="flex items-center justify-center">
      <div className="flex rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 items-center w-[500px] p-4 justify-between shadow-lg">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <img
              src={doublesMatch?.team1?.participant1_image}
              alt={doublesMatch?.team1?.participant1_name}
              className="h-20 w-20 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            <p className="text-gray-700 font-semibold">
              {doublesMatch?.team1?.participant1_name}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src={doublesMatch?.team1?.participant2_image}
              alt={doublesMatch?.team1?.participant2_name}
              className="h-20 w-20 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            <p className="text-gray-700 font-semibold">
              {doublesMatch?.team1?.participant2_name}
            </p>
          </div>
        </div>
        <p className="text-indigo-600 text-2xl font-bold mx-4">1 vs 1</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <img
              src={doublesMatch?.team2?.participant1_image}
              alt={doublesMatch?.team2?.participant1_name}
              className="h-20 w-20 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
            <p className="text-gray-700 font-semibold">
              {doublesMatch?.team2?.participant1_name}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src={doublesMatch?.team2?.participant2_image}
              alt={doublesMatch?.team2?.participant2_name}
              className="h-20 w-20 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
            <p className="text-gray-700 font-semibold">
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
