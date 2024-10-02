import React from "react";
import {
  type ActiveModifiers,
  DayContent,
  type DayContentProps,
} from "react-day-picker";

// 10월 일정
const scheduleList = [
  { id: 1, date: "2024-10-01T08:42:51+09:00", name: "Event 1" },
  { id: 2, date: "2024-10-01T03:54:25+09:00", name: "Event 2" },
  { id: 3, date: "2024-10-03T12:43:55+09:00", name: "Event 3" },
  { id: 4, date: "2024-10-04T08:09:55+09:00", name: "Event 4" },
  { id: 5, date: "2024-10-04T18:18:11+09:00", name: "Event 5" },
  { id: 6, date: "2024-10-04T21:27:43+09:00", name: "Event 6" },
  { id: 7, date: "2024-10-05T23:56:30+09:00", name: "Event 7" },
  { id: 8, date: "2024-10-05T16:11:19+09:00", name: "Event 8" },
  { id: 9, date: "2024-10-10T01:34:12+09:00", name: "Event 9" },
  { id: 10, date: "2024-10-10T05:49:00+09:00", name: "Event 10" },
  { id: 11, date: "2024-10-10T10:00:00+09:00", name: "Event 11" },
];

// 여러 색상 배열
const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function DayCell(props: DayContentProps) {
  const { displayMonth, date } = props;
  const activeModifiers: ActiveModifiers = {
    selected: true,
    customModifier: true,
  };

  // 해당 날짜에 스케줄이 있는지 필터링
  const dayScheduleList = scheduleList.filter((schedule) => {
    const scheduleDate = new Date(schedule.date);
    return (
      scheduleDate.getMonth() === date.getMonth() &&
      scheduleDate.getDate() === date.getDate()
    );
  });

  const maxVisibleSchedules = 1; // 최대 1개의 일정만 표시
  const visibleSchedules = dayScheduleList.slice(0, maxVisibleSchedules);
  const remainingSchedules = dayScheduleList.length - maxVisibleSchedules;

  // 전체 스케줄 수에 따라 색상 패턴을 고정하기 위해 랜덤이 아닌 일정한 방식으로 색상을 선택
  const selectedColorIndex =
    dayScheduleList.length > 0 ? dayScheduleList[0].id % colors.length : 0;

  // TODO(Yejin0O0): 백엔드 데이터 로직 필요함
  // TODO(Yejin0O0): 티어, 모집 마감 여부도 알 수 있었으면 좋겠다는 백엔드 의견 있었음
  return (
    <div className="w-full h-full flex flex-col justify-between p-1">
      <div className="text-center text-sm font-medium mb-1">
        <DayContent
          displayMonth={displayMonth}
          date={date}
          activeModifiers={activeModifiers}
        />
      </div>

      {visibleSchedules.length > 0 && (
        <div className="w-full space-y-[2px] overflow-hidden">
          {visibleSchedules.map((item) => (
            <div
              key={item.id}
              className={`text-xs text-center text-white rounded-md truncate px-2 py-[2px] ${
                colors[selectedColorIndex]
              }`}
            >
              {item.name}
            </div>
          ))}

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
