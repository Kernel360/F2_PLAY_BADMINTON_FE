import TierBadge from "@/components/liveMatch/TierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Tier } from "@/types/commonTypes";
import type { MatchParticipant } from "@/types/matchTypes";
import React from "react";

interface PlayerProfileProps {
  player: MatchParticipant;
}

function PlayerProfile({ player }: PlayerProfileProps) {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={player.image} alt={player.name} />
        <AvatarFallback>{player.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{player.name}</p>
        <TierBadge tier={player.tier as Tier} />
      </div>
    </div>
  );
}

export default PlayerProfile;
