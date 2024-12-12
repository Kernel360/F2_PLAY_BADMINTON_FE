import SImage from "@/components/ui/Image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
            className="p-4 rounded-lg w-full flex flex-col justify-center items-center border border-solid border-gray-300 cursor-pointer"
          >
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm">
              round {match.round_number}
            </Badge>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <SImage
                  src={match.participant1?.image || "/images/dummy-image.jpg"}
                  radius="circular"
                  width={45}
                  height={45}
                  alt="profile"
                />
                <span className="text-gray-800 text-sm font-semibold truncate">
                  {match.participant1?.name}
                </span>
              </div>
              <span className="text-gray-900 font-bold text-lg">
                {match.participant1?.participant_win_set_count} :{" "}
                {match.participant2?.participant_win_set_count}
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-gray-800 text-sm font-semibold ">
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

      {nodeData.match_type === "DOUBLES" &&
        nodeData.doubles_match_response_list?.map((match) => (
          <div key={match.match_id} className="flex flex-col gap-8">
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm flex justify-center">
              round {match.round_number}
            </Badge>
            <div className="flex flex-col items-center gap-6">
              <div className="w-full flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                  <SImage
                    src={
                      match.team1.participant1.image ||
                      "/images/dummy-image.jpg"
                    }
                    radius="circular"
                    width={50}
                    height={50}
                    alt={match.team1.participant1.name}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                          {match.team1.participant1.name || ""}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{match.team1.participant1.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                  <SImage
                    src={
                      match.team1.participant2.image ||
                      "/images/dummy-image.jpg"
                    }
                    radius="circular"
                    width={50}
                    height={50}
                    alt={match.team1.participant2.name}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                          {match.team1.participant2.name || ""}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{match.team1.participant2.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-2 text-xl font-semibold text-gray-900">
                <span>{match.team1.team1_win_set_count}</span>
                <Separator />
                <span>{match.team2.team1_win_set_count}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-full flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                  <SImage
                    src={
                      match.team2.participant1.image ||
                      "/images/dummy-image.jpg"
                    }
                    radius="circular"
                    width={50}
                    height={50}
                    alt={match.team2.participant1.name}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                          {match.team2.participant1.name || ""}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{match.team2.participant1.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                  <SImage
                    src={
                      match.team2.participant2.image ||
                      "/images/dummy-image.jpg"
                    }
                    radius="circular"
                    width={50}
                    height={50}
                    alt={match.team2.participant2.name}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                          {match.team2.participant2.name || ""}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{match.team2.participant2.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FreeBracket;
