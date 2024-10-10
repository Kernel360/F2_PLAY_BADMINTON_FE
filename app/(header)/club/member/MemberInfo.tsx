"use client";

import IconButton from "@/components/ui/IconButton";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { AlignJustify } from "lucide-react";
import React from "react";
import MemberDropDown from "./MemberDropdown";

interface LeagueRecordInfoResponse {
  winCount: number;
  loseCount: number;
  drawCount: number;
  matchCount: number;
  tier: string;
}

interface MemberInfoProps {
  image: string;
  name: string;
  leagueRecordInfoResponse: LeagueRecordInfoResponse;
  isOpen: boolean; // 드롭다운 상태
  onToggle: () => void; // 드롭다운 토글 함수
}

function MemberInfo({
  image,
  name,
  leagueRecordInfoResponse,
  isOpen,
  onToggle,
}: MemberInfoProps) {
  const { winCount, loseCount, drawCount, matchCount, tier } =
    leagueRecordInfoResponse;

  return (
    <div className="flex justify-center">
      <div className="flex flex-[1] items-center gap-8">
        <img src={image} alt="userImg" className="w-16 h-16 rounded-full" />
        <p className="text-black">{name}</p>
      </div>
      <div className="flex flex-[1] items-center">
        <p className="text-black">{getTierWithEmoji(tier)}</p>
      </div>
      <div className="flex flex-[1] items-center justify-between relative">
        <p className="text-black">
          {matchCount}전 | {winCount}승 | {drawCount}무 | {loseCount}패
        </p>
        <IconButton size="sm" color="transparent" onClick={onToggle}>
          <AlignJustify width="80%" height="80%" className="text-gray-400" />
        </IconButton>
        {isOpen && <MemberDropDown />}
      </div>
    </div>
  );
}

export default MemberInfo;
