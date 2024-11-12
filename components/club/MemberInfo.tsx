"use client";

import MemberDropDown from "@/components/club/MemberDropdown";
import IconButton from "@/components/ui/IconButton";
import type { components } from "@/schemas/schema";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { AlignJustify } from "lucide-react";

type ClubMemberResponse = components["schemas"]["ClubMemberResponse"];
// type LeagueRecordInfoResponse =
//   components["schemas"]["LeagueRecordInfoResponse"];

interface MemberInfoProps {
  memberData: ClubMemberResponse;
  isOpen: boolean; // 드롭다운 상태
  onToggle: () => void; // 드롭다운 토글 함수
}

function MemberInfo({ memberData, isOpen, onToggle }: MemberInfoProps) {
  // const { win_count, lose_count, draw_count, match_count } =
  // (memberData.league_record_info_response as LeagueRecordInfoResponse) || 0;

  const changeRoleWord = (role: string) => {
    switch (role) {
      case "ROLE_OWNER":
        return "회장";
      case "ROLE_MANAGER":
        return "매니저";
      case "ROLE_USER":
        return "회원";
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-[1] items-center gap-8">
        <img
          src={memberData.image}
          alt="userImg"
          className="w-16 h-16 rounded-full"
        />
        <p className="text-black">{memberData.name}</p>
      </div>
      <div className="flex flex-[1] items-center">
        <p className="text-black">{changeRoleWord(memberData.role ?? "")}</p>
      </div>
      <div className="flex flex-[1] items-center">
        <p className="text-black">
          {/* {getTierWithEmoji(memberData.tier as string)} */}
        </p>
      </div>
      <div className="flex flex-[1] items-center justify-between relative">
        <p className="text-black">
          {/* {match_count}전 | {win_count}승 | {draw_count}무 | {lose_count}패 */}
        </p>
        <IconButton size="sm" color="transparent" onClick={onToggle}>
          <AlignJustify width="80%" height="80%" className="text-gray-400" />
        </IconButton>
        {isOpen && (
          <MemberDropDown clubMemberId={memberData.club_member_id as number} />
        )}
      </div>
    </div>
  );
}

export default MemberInfo;
