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
        <div className="flex w-1/4 rounded-full bg-blue-300 text-blue-600 px-1 justify-center">
          {match.result}
        </div>
      );
    }
    return (
      <div className="flex w-1/3 rounded-full bg-red-300 text-red-600 justify-center">
        {match.result}
      </div>
    );
  };

  return (
    <div className="flex items-center p-2 h-12 text-black border-b-[1px]">
      <p className="flex-[2]">vs {match.opponentName}</p>
      <p className="flex-[1]">{match.matchType}</p>
      <div className="flex-[1]">
        <MatchResult />
      </div>
      <p className="flex-[1]">{match.matchDate}</p>
    </div>
  );
}

export default MyOneGameResult;
