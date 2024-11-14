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
        image: "/images/dummy-image.jpg",
        name: "윤예진",
        tier: "BRONZE",
        participant_win_set_count: 0,
      },
      player2: {
        image: "/images/dummy-image.jpg",
        name: "이강민",
        tier: "BRONZE",
        participant_win_set_count: 4,
      },
    },
    position: { x: 5, y: 5 },
    type: "match",
  },
  {
    id: "2",
    data: {
      player1: {
        image: "/images/dummy-image.jpg",
        name: "윤예진2",
        tier: "SILVER",
        participant_win_set_count: 0,
      },
      player2: {
        image: "/images/dummy-image.jpg",
        name: "이강민2",
        tier: "SILVER",
        participant_win_set_count: 4,
      },
    },
    position: { x: 5, y: 155 },
    type: "match",
  },
  {
    id: "3",
    data: {
      player1: {
        image: "/images/dummy-image.jpg",
        name: "윤예진3",
        tier: "BRONZE",
        participant_win_set_count: 0,
      },
      player2: {
        image: "/images/dummy-image.jpg",
        name: "이강민3",
        tier: "BRONZE",
        participant_win_set_count: 4,
      },
    },
    position: { x: 485, y: 80 },
    type: "match",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
  },
];

export default function TournamentBracket() {
  const nodeTypes = useMemo(() => ({ match: MatchNode }), []);

  return (
    <div className="w-full h-[80vh] bg-gray-900">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
