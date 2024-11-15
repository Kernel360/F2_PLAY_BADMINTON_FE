import SImage from "@/components/ui/Image";
import { Badge } from "@/components/ui/badge";
import type { GetMatchesData } from "@/types/matchTypes";
import React from "react";

interface FreeBracketProps {
  nodeData: GetMatchesData;
}

function FreeBracket(props: FreeBracketProps) {
  const { nodeData } = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {nodeData.match_type === "SINGLES" &&
        nodeData.singles_match_response_list?.map((match) => (
          <div
            key={match.match_id}
            className="p-4 rounded-lg w-full flex flex-col justify-center items-center border border-solid border-gray-300 "
          >
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm">
              {match.round_number}
            </Badge>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center space-x-3">
                <SImage
                  src={match.participant1?.image || "/images/dummy-image.jpg"}
                  radius="circular"
                  width={45}
                  height={45}
                  alt="profile"
                />
                <span className="text-gray-800 text-sm font-semibold">
                  {match.participant1?.name}
                </span>
              </div>
              <span className="text-gray-900 font-bold text-lg">
                {match.participant1?.participant_win_set_count} :{" "}
                {match.participant2?.participant_win_set_count}
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-gray-800 text-sm font-semibold">
                  {match.participant2?.name}
                </span>
                <SImage
                  src={match.participant2?.image || "images/dummy-image.jpg"}
                  radius="circular"
                  width={45}
                  height={45}
                  alt="profile"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FreeBracket;
