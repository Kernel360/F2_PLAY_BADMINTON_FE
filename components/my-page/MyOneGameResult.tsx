import type { components } from "@/schemas/schema";
import { formatDate } from "date-fns";
import React from "react";

type MemberMatchRecord = components["schemas"]["MatchResultResponse"];

function MyOneGameResult({ match }: { match: MemberMatchRecord }) {
  const MatchResult = () => {
    if (
      match.singles_match?.current_player_result === "WIN" ||
      match.doubles_match?.current_team_result === "WIN"
    ) {
      return (
        <div className="flex w-1/4 py-1 rounded-full bg-blue-300 text-blue-600 text-sm justify-center">
          {match.singles_match?.current_player_result ||
            match.doubles_match?.current_team_result}
        </div>
      );
    }
    return (
      <div className="flex w-1/3 py-1 rounded-full bg-red-300 text-red-600 text-sm justify-center">
        {match.singles_match?.current_player_result ||
          match.doubles_match?.current_team_result}
      </div>
    );
  };

  return (
    <div className="flex items-center p-2 h-12 text-black border-b-[1px]">
      <div className="flex flex-[2] items-center gap-3">
        <p className="text-lg font-bold">vs</p>
        <p>
          {match.singles_match?.opponent_name}
          {match.doubles_match?.opponent_team_participant1_name}{" "}
          {match.doubles_match?.opponent_team_participant2_name}
        </p>
      </div>
      <p className="flex-[1]">
        {match.match_type === "SINGLES" ? "단식" : "복식"}
      </p>
      <div className="flex-[1]">
        <MatchResult />
      </div>
      <p className="flex-[1]">
        {match.league_at && formatDate(match.league_at, "yyyy-MM-dd")}
      </p>
    </div>
  );
}

export default MyOneGameResult;
