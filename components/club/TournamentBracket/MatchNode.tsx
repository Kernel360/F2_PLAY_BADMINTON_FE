import type { MatchParticipant } from "@/types/matchTypes";
import { Handle, Position } from "@xyflow/react";
import MatchPlayerBlock from "./MatchPlayerBlock";

export type CustomNodeData = {
  player1: MatchParticipant;
  player2: MatchParticipant;
};

interface MatchNodeProps {
  data: CustomNodeData;
}

// TODO: Handle에 관해 알아보기
function MatchNode({ data }: MatchNodeProps) {
  return (
    <div>
      <MatchPlayerBlock {...data.player1} />
      <MatchPlayerBlock {...data.player2} />
      <Handle type="source" position={Position.Right} id="Right" />
      <Handle type="target" position={Position.Left} id="Left" />
    </div>
  );
}

export default MatchNode;
