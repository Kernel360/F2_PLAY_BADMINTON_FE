import IconButton from "@/components/ui/IconButton";
import { Text } from "@/components/ui/Text";
import { useGetDateLeagues } from "@/lib/api/hooks/leagueHook";
import type { components } from "@/schemas/schema";
import { getLeagueType } from "@/utils/getLeagueType";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ScheduleListProps {
  selectedDate: Date;
}

type DateLeagues = components["schemas"]["LeagueByDateResponse"];

function ScheduleList(props: ScheduleListProps) {
  const { selectedDate } = props;
  const clubId = Number(usePathname().split("/")[2]);
  const { data: schedules, refetch } = useGetDateLeagues(
    clubId,
    format(selectedDate, "yyyy-MM-dd"),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refetch();
  }, [selectedDate]);

  return (
    <div className="w-full px-6 py-3 bg-white relative">
      {/* TODO(Yejin0O0): api 연동 시 링크 수정 작업 필요 */}
      <Link href={`/club/${clubId}/schedule/create`}>
        <IconButton
          size="sm"
          color="transparent"
          radius="round"
          className="group hover:bg-primary hover:text-white absolute -right-4 -top-4"
        >
          <CalendarPlus className="text-primary group-hover:text-white" />
        </IconButton>
      </Link>
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800">
          {format(selectedDate, "yyyy년 MM월 dd일")}
        </h1>
      </div>

      <div className="grid gap-4 h-[27rem] overflow-y-auto">
        {Array.isArray(schedules) &&
          schedules.map((schedule: DateLeagues) => (
            // TODO(Yejin0O0): mock data or data 변수 이름 다시 생각해보기
            // TODO(Yejin0O0): api 연동 시 링크 수정 작업 필요
            <Link
              key={schedule.league_id}
              href={`/my-club/schedule/${schedule.league_id}`}
            >
              <div className="bg-white py-4 px-6 rounded-xl border border-solid hover:shadow-lg transform  transition-transform duration-300 cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {schedule.league_name}
                    </h2>
                    <Text color="gray" className="text-sm mt-1">
                      {getLeagueType(schedule.match_type as string)}
                    </Text>
                  </div>
                  <Text className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {getTierWithEmoji(schedule.required_tier as string)}
                  </Text>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <div>
                    <Text className="text-sm">
                      모집 기한:{" "}
                      {format(new Date(schedule.closed_at as string), "MM/dd")}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-sm">
                      {schedule.recruited_member_count} /{" "}
                      {schedule.player_limit_count} 명
                    </Text>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ScheduleList;
