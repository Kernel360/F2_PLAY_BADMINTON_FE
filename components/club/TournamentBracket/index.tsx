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
  const matchSpacingY = 150; // Vertical spacing within the same round

  if (data.singles_match_response_list) {
    let y = 0;
    for (
      let index = 0;
      index < data.singles_match_response_list.length;
      index++
    ) {
      const prevMatch = data.singles_match_response_list[index - 1];
      const match = data.singles_match_response_list[index];
      if (!match) {
        continue;
      }

      if (prevMatch && prevMatch.round_number !== match.round_number) {
        y = match.round_number ?? 0 * matchSpacingY;
      }

      const { match_id, round_number, participant1, participant2 } = match;
      y += matchSpacingY;

      transformedData.push({
        id: index.toString(),
        data: {
          player1: {
            image: participant1?.image || "/images/dummy-image.jpg",
            name: participant1?.name,
            tier: participant1?.tier,
            participant_win_set_count: participant1?.participant_win_set_count,
          },
          player2: {
            image: participant2?.image || "/images/dummy-image.jpg",
            name: participant2?.name,
            tier: participant2?.tier,
            participant_win_set_count: participant2?.participant_win_set_count,
          },
        },
        position: {
          x: (round_number ?? 0 - 1) * matchSpacingX,
          y: y,
        },
        type: "match",
      });
    }
  }

  return transformedData;
}

function generateEdges(data: MatchBracketData) {
  const edges: Edge[] = [];

  if (data.singles_match_response_list) {
    for (
      let index = 0;
      index < data.singles_match_response_list.length;
      index++
    ) {
      const match = data.singles_match_response_list[index];
      if (!match) {
        continue;
      }

      edges.push({
        id: index.toString(),
        source: index.toString(),
        target: "8",
        type: "smoothstep",
      });
    }
  }
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
