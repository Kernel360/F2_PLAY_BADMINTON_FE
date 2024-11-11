import { getTierWithEmoji } from "@/utils/getTier";
import React from "react";

export type Player = {
  imgUrl: string;
  name: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  score: number;
};

interface MatchPlayerBlockProps extends Player {}

function MatchPlayerBlock({
  imgUrl,
  name,
  tier,
  score,
}: MatchPlayerBlockProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md border border-gray-300 shadow-sm bg-white w-56 hover:shadow-md transition-shadow">
      <img
        src={imgUrl}
        alt="profile"
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
      />
      <div className="flex-1 flex items-center gap-1">
        <span className="block text-xs text-gray-500">
          {getTierWithEmoji(tier)}
        </span>
        <span className="block text-sm font-medium text-gray-800 truncate">
          {name}
        </span>
      </div>
      <span className="text-lg font-bold text-gray-900">{score}</span>
    </div>
  );
}

export default MatchPlayerBlock;
