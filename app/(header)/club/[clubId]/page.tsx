import ClubIntroPages from "@/app/(header)/club/[clubId]/ClubIntroPage";
import ClubManagePages from "@/app/(header)/club/[clubId]/manage/page";
import ClubMemberPages from "@/app/(header)/club/[clubId]/member/page";
import ClubSchedulePages from "@/app/(header)/club/[clubId]/schedule/page";
import { TabsContent } from "@/components/ui/Tabs";

function MyClubPage() {
  return (
    <>
      <TabsContent value="intro">
        <ClubIntroPages />
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
