"use client";
import MatchNode, {
  type CustomNodeData,
} from "@/components/club/TournamentBracket/MatchNode";
import { Controls, type Edge, type Node, ReactFlow } from "@xyflow/react";
import React, { useMemo } from "react";

import "@xyflow/react/dist/style.css";

// TODO: posiiton은 library 사용해서 정해보기
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    data: {
      player1: {
        imgUrl: "/images/dummy-image.jpg",
        name: "윤예진",
        tier: "BRONZE",
        score: 0,
      },
      player2: {
        imgUrl: "/images/dummy-image.jpg",
        name: "이강민",
        tier: "BRONZE",
        score: 4,
      },
    },
    position: { x: 5, y: 5 },
    type: "match",
  },
  {
    id: "2",
    data: {
      player1: {
        imgUrl: "/images/dummy-image.jpg",
        name: "윤예진1",
        tier: "BRONZE",
        score: 0,
      },
      player2: {
        imgUrl: "/images/dummy-image.jpg",
        name: "이강민2",
        tier: "BRONZE",
        score: 4,
      },
    },
    position: { x: 500, y: 5 },
    type: "match",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "2",
    // sourceHandle: "right",
    // targetHandle: "left",
    target: "1",
  },
];

export default function TournamentBracket() {
  const nodeTypes = useMemo(() => ({ match: MatchNode }), []);

  return (
    <div className="w-full h-[80vh]">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
