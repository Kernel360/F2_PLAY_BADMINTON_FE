import ClubIntroPages from "@/app/(header)/club/[clubId]/ClubIntroPage";
import ClubManagePages from "@/app/(header)/club/[clubId]/manage/page";
import ClubMemberPages from "@/app/(header)/club/[clubId]/member/page";
import ClubSchedulePages from "@/app/(header)/club/[clubId]/schedule/page";
import { TabsContent } from "@/components/ui/Tabs";
import ClubLayout from "./layout";

function MyClubPage() {
  return <ClubLayout />;
}

export default MyClubPage;
