import React from "react";
import { Day, type DayProps } from "react-day-picker";

const scheduleList = [
  { id: 1, date: "2024-09-29T08:42:51+09:00", name: "Event 1" },
  { id: 2, date: "2024-09-11T03:54:25+09:00", name: "Event 2" },
  { id: 3, date: "2024-09-03T12:43:55+09:00", name: "Event 3" },
  { id: 4, date: "2024-09-10T08:09:55+09:00", name: "Event 4" },
  { id: 5, date: "2024-09-15T18:18:11+09:00", name: "Event 5" },
  { id: 6, date: "2024-09-22T21:27:43+09:00", name: "Event 6" },
  { id: 7, date: "2024-09-07T23:56:30+09:00", name: "Event 7" },
  { id: 8, date: "2024-09-17T16:11:19+09:00", name: "Event 8" },
  { id: 9, date: "2024-09-27T01:34:12+09:00", name: "Event 9" },
  { id: 10, date: "2024-10-01T05:49:00+09:00", name: "Event 10" },
];

// TODO(Yejin0O0): 서버로 이미지 업로드 로직 추가
// interface Schedule {
//   id: number;
//   date: string;
//   name: string;
// }

// interface DayCellProps extends DayProps {
//   scheduleList: Schedule[];
// }

function DayCell(props: DayProps) {
  const { displayMonth, date } = props;

  const dayScheduleList = scheduleList.filter((schedule) => {
    // schedule.date === date;
    const scheduleDate = new Date(schedule.date);

    return (
      scheduleDate.getMonth() === date.getMonth() &&
      scheduleDate.getDate() === date.getDate()
    );
  });

  return (
    <div>
      <Day displayMonth={displayMonth} date={date} />

      <div>
        {dayScheduleList.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </div>
  );
}

export default DayCell;
