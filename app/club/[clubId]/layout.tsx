"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
// import { useGetIsClubMember } from "@/lib/api/hooks/memberHook";
import { headers } from "next/headers";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type React from "react";

function ClubLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const clubId = Number(params.clubId);

  const pathname = usePathname();
  const clubPath = pathname.split("/")[3];

  // const { data: isJoined } = useGetIsClubMember();

  const activeTab = () => {
    if (clubPath === undefined) return "intro";
    return clubPath;
  };

  return (
    <Tabs defaultValue={activeTab()} className="w-full max-w-5xl mt-10 ">
      <TabsList>
        <Link href={`/club/${clubId}`}>
          <TabsTrigger value="intro" color="gray">
            소개
          </TabsTrigger>
        </Link>

        {/* {isJoined?.club_ === clubId && ( */}
        <>
          <Link href={`/club/${clubId}/schedule`}>
            <TabsTrigger value="schedule" color="gray">
              일정
            </TabsTrigger>
          </Link>
          <Link href={`/club/${clubId}/member`}>
            <TabsTrigger value="member" color="gray">
              회원
            </TabsTrigger>
          </Link>
          {/* {isJoined?.role === "ROLE_OWNER" && ( */}
          <Link href={`/club/${clubId}/manage`}>
            <TabsTrigger value="manage" color="gray">
              관리
            </TabsTrigger>
          </Link>
          {/* )} */}
        </>
        {/* )} */}
      </TabsList>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow flex-1 space-y-4 p-8 min-h-[530px]">
        {children}
      </div>
    </Tabs>
  );
}

export default ClubLayout;
