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
import type { components } from "@/schemas/schema";
import type { GetMatchesData, MatchParticipant } from "@/types/matchTypes";

// SinglesMatchResponse는 participant1, participant2만 있음
type SinglesMatch = components["schemas"]["SinglesMatchResponse"] & {
  match_type: "SINGLE";
  participant1: MatchParticipant;
  participant2: MatchParticipant;
};

// DoublesMatchResponse는 team1, team2가 있음
type DoublesMatch = components["schemas"]["DoublesMatchResponse"] & {
  match_type: "DOUBLE";
  team1: MatchTeamResponse;
  team2: MatchTeamResponse;
};

type Match = SinglesMatch | DoublesMatch;

interface MatchTeamResponse {
  participant1: MatchParticipant;
  participant2: MatchParticipant;
  team1_win_set_count: number;
}

function transformSinglesMatch(
  match: SinglesMatch,
  roundX: number,
  yPosition: number,
) {
  const { match_id, participant1, participant2 } = match;

  return {
    id: match_id?.toString() || "",
    data: {
      team1: [participant1],
      team2: [participant2],
    },
    position: {
      x: roundX,
      y: yPosition,
    },
    type: "match",
  };
}

function transformDoublesMatch(
  match: DoublesMatch,
  roundX: number,
  yPosition: number,
) {
  const { match_id, team1, team2 } = match;

  const team1Arr: MatchParticipant[] = [team1.participant1, team1.participant2];
  const team2Arr: MatchParticipant[] = [team2.participant1, team2.participant2];

  return {
    id: match_id?.toString() || "",
    data: {
      team1: team1Arr,
      team2: team2Arr,
    },
    position: {
      x: roundX,
      y: yPosition,
    },
    type: "match",
  };
}

function transformMatchData(data: GetMatchesData) {
  const transformedData: Node<CustomNodeData>[] = [];
  const matchSpacingX = 480; // Horizontal spacing between rounds
  const matchSpacingY = 300; // Vertical spacing between matches

  const matchResponseList =
    data?.singles_match_response_list ?? data?.doubles_match_response_list;

  if (!matchResponseList) {
    return [];
  }

  const rounds = matchResponseList.reduce(
    (acc, match) => {
      const round = match.round_number ?? 1;
      if (!acc[round]) acc[round] = [];

      // Add match_type based on the data structure
      let matchWithType = { ...(match as Match) };

      if (data.singles_match_response_list) {
        matchWithType = {
          ...match,
          match_type: "SINGLE",
        } as SinglesMatch;
      } else {
        matchWithType = {
          ...match,
          match_type: "DOUBLE",
        } as DoublesMatch;
      }

      acc[round].push(matchWithType);
      return acc;
    },
    {} as Record<number, Match[]>,
  );

  let previousRoundYPositions: number[] = [];

  for (const [roundNumber, matches] of Object.entries(rounds)) {
    const round = Number.parseInt(roundNumber);
    const roundX = (round - 1) * matchSpacingX;

    if (round === 1) {
      // Calculate total height for the current round
      const totalHeight = matches.length * matchSpacingY;
      const startY = (totalHeight / 2) * -1;

      previousRoundYPositions = matches.map(
        (_, index) => startY + index * matchSpacingY,
      );

      for (let index = 0; index < matches.length; index++) {
        const match = matches[index];

        if (!match) continue;

        const yPosition = previousRoundYPositions[index] || 0;

        // Handle both Singles and Doubles match separately
        if (match.match_type === "DOUBLE") {
          transformedData.push(transformDoublesMatch(match, roundX, yPosition));
        } else {
          transformedData.push(transformSinglesMatch(match, roundX, yPosition));
        }
      }
    } else {
      const currentRoundYPositions: number[] = [];

      for (let index = 0; index < matches.length; index++) {
        const match = matches[index];

        if (!match) continue;

        const yPosition =
          ((previousRoundYPositions[index * 2] ?? 0) +
            (previousRoundYPositions[index * 2 + 1] ?? 0)) /
          2;

        // Handle both Singles and Doubles match separately
        if (match.match_type === "DOUBLE") {
          transformedData.push(transformDoublesMatch(match, roundX, yPosition));
        } else {
          transformedData.push(transformSinglesMatch(match, roundX, yPosition));
        }

        currentRoundYPositions.push(yPosition);
      }

      previousRoundYPositions = currentRoundYPositions;
    }
  }

  return transformedData;
}

function generateEdges(data: GetMatchesData) {
  const edges: Edge[] = [];

  // singles_match_response_list 처리
  const singlesRounds = data?.singles_match_response_list?.reduce(
    (acc, match) => {
      const round = match.round_number ?? 1;
      if (!acc[round]) acc[round] = [];
      acc[round].push(match);
      return acc;
    },
    {} as Record<number, typeof data.singles_match_response_list>, // 여기를 명시적으로 지정
  );

  // doubles_match_response_list 처리
  const doublesRounds = data?.doubles_match_response_list?.reduce(
    (acc, match) => {
      const round = match.round_number ?? 1;
      if (!acc[round]) acc[round] = [];
      acc[round].push(match);
      return acc;
    },
    {} as Record<number, typeof data.doubles_match_response_list>, // 여기를 명시적으로 지정
  );

  if (!singlesRounds && !doublesRounds) return edges;

  // singles_rounds에 대한 엣지 처리
  if (singlesRounds) {
    for (const roundNumber of Object.keys(singlesRounds)) {
      const currentRound = Number(roundNumber);
      const nextRound = currentRound + 1;

      // currentRoundMatches가 undefined일 경우 빈 배열로 처리
      const currentRoundMatches = singlesRounds[currentRound] || [];

      if (singlesRounds[nextRound]) {
        currentRoundMatches.forEach((match, index) => {
          const nextMatchIndex = Math.floor(index / 2);
          const targetMatch = singlesRounds[nextRound]?.[nextMatchIndex];

          if (targetMatch) {
            edges.push({
              id: `e${match.match_id}-${targetMatch.match_id}`,
              source: match.match_id.toString(),
              target: targetMatch.match_id.toString(),
              type: "smoothstep",
            });
          }
        });
      }
    }
  }

  // doubles_rounds에 대한 엣지 처리
  if (doublesRounds) {
    for (const roundNumber of Object.keys(doublesRounds)) {
      const currentRound = Number(roundNumber);
      const nextRound = currentRound + 1;

      const currentRoundMatches = doublesRounds[currentRound] || [];

      if (doublesRounds[nextRound]) {
        currentRoundMatches.forEach((match, index) => {
          const nextMatchIndex = Math.floor(index / 2);
          const targetMatch = doublesRounds[nextRound]?.[nextMatchIndex];

          if (targetMatch) {
            // DoublesMatch일 경우
            edges.push({
              id: `e${match.match_id}-team1-${targetMatch.match_id}-team1`,
              source: match.match_id.toString(),
              target: targetMatch.match_id.toString(),
              type: "smoothstep",
            });

            edges.push({
              id: `e${match.match_id}-team2-${targetMatch.match_id}-team2`,
              source: match.match_id.toString(),
              target: targetMatch.match_id.toString(),
              type: "smoothstep",
            });
          }
        });
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
