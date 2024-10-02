import { TabsContent } from "@/components/ui/Tabs";
import React from "react";
import ClubHomePages from "./intro/page";
import ClubManagePages from "./manage/page";
import ClubMemberPages from "./member/page";
import ClubSchedulePages from "./schedule/page";

function ClubPage() {
  return (
    <>
      <TabsContent value="intro">
        <ClubHomePages />
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

export default ClubPage;
