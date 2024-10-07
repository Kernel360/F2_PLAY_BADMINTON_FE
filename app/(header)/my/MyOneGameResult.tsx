import React from "react";

interface Match {
  id: number;
  opponentName: string;
  result: string;
  matchDate: string;
}

function MyOneGameResult({ match }: { match: Match }) {
  console.log(match.result);
  const ResultColor = () => {
    if (match.result === "WIN") {
      return (
        <div className="flex justify-between border border-blue-600 p-4 rounded-md text-black bg-blue-300">
          <p className="text-lg font-bold">vs {match.opponentName}</p>
          <p className="text-lg font-bold">{match.result}</p>
          <p className="text-lg font-bold">{match.matchDate}</p>
        </div>
      );
    }

    return (
      <div className="flex justify-between border border-red-600 p-4 rounded-md text-black bg-red-300">
        <p className="text-lg font-bold">vs {match.opponentName}</p>
        <p className="text-lg font-bold">{match.result}</p>
        <p className="text-lg font-bold">{match.matchDate}</p>
      </div>
    );
  };

  return <ResultColor />;
}

export default MyOneGameResult;
