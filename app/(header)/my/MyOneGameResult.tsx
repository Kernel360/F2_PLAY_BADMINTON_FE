import React from "react";

interface Match {
  id: number;
  opponentName: string;
  result: string;
  matchType: string;
  matchDate: string;
}

function MyOneGameResult({ match }: { match: Match }) {
  return (
    <div className="flex items-center p-2 h-12 text-black border-b-[1px]">
      <p className="flex-[2]">vs {match.opponentName}</p>
      <p className="flex-[1]">{match.matchType}</p>
      <p className="flex-[1]">{match.result}</p>
      <p className="flex-[1]">{match.matchDate}</p>
    </div>
  );
}

export default MyOneGameResult;
