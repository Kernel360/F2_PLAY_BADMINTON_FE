"use client";

import DayCell from "@/components/DayCell";
import { Calendar } from "@/components/ui/calendar";
import { useGetMonthLeagues } from "@/lib/api/hooks/leagueHook";
import type { components } from "@/schemas/schema";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList";

type MonthLeagues = components["schemas"]["LeagueReadResponse"];

export default function ClubSchedulePage() {
  const [date, setDate] = useState<Date>(new Date());
  const clubId = Number(usePathname().split("/")[2]);
  const { data: scheduleList, refetch } = useGetMonthLeagues(
    clubId,
    format(date, "yyyy-MM"),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <div className="w-full flex">
      <Calendar
        mode="single"
        showOutsideDays={false}
        selected={date}
        onSelect={(selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
        onMonthChange={(newMonth) => {
          setDate(newMonth);
        }}
        locale={ko}
        className="rounded-md text-gray-800"
        classNames={{
          head_cell: "w-[80px]",
          cell: "h-[80px] w-[80px] hover:rounded-md cursor-pointer flex justify-center items-center",
          day: "hover:bg-inherit hover:text-inherit h-[80px] w-[80px] rounded-md flex justify-center items-center",
          day_selected:
            "w-full border border-primary bg-inherit text-primary hover:bg-inherit hover:text-inherit",
          day_today: "hover: bg-inherit",
        }}
        components={{
          DayContent: (dayProps) => (
            <DayCell
              date={dayProps.date}
              displayMonth={dayProps.displayMonth}
              scheduleList={scheduleList as MonthLeagues[]}
            />
          ),
        }}
      />
      <ScheduleList selectedDate={date} />
    </div>
  );
}
