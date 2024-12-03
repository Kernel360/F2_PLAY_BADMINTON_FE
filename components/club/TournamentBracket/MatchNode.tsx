import { Separator } from "@/components/ui/separator";
import type { MatchParticipant } from "@/types/matchTypes";
import { Handle, Position } from "@xyflow/react";
import MatchPlayerBlock from "./MatchPlayerBlock";

export type CustomNodeData = {
  team1: MatchParticipant[];
  team2: MatchParticipant[];
};

interface MatchNodeProps {
  data: CustomNodeData;
}

// TODO: Handle에 관해 알아보기
function MatchNode({ data }: MatchNodeProps) {
  const team1Score = data.team1[0]?.participant_win_set_count || 0;
  const team2Score = data.team2[0]?.participant_win_set_count || 0;

  return (
    <div className="cursor-pointer">
      <div className="flex bg-gray-700">
        <div>
          {data.team1.map((player) => {
            return <MatchPlayerBlock key={player?.member_token} {...player} />;
          })}
        </div>
        <span className="text-lg font-semibold text-blue-300 w-10 flex justify-center items-center">
          {team1Score}
        </span>
      </div>
      <Separator className="bg-gray-900" />
      <div className="flex bg-gray-700">
        <div>
          {data.team2.map((player) => {
            return <MatchPlayerBlock key={player?.member_token} {...player} />;
          })}
        </div>
        <span className="text-lg font-semibold text-blue-300 w-10 flex justify-center items-center">
          {team2Score}
        </span>
      </div>
      <Handle type="source" position={Position.Right} id="Right" />
      <Handle type="target" position={Position.Left} id="Left" />
    </div>
  );
}

export default MatchNode;
