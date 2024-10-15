"use client";

import IconButton from "@/components/ui/IconButton";
import type { components } from "@/schemas/schema";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { AlignJustify } from "lucide-react";
import React from "react";
import MemberDropDown from "./MemberDropdown";

type LeagueRecordInfoResponse =
  components["schemas"]["LeagueRecordInfoResponse"];

interface MemberInfoProps {
  image: string;
  name: string;
  role: string;
  leagueRecordInfoResponse: LeagueRecordInfoResponse;
  isOpen: boolean; // 드롭다운 상태
  onToggle: () => void; // 드롭다운 토글 함수
}

function MemberInfo({
  image,
  name,
  role,
  leagueRecordInfoResponse,
  isOpen,
  onToggle,
}: MemberInfoProps) {
  // const { win_count, lose_count, draw_count, match_count, tier } =
  //   leagueRecordInfoResponse;

  // const changeRoleWord = (roll: string) => {
  //   switch (roll) {
  //     case "ROLE_OWNER":
  //       return "회장";
  //     case "ROLE_MANAGER":
  //       return "매니저";
  //     case "ROLE_USER":
  //       return "회원";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div className="flex justify-center">
      {/* <div className="flex flex-[1] items-center gap-8">
        <img src={image} alt="userImg" className="w-16 h-16 rounded-full" />
        <p className="text-black">{name}</p>
      </div>
      <div className="flex flex-[1] items-center">
        <p className="text-black">{changeRoleWord(role)}</p>
      </div>
      <div className="flex flex-[1] items-center">
        <p className="text-black">{getTierWithEmoji(tier as string)}</p>
      </div>
      <div className="flex flex-[1] items-center justify-between relative">
        <p className="text-black">
          {match_count}전 | {win_count}승 | {draw_count}무 | {lose_count}패
        </p>
        <IconButton size="sm" color="transparent" onClick={onToggle}>
          <AlignJustify width="80%" height="80%" className="text-gray-400" />
        </IconButton>
        {isOpen && <MemberDropDown />}
      </div> */}
    </div>
  );
}

export default MemberInfo;
