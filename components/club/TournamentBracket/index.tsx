"use client";
import MatchNode, {
  type CustomNodeData,
} from "@/components/club/TournamentBracket/MatchNode";
import {
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
} from "@xyflow/react";
import React, { useMemo } from "react";

import "@xyflow/react/dist/style.css";
import type { GetMatchesData } from "@/types/matchTypes";

function transformMatchData(data: GetMatchesData) {
  const transformedData: Node<CustomNodeData>[] = [];
  const matchSpacingX = 480; // Horizontal spacing between rounds
  const matchSpacingY = 150; // Vertical spacing between matches

  if (data?.singles_match_response_list) {
    const rounds = data.singles_match_response_list.reduce(
      (acc, match) => {
        const round = match.round_number ?? 1;
        if (!acc[round]) acc[round] = [];
        acc[round].push(match);
        return acc;
      },
      {} as Record<number, typeof data.singles_match_response_list>,
    );

    let previousRoundYPositions: number[] = [];

    for (const [roundNumber, matches] of Object.entries(rounds)) {
      const round = Number.parseInt(roundNumber);
      const roundX = (round - 1) * matchSpacingX;

      if (round === 1) {
        // 현재 라운드 매치의 총 높이
        const totalHeight = matches.length * matchSpacingY;
        const startY = (totalHeight / 2) * -1;

        previousRoundYPositions = matches.map(
          (_, index) => startY + index * matchSpacingY,
        );

        for (let index = 0; index < matches.length; index++) {
          const match = matches[index];

          if (!match) continue;

          const { match_id, participant1, participant2 } = match;

          transformedData.push({
            id: match_id?.toString() || "",
            data: {
              player1: {
                image: participant1?.image || "/images/dummy-image.jpg",
                name: participant1?.name,
                tier: participant1?.tier,
                participant_win_set_count:
                  participant1?.participant_win_set_count,
              },
              player2: {
                image: participant2?.image || "/images/dummy-image.jpg",
                name: participant2?.name,
                tier: participant2?.tier,
                participant_win_set_count:
                  participant2?.participant_win_set_count,
              },
            },
            position: {
              x: roundX,
              y: previousRoundYPositions[index] || 0,
            },
            type: "match",
          });
        }
      } else {
        const currentRoundYPositions: number[] = [];

        for (let index = 0; index < matches.length; index++) {
          const match = matches[index];

          if (!match) continue;

          const { match_id, participant1, participant2 } = match;

          const yPosition =
            ((previousRoundYPositions[index * 2] ?? 0) +
              (previousRoundYPositions[index * 2 + 1] ?? 0)) /
            2;

          transformedData.push({
            id: match_id?.toString() || "",
            data: {
              player1: {
                image: participant1?.image || "/images/dummy-image.jpg",
                name: participant1?.name,
                tier: participant1?.tier,
                participant_win_set_count:
                  participant1?.participant_win_set_count,
              },
              player2: {
                image: participant2?.image || "/images/dummy-image.jpg",
                name: participant2?.name,
                tier: participant2?.tier,
                participant_win_set_count:
                  participant2?.participant_win_set_count,
              },
            },
            position: {
              x: roundX,
              y: yPosition,
            },
            type: "match",
          });

          currentRoundYPositions.push(yPosition);
        }

        previousRoundYPositions = currentRoundYPositions;
      }
    }

    return transformedData;
  }
  return [];
}

function generateEdges(data: GetMatchesData) {
  const edges: Edge[] = [];

  if (data?.singles_match_response_list) {
    const rounds = data.singles_match_response_list.reduce(
      (acc, match) => {
        const round = match.round_number ?? 1;
        if (!acc[round]) acc[round] = [];
        acc[round].push(match);
        return acc;
      },
      {} as Record<number, typeof data.singles_match_response_list>,
    );

    for (const roundNumber of Object.keys(rounds)) {
      const currentRound = Number.parseInt(roundNumber);
      const nextRound = currentRound + 1;

      if (rounds[nextRound]) {
        const currentRoundMatches = Object.entries(rounds[currentRound] || []);

        for (const [index, match] of currentRoundMatches) {
          const nextMatchIndex = Math.floor(Number(index) / 2);
          const targetMatch = rounds[nextRound]?.[nextMatchIndex];

          if (targetMatch) {
            edges.push({
              id: `e${match.match_id}-${targetMatch.match_id}`,
              source: match.match_id?.toString() || "",
              target: targetMatch.match_id?.toString() || "",
              type: "smoothstep",
            });
          }
        }
      }
    }
  }

  return edges;
}

interface TournamentBracketProps {
  nodeData: GetMatchesData;
}

export default function TournamentBracket(props: TournamentBracketProps) {
  const { nodeData } = props;

  const initialNodes: Node<CustomNodeData>[] = transformMatchData(
    nodeData as GetMatchesData,
  );

  // TODO: initialEdges 정의하기
  const initialEdges: Edge[] = generateEdges(nodeData as GetMatchesData);

  const nodeTypes = useMemo(() => ({ match: MatchNode }), []);

  return (
    <div className="w-full h-[65vh] bg-gray-900 rounded-md">
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
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
