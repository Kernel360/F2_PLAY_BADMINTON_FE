import TierBadge from "@/components/liveMatch/TierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Tier } from "@/types/commonTypes";
import type { MatchParticipantType } from "@/types/matchTypes";

interface PlayerProfileProps {
  player: MatchParticipantType;
}

function PlayerProfile({ player }: PlayerProfileProps) {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={player.image} alt={player.name} />
        <AvatarFallback>{player.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex gap-2 items-center">
        <TierBadge tier={player.tier as Tier} />
        <p className="text-sm font-medium leading-none">{player.name}</p>
      </div>
    </div>
  );
}

export default PlayerProfile;
