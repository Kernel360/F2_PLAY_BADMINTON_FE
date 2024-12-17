import LeagueSchedule from "@/components/club/LeagueList/LeagueSchedule";
import IconButton from "@/components/ui/IconButton";
import { useGetClubMembersCheck } from "@/lib/api/hooks/clubMemberHook";
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

function ScheduleList() {
  const { clubId } = useParams();
  const date = useSearchParams().get("date");

  const selectedDate = date === null ? String(new Date()) : date;

  const { data: isJoined } = useGetClubMembersCheck(clubId as string);

  return (
    <div className="w-full px-6 py-3 bg-white relative">
      {isJoined?.data?.is_club_member && (
        <Link href={`/club/${clubId}/league/create`}>
          <IconButton
            size="sm"
            color="transparent"
            radius="round"
            className="group hover:bg-primary hover:text-white absolute lg:-right-4 lg:-top-4 right-0"
          >
            <CalendarPlus className="text-primary group-hover:text-white" />
          </IconButton>
        </Link>
      )}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800">
          {format(selectedDate as string, "yyyy년 MM월 dd일")}
        </h1>
      </div>

      <div className="flex flex-col justify-start gap-4 h-[27rem] overflow-y-auto">
        <LeagueSchedule clubId={clubId as string} selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default ScheduleList;
