import type { components } from "@/schemas/schema";
import { type ActiveModifiers, DayContent } from "react-day-picker";

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

type MonthLeagues = components["schemas"]["LeagueReadResponse"];
interface DayCellProps {
  date: Date;
  displayMonth: Date;
  scheduleList: MonthLeagues[];
}

function DayCell({ date, displayMonth, scheduleList }: DayCellProps) {
  const activeModifiers: ActiveModifiers = {
    selected: true,
    customModifier: true,
  };

  const dayScheduleList =
    scheduleList?.filter((schedule) => {
      if (!schedule.league_at) return false;

      const scheduleDate = new Date(schedule.league_at);
      return (
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getDate() === date.getDate()
      );
    }) ?? []; // dayScheduleList가 undefined일 경우 빈 배열로 설정

  const maxVisibleSchedules = 1; // 최대 1개의 일정만 표시
  const visibleSchedules = dayScheduleList.slice(0, maxVisibleSchedules);
  const remainingSchedules = dayScheduleList.length - maxVisibleSchedules;
  const selectedColorIndex = scheduleList?.length % colors.length;

  return (
    <div className="w-full h-full flex flex-col justify-between p-[3%] sm:p-[2%]">
      <div className="text-center text-sm font-medium mb-1">
        <DayContent
          displayMonth={displayMonth}
          date={date}
          activeModifiers={activeModifiers}
        />
      </div>

      {visibleSchedules.length > 0 && (
        <div className="w-full space-y-[2px] overflow-hidden">
          {visibleSchedules.map((item) => {
            const colorIndex = item.league_id
              ? (item.league_id + selectedColorIndex) % colors.length
              : 0;
            const isCanceled = item.status === "CANCELED";
            return (
              <div
                key={item.league_id}
                className={`text-xs text-center rounded-md truncate px-2 py-[2px] ${
                  isCanceled
                    ? "bg-gray-200 text-gray-500"
                    : `${colors[colorIndex]} text-white`
                }`}
              >
                <span
                  className={`${isCanceled ? "line-through" : ""} text-inherit`}
                >
                  {item.league_name}
                </span>
              </div>
            );
          })}

          {remainingSchedules > 0 && (
            <div className="text-xs text-center text-gray-500">
              +{remainingSchedules}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DayCell;
