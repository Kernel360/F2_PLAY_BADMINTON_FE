import type { MatchParticipantType } from "@/types/matchTypes";
import { getTierWithEmoji } from "@/utils/getTier";

type MatchParticipantProps = {
  participants: MatchParticipantType[];
  matchType: "SINGLES" | "DOUBLES";
};

function MatchParticipant({ participants, matchType }: MatchParticipantProps) {
  return (
    <div
      className={`w-full flex ${
        matchType === "DOUBLES"
          ? "flex-col md:flex-row items-center justify-center gap-6"
          : "flex-col items-center justify-center"
      }`}
    >
      {participants.map((participant) => (
        <div
          key={participant.name}
          className="w-fit flex flex-col items-center justify-center space-y-2 text-center"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={participant.image}
              alt={participant.name}
              className="object-cover w-20 h-20"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-800 text-sm sm:text-base">
              {getTierWithEmoji(participant.tier)} {participant.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchParticipant;
