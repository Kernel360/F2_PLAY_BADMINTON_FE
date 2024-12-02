import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MatchParticipant } from "@/types/matchTypes";
import React from "react";
import PlayerProfile from "./PlayerProfile";

function ParticipantSection({
  team,
  teamNumber,
}: {
  team: { participant1: MatchParticipant; participant2: MatchParticipant };
  teamNumber: number;
}) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Team {teamNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <PlayerProfile player={team.participant1} />
        <PlayerProfile player={team.participant2} />
      </CardContent>
    </Card>
  );
}

export default ParticipantSection;
