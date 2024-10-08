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
  return (
    <div className="flex justify-center space-x-40">
      <div className="flex items-center gap-8">
        <img src={image} alt="userImg" className="w-16 h-16 rounded-full" />
        <p className="text-gray-400">{name}</p>
        <p>{getTierWithEmoji(leagueRecordInfoResponse.tier)}</p>
      </div>
      <div className="flex items-center gap-8 relative">
        <p className="text-gray-400">
          {leagueRecordInfoResponse.matchCount}전 |{" "}
          {leagueRecordInfoResponse.winCount}승 |{" "}
          {leagueRecordInfoResponse.drawCount}무 |{" "}
          {leagueRecordInfoResponse.loseCount}패
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
