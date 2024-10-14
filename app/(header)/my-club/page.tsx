"use client";

import ClubIntroPages from "@/app/(header)/my-club/ClubIntroPage";
import ClubManagePages from "@/app/(header)/my-club/manage/page";
import ClubMemberPages from "@/app/(header)/my-club/member/page";
import ClubSchedulePages from "@/app/(header)/my-club/schedule/page";
import { TabsContent } from "@/components/ui/Tabs";
import ClubLayout from "@/layouts/ClubLayout";
import { useGetIsClubMember } from "@/lib/api/hooks/memberHook";
import React from "react";

function MyClubPage() {
  const { data, error, isLoading } = useGetIsClubMember();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TabsContent value="intro">
        <ClubIntroPages clubId={data.club_id as number} />
      </TabsContent>
      <TabsContent value="schedule">
        <ClubSchedulePages />
      </TabsContent>
      <TabsContent value="member">
        <ClubMemberPages />
      </TabsContent>
      <TabsContent value="manage">
        <ClubManagePages />
      </TabsContent>
    </>
  );
}

export default MyClubPage;
