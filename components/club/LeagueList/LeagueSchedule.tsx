import { Text } from "@/components/ui/Text";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDateLeagues } from "@/lib/api/hooks/leagueHook";
import type { GetLeagueDateData } from "@/types/leagueTypes";
import { getLeagueType } from "@/utils/getLeagueType";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { format } from "date-fns";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

interface LeagueScheduleProps {
  clubId: string;
  selectedDate: string;
}

function LeagueSchedule(props: LeagueScheduleProps) {
  const { clubId, selectedDate } = props;
  const {
    data: schedules,
    isLoading,
    refetch: schedulesRefetch,
  } = useGetDateLeagues(clubId, format(selectedDate, "yyyy-MM-dd"));

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    schedulesRefetch();
  }, [selectedDate, schedulesRefetch]);

  if (schedules !== undefined && schedules.length > 0) {
    return schedules.map((schedule: GetLeagueDateData) => {
      const isCanceled = schedule.status === "CANCELED";

      return (
        <Link
          key={schedule.league_id}
          href={`/club/${clubId}/league/${schedule.league_id}`}
        >
          <div className="relative bg-white py-4 px-6 rounded-xl border border-solid hover:shadow-lg transform transition-transform duration-300 cursor-pointer">
            {isCanceled && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center gap-2 rounded-xl z-10 text-white">
                <TriangleAlert size={15} />
                <span className="font-semibold text-sm">
                  이 경기는 취소되었습니다
                </span>
                <TriangleAlert size={15} />
              </div>
            )}

            {/* Content */}
            <div className={`${isCanceled ? "opacity-50" : ""}`}>
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
                  {getTierWithEmojiAndText(schedule.required_tier as string)}
                </Text>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <div>
                  <Text className="text-sm">
                    모집 기한:{" "}
                    {format(
                      new Date(schedule.recruiting_close_at as string),
                      "MM/dd",
                    )}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm">
                    {schedule.participant_count} / {schedule.player_limit_count}{" "}
                    명
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`leagueSkeleton${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className="bg-white py-4 px-6 rounded-xl border border-solid hover:shadow-lg transform transition-transform duration-300 cursor-pointer"
          >
            <Skeleton className="h-6 w-3/4" />
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center text-gray-500 py-10">
      <p className="text-lg">아직 등록된 스케줄이 없습니다</p>
    </div>
  );
}

export default LeagueSchedule;
