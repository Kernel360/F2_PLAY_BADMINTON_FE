"use client";

import MemberInfo from "@/components/club/MemberInfo";
import { useGetClubMembers } from "@/lib/api/hooks/clubMemberHook";
import type { components } from "@/schemas/schema";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

type ClubMemberResponse = components["schemas"]["ClubMemberResponse"];

function ClubMember() {
  const { clubId } = useParams();
  const { data, isLoading } = useGetClubMembers(clubId as string);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>();

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  const members = [
    ...(data.role_owner ?? []),
    ...(data.role_manager ?? []),
    ...(data.role_user ?? []),
  ];

  return (
    <div className="h-[466px]">
      <div className="flex flex-col gap-5 h-full overflow-scroll">
        <div className="flex font-bold text-gray-600 bg-gray-100 p-2 rounded-md">
          <div className="flex-[1]">멤버</div>
          <div className="flex-[1]">직책</div>
          <div className="flex-[1]">티어</div>
          <div className="flex-[1]">전적</div>
        </div>
        {members.map((member) => (
          <MemberInfo
            key={member.club_member_id}
            memberData={member as ClubMemberResponse}
            isOpen={openDropdownIndex === member.club_member_id}
            onToggle={() => toggleDropdown(member.club_member_id as number)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClubMember;
