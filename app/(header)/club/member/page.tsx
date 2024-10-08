"use client";

import React, { useState } from "react";
import MemberInfo from "./MemberInfo";

const members = [
  {
    id: 1,
    name: "a",
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
    id: 2,
    name: "bb",
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
    id: 3,
    name: "ccc",
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
    id: 4,
    name: "dddd",
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
      <div className="flex flex-col gap-4 h-full overflow-scroll">
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
