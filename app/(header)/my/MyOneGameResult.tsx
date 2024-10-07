import React from "react";

interface Match {
  id: number;
  opponentName: string;
  result: string;
  matchType: string;
  matchDate: string;
}

function MyOneGameResult({ match }: { match: Match }) {
  const MatchResult = () => {
    if (match.result === "WIN") {
      return (
        <div className="flex w-1/4 py-1 rounded-full bg-blue-300 text-blue-600 text-sm justify-center">
          {match.result}
        </div>
      );
    }
    return (
      <div className="flex w-1/3 py-1 rounded-full bg-red-300 text-red-600 text-sm justify-center">
        {match.result}
      </div>
    );
  };

  return (
    <div className="flex items-center p-2 h-12 text-black border-b-[1px]">
      <div className="flex flex-[2] items-center gap-3">
        <p className="text-lg font-bold">vs</p>
        <p>{match.opponentName}</p>
      </div>
      <p className="flex-[1]">{match.matchType}</p>
      <div className="flex-[1]">
        <MatchResult />
      </div>
      <p className="flex-[1]">{match.matchDate}</p>
    </div>
  );
}

export default MyOneGameResult;
