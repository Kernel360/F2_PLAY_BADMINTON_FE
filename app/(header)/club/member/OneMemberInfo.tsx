"use client";

import IconButton from "@/components/ui/IconButton";
import { AlignJustify } from "lucide-react";
import React from "react";
import MemberDropDown from "./MemberDropdown";

interface OneMemberInfoProps {
  isOpen: boolean; // 드롭다운 상태
  onToggle: () => void; // 드롭다운 토글 함수
}

function OneMemberInfo({ isOpen, onToggle }: OneMemberInfoProps) {
  return (
    <div className="flex justify-center space-x-40">
      <div className="flex items-center gap-8">
        <div className="w-20 h-20">
          <img
            src="/images/dummy-image.jpg"
            alt="member_image"
            className=" object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="w-8 h-8">
          <img src="/images/tier-gold.png" alt="member_tier" />
        </div>
        <p className="text-gray-400">멤버 이름</p>
      </div>
      <div className="flex items-center gap-8 relative">
        <p className="text-gray-400">00전 | 00승 | 00무 | 00패</p>
        <IconButton size="sm" color="transparent" onClick={onToggle}>
          <AlignJustify width="80%" height="80%" className="text-gray-400" />
        </IconButton>
        {isOpen && <MemberDropDown />}
      </div>
    </div>
  );
}

export default OneMemberInfo;
