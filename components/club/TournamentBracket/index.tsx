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
import type { MatchBracketData } from "@/types/matchTypes";

const mockData = {
  league_id: 6,
  match_generation_type: "TOURNAMENT",
  match_type: "SINGLES",
  league_status: "FINISHED",
  total_round: 4,
  singles_match_response_list: [
    // Round 1 (8 matches)
    {
      match_id: 1,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_1",
        name: "참가자1",
        image: "/images/profile1.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_2",
        name: "참가자2",
        image: "/images/profile2.jpg",
        tier: "BRONZE",
        participant_win_set_count: 0,
      },
      winner_token: "me_token_1",
    },
    {
      match_id: 2,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_3",
        name: "참가자3",
        image: "/images/profile3.jpg",
        tier: "SILVER",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_4",
        name: "참가자4",
        image: "/images/profile4.jpg",
        tier: "SILVER",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_3",
    },
    {
      match_id: 3,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_5",
        name: "참가자5",
        image: "/images/profile5.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_6",
        name: "참가자6",
        image: "/images/profile6.jpg",
        tier: "GOLD",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_5",
    },
    {
      match_id: 4,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_7",
        name: "참가자7",
        image: "/images/profile7.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_8",
        name: "참가자8",
        image: "/images/profile8.jpg",
        tier: "SILVER",
        participant_win_set_count: 0,
      },
      winner_token: "me_token_7",
    },
    {
      match_id: 5,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_9",
        name: "참가자9",
        image: "/images/profile9.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_10",
        name: "참가자10",
        image: "/images/profile10.jpg",
        tier: "BRONZE",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_9",
    },
    {
      match_id: 6,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_11",
        name: "참가자11",
        image: "/images/profile11.jpg",
        tier: "SILVER",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_12",
        name: "참가자12",
        image: "/images/profile12.jpg",
        tier: "GOLD",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_11",
    },
    {
      match_id: 7,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_13",
        name: "참가자13",
        image: "/images/profile13.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_14",
        name: "참가자14",
        image: "/images/profile14.jpg",
        tier: "SILVER",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_13",
    },
    {
      match_id: 8,
      round_number: 1,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_15",
        name: "참가자15",
        image: "/images/profile15.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_16",
        name: "참가자16",
        image: "/images/profile16.jpg",
        tier: "GOLD",
        participant_win_set_count: 0,
      },
      winner_token: "me_token_15",
    },

    // Round 2 (4 matches)
    {
      match_id: 9,
      round_number: 2,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_1",
        name: "참가자1",
        image: "/images/profile1.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_3",
        name: "참가자3",
        image: "/images/profile3.jpg",
        tier: "SILVER",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_1",
    },
    {
      match_id: 10,
      round_number: 2,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_5",
        name: "참가자5",
        image: "/images/profile5.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_7",
        name: "참가자7",
        image: "/images/profile7.jpg",
        tier: "BRONZE",
        participant_win_set_count: 0,
      },
      winner_token: "me_token_5",
    },
    {
      match_id: 11,
      round_number: 2,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_9",
        name: "참가자9",
        image: "/images/profile9.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_11",
        name: "참가자11",
        image: "/images/profile11.jpg",
        tier: "SILVER",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_9",
    },
    {
      match_id: 12,
      round_number: 2,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_13",
        name: "참가자13",
        image: "/images/profile13.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_15",
        name: "참가자15",
        image: "/images/profile15.jpg",
        tier: "BRONZE",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_13",
    },

    // Round 3 (2 matches)
    {
      match_id: 13,
      round_number: 3,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_1",
        name: "참가자1",
        image: "/images/profile1.jpg",
        tier: "BRONZE",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_5",
        name: "참가자5",
        image: "/images/profile5.jpg",
        tier: "GOLD",
        participant_win_set_count: 1,
      },
      winner_token: "me_token_1",
    },
    {
      match_id: 14,
      round_number: 3,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_9",
        name: "참가자9",
        image: "/images/profile9.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      participant2: {
        member_token: "me_token_13",
        name: "참가자13",
        image: "/images/profile13.jpg",
        tier: "BRONZE",
        participant_win_set_count: 0,
      },
      winner_token: "me_token_9",
    },

    // Round 4 (Final)
    {
      match_id: 15,
      round_number: 4,
      match_status: "FINISHED",
      participant1: {
        member_token: "me_token_1",
        name: "참가자1",
        image: "/images/profile1.jpg",
        tier: "BRONZE",
        participant_win_set_count: 3,
      },
      participant2: {
        member_token: "me_token_9",
        name: "참가자9",
        image: "/images/profile9.jpg",
        tier: "GOLD",
        participant_win_set_count: 2,
      },
      winner_token: "me_token_1",
    },
  ],
};

// TODO: posiiton은 library 사용해서 정해보기
// const initialNodes: Node<CustomNodeData>[] = [
//   {
//     id: "1",
//     data: {
//       player1: {
//         image: "/images/dummy-image.jpg",
//         name: "윤예진",
//         tier: "BRONZE",
//         participant_win_set_count: 0,
//       },
//       player2: {
//         image: "/images/dummy-image.jpg",
//         name: "이강민",
//         tier: "BRONZE",
//         participant_win_set_count: 4,
//       },
//     },
//     position: { x: 5, y: 5 },
//     type: "match",
//   },
//   {
//     id: "2",
//     data: {
//       player1: {
//         image: "/images/dummy-image.jpg",
//         name: "윤예진2",
//         tier: "SILVER",
//         participant_win_set_count: 0,
//       },
//       player2: {
//         image: "/images/dummy-image.jpg",
//         name: "이강민2",
//         tier: "SILVER",
//         participant_win_set_count: 4,
//       },
//     },
//     position: { x: 5, y: 155 },
//     type: "match",
//   },
//   {
//     id: "3",
//     data: {
//       player1: {
//         image: "/images/dummy-image.jpg",
//         name: "윤예진3",
//         tier: "BRONZE",
//         participant_win_set_count: 0,
//       },
//       player2: {
//         image: "/images/dummy-image.jpg",
//         name: "이강민3",
//         tier: "BRONZE",
//         participant_win_set_count: 4,
//       },
//     },
//     position: { x: 485, y: 80 },
//     type: "match",
//   },
// ];

function transformMatchData(data: MatchBracketData) {
  const transformedData: Node<CustomNodeData>[] = [];
  const matchSpacingX = 480; // Horizontal spacing between rounds
  const matchSpacingY = 150; // Vertical spacing between matches

  if (data.singles_match_response_list) {
    // Group matches by rounds
    const rounds = data.singles_match_response_list.reduce(
      (acc, match) => {
        const round = match.round_number ?? 1;
        if (!acc[round]) acc[round] = [];
        acc[round].push(match);
        return acc;
      },
      {} as Record<number, typeof data.singles_match_response_list>,
    );

    for (const [roundNumber, matches] of Object.entries(rounds)) {
      const round = Number.parseInt(roundNumber);
      const roundX = (round - 1) * matchSpacingX;
      const totalHeight = matches.length * matchSpacingY;
      const startY = (totalHeight / 2) * -1; // Center the nodes vertically

      for (let index = 0; index < matches.length; index++) {
        const match = matches[index];

        if (!match) {
          continue;
        }
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
            y: startY + index * matchSpacingY,
          },
          type: "match",
        });
      }
    }

    return transformedData;
  }
}

function generateEdges(data: MatchBracketData) {
  const edges: Edge[] = [];

  if (data.singles_match_response_list) {
    // Group matches by rounds
    const rounds = data.singles_match_response_list.reduce(
      (acc, match) => {
        const round = match.round_number ?? 1;
        if (!acc[round]) acc[round] = [];
        acc[round].push(match);
        return acc;
      },
      {} as Record<number, typeof data.singles_match_response_list>,
    );

    // Loop through each round to create edges to the next round
    for (const roundNumber of Object.keys(rounds)) {
      const currentRound = Number.parseInt(roundNumber);
      const nextRound = currentRound + 1;

      // Ensure there is a next round to connect to
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

const initialNodes: Node<CustomNodeData>[] = transformMatchData(
  mockData as MatchBracketData,
);

// TODO: initialEdges 정의하기
const initialEdges: Edge[] = generateEdges(mockData as MatchBracketData);

// const initialEdges: Edge[] = [
//   {
//     id: "e1-3",
//     source: "1",
//     target: "3",
//     type: "smoothstep",
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     target: "3",
//     type: "smoothstep",
//   },
// ];

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
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
