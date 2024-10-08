"use client";

import React, { useState } from "react";
import MemberInfo from "./MemberInfo";

const members = [
  {
    id: 1,
    name: "a",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 12,
      loseCount: 11,
      drawCount: 0,
      matchCount: 23,
      tier: "GOLD",
    },
  },
  {
    id: 2,
    name: "bb",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 33,
      loseCount: 2,
      drawCount: 0,
      matchCount: 35,
      tier: "SILVER",
    },
  },
  {
    id: 3,
    name: "ccc",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 100,
      loseCount: 150,
      drawCount: 0,
      matchCount: 250,
      tier: "BRONZE",
    },
  },
  {
    id: 4,
    name: "dddd",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "SILVER",
    },
  },
  {
    id: 5,
    name: "eeeee",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "GOLD",
    },
  },
  {
    id: 6,
    name: "ffffff",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "GOLD",
    },
  },
  {
    id: 7,
    name: "gggggggg",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "GOLD",
    },
  },
  {
    id: 8,
    name: "hhhhhhhh",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "GOLD",
    },
  },
  {
    id: 9,
    name: "iiiiiiiii",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "BRONZE",
    },
  },
  {
    id: 10,
    name: "jjjjjjjjjj",
    image: "/images/dummy-image.jpg",
    leagueRecordInfoResponse: {
      winCount: 0,
      loseCount: 0,
      drawCount: 0,
      matchCount: 0,
      tier: "SILVER",
    },
  },
];

function ClubMemberPage() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="h-[466px]">
      <div className="flex flex-col gap-5 h-full overflow-scroll">
        <div className="flex font-bold text-gray-600 bg-gray-100 p-2 rounded-md">
          <div className="flex-[1]">멤버</div>
          <div className="flex-[1]">티어</div>
          <div className="flex-[1]">전적</div>
        </div>
        {members.map((member) => (
          <MemberInfo
            key={member.id}
            isOpen={openDropdownIndex === member.id}
            image={member.image}
            name={member.name}
            leagueRecordInfoResponse={member.leagueRecordInfoResponse}
            onToggle={() => toggleDropdown(member.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClubMemberPage;
