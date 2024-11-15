import type { MatchParticipant } from "@/types/matchTypes";
import { getTierWithEmoji } from "@/utils/getTier";
import React from "react";

interface MatchPlayerBlockProps extends MatchParticipant {}

function MatchPlayerBlock({
  image,
  name,
  tier,
  participant_win_set_count,
}: MatchPlayerBlockProps) {
  console.log(name);
  return (
    <div className="flex items-center justify-between gap-3 p-2 rounded-sm bg-gray-700 w-60 h-11">
      {name ? (
        <>
          <div className="flex items-center gap-3 ">
            <img
              src={image}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-500"
            />
            <div className="flex-1 flex justify-center items-center gap-2">
              <span className="block text-sm font-semibold text-gray-200 truncate">
                {name} {getTierWithEmoji(tier || "")}
              </span>
            </div>
          </div>
          <span className="text-lg font-semibold text-blue-300">
            {participant_win_set_count}
          </span>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <span className="text-lg font-semibold text-blue-300">-</span>
        </div>
      )}
    </div>
  );
}

export default MatchPlayerBlock;
