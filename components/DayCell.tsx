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

  const getColorIndex = (key: number) => key % colors.length;

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

  return (
    <div className="w-full h-full flex flex-col justify-between p-[3%] sm:p-[2%]">
      <div className="text-center text-sm font-medium mb-1">
        <DayContent
          displayMonth={displayMonth}
          date={date}
          activeModifiers={activeModifiers}
        />
      </div>

      {dayScheduleList.length > 0 && (
        <div className="w-full space-y-[2px] overflow-hidden">
          {/* 모바일 */}
          <div className="sm:hidden text-[0.5rem] text-center flex justify-center items-center">
            <div
              className={`flex items-center justify-center rounded-full text-white w-4 h-4 ${
                colors[getColorIndex(date.getDate() + date.getMonth())]
              }`}
            >
              +{dayScheduleList.length}
            </div>
          </div>

          {/* 데스크탑 */}
          <div className="hidden sm:block">
            {visibleSchedules.map((item) => {
              const colorIndex = getColorIndex(
                date.getDate() + date.getMonth() + item.league_id,
              );
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
                    className={`${
                      isCanceled ? "line-through" : ""
                    } text-inherit`}
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
        </div>
      )}
    </div>
  );
}

export default DayCell;
