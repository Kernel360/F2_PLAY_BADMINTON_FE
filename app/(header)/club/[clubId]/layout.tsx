"use client";

import ClubIntroPages from "@/app/(header)/club/[clubId]/ClubIntroPage";
import ClubManagePages from "@/app/(header)/club/[clubId]/manage/page";
import ClubMemberPages from "@/app/(header)/club/[clubId]/member/page";
import ClubSchedulePages from "@/app/(header)/club/[clubId]/schedule/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useGetClubsById } from "@/lib/api/hooks/clubHook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

/* TODO: 페이지와 관련된 코드 리팩토링 필요 */
function ClubLayout() {
  const currentPath = usePathname();
  const clubId = currentPath.split("/")[2];
  const pathname = currentPath.split("/")[3];
  const { data, error, isLoading } = useGetClubsById(Number(clubId ?? "-1"));
  const isMember = data?.is_club_member as boolean;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const activeTab = () => {
    if (pathname === undefined) return "intro";
    return pathname;
  };

  /* TODO: 겹치는 컴포넌트 분리 필요 */
  return (
    <Tabs defaultValue={activeTab()} className="w-full max-w-5xl mt-10">
      <TabsList>
        <Link href={`/club/${clubId}`}>
          <TabsTrigger value="intro" color="gray">
            소개
          </TabsTrigger>
        </Link>
        {isMember && (
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
            <Link href={`/club/${clubId}/manage`}>
              <TabsTrigger value="manage" color="gray">
                관리
              </TabsTrigger>
            </Link>
          </>
        )}
      </TabsList>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow flex-1 space-y-4 p-8 min-h-[530px]">
        <TabsContent value="intro">
          <ClubIntroPages />
        </TabsContent>
        {isMember && (
          <>
            <TabsContent value="schedule">
              <ClubSchedulePages />
            </TabsContent>
            <TabsContent value="member">
              <ClubMemberPages clubId={data.club_id as number} />
            </TabsContent>
            <TabsContent value="manage">
              <ClubManagePages clubData={data} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

export default ClubLayout;
