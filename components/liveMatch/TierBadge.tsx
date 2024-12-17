import type { Tier } from "@/types/commonTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import React from "react";
import { Badge } from "../ui/badge";

interface TierBadgeProps {
  tier: Tier;
}

function TierBadge(props: TierBadgeProps) {
  const { tier } = props;
  if (tier === "GOLD") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-yellow-200 text-yellow-800"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }

  if (tier === "SILVER") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-gray-200 text-gray-700"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }

  if (tier === "BRONZE") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-orange-200 text-orange-800"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }
}

export default TierBadge;
