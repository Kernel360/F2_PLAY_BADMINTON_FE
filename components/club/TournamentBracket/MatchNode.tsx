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
  return (
    <div>
      {data.team1.map((player) => {
        return <MatchPlayerBlock key={player.member_token} {...player} />;
      })}

      {data.team2.map((player) => {
        return <MatchPlayerBlock key={player.member_token} {...player} />;
      })}

      <Handle type="source" position={Position.Right} id="Right" />
      <Handle type="target" position={Position.Left} id="Left" />
    </div>
  );
}

export default MatchNode;
