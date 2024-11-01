import { Handle, Position } from "@xyflow/react";
import PlayerNode, { type Player } from "./MatchPlayerBlock";

export type CustomNodeData = {
  player1: Player;
  player2: Player;
};

interface MatchNodeProps {
  data: CustomNodeData;
}

// TODO: Handle에 관해 알아보기
function MatchNode({ data }: MatchNodeProps) {
  return (
    <div>
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
      <PlayerNode {...data.player1} />
      <PlayerNode {...data.player2} />
    </div>
  );
}

export default MatchNode;
