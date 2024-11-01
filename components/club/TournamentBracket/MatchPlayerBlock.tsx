import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import React from "react";

export type Player = {
  imgUrl: string;
  name: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  score: number;
};

interface PlayerNodeProps extends Player {}

function PlayerNode({ imgUrl, name, tier, score }: PlayerNodeProps) {
  return (
    <div className="flex gap-2 border-gray-300 border">
      <img src={imgUrl} alt="profile" className="w-10 h-10 rounded-full" />
      <span>{name}</span>
      <span>{getTierWithEmoji(tier)}</span>
      <span>{score}</span>
    </div>
  );
}

export default PlayerNode;
