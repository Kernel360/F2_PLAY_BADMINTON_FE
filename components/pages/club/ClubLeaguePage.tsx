"use client";

import DayCell from "@/components/DayCell";
import LeagueList from "@/components/club/LeagueList";
import { Calendar } from "@/components/ui/calendar";
import { useGetMonthLeagues } from "@/lib/api/hooks/leagueHook";
import type { GetLeagueMonthData } from "@/types/leagueTypes";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ClubLeaguePage() {
  const [month, setMonth] = useState<string>(format(new Date(), "yyyy-MM"));
  const { clubId } = useParams();
  const { data: leagueList, refetch } = useGetMonthLeagues(
    clubId as string,
    month,
  );
  const router = useRouter();
  const date = useSearchParams().get("date");

  const selectedDate = date === null ? new Date() : new Date(date);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refetch();
  }, [month]);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-4 sm:p-6 h-full min-h-[70vh] lg:h-[calc(100vh-80px)]">
      {/* 캘린더 영역 */}
      <div className="flex-1 basis-full lg:basis-1/2 h-full bg-white p-4 rounded-lg overflow-y-auto">
        <Calendar
          mode="single"
          showOutsideDays={false}
          selected={selectedDate}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              router.push(
                `/club/${clubId}/league?date=${format(selectedDate, "yyyy-MM-dd")}`,
              );
            }
          }}
          onMonthChange={(newMonth) => {
            const newMonthStr = format(newMonth, "yyyy-MM");
            if (newMonthStr !== month) {
              setMonth(newMonthStr);
            }
          }}
          locale={ko}
          formatters={{
            formatCaption: (date) => format(date, "yyyy년 MM월"),
          }}
          className="rounded-md text-gray-800"
          classNames={{
            head_cell:
              "w-[12vw] h-[12vw] sm:w-[10vw] sm:h-[10vw] md:w-[8vw] md:h-[8vw] lg:w-[60px] lg:h-[60px] min-w-[40px]",
            cell: "w-[12vw] h-[12vw] sm:w-[10vw] sm:h-[10vw] md:w-[8vw] md:h-[8vw] lg:w-[60px] lg:h-[60px] hover:rounded-md cursor-pointer flex justify-center items-center",
            day: "w-[12vw] h-[12vw] sm:w-[10vw] sm:h-[10vw] md:w-[8vw] md:h-[8vw] lg:w-[60px] lg:h-[60px] rounded-md flex justify-center items-center",
            day_selected:
              "w-full h-full border border-primary bg-inherit text-primary hover:bg-inherit hover:text-inherit",
            day_today:
              "w-full h-full bg-blue-100 text-blue-800 font-bold rounded-md hover:bg-blue-200",
            caption_label:
              "text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800",
          }}
          components={{
            DayContent: (dayProps) => (
              <DayCell
                date={dayProps.date}
                displayMonth={dayProps.displayMonth}
                scheduleList={leagueList as GetLeagueMonthData[]}
              />
            ),
          }}
        />
      </div>

      {/* 리스트 영역 */}
      <div className="w-full flex-1 basis-full lg:basis-1/2 h-full bg-white lg:p-4 rounded-lg overflow-y-auto">
        <LeagueList />
      </div>
    </div>
  );
}

export default ClubLeaguePage;
