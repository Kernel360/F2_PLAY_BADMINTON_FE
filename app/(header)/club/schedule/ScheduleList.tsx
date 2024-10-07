import { Text } from "@/components/ui/Text";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const schedules = [
  {
    id: 1,
    title: "일정 제목 1",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "gold",
    type: "단식",
  },
  {
    id: 2,
    title: "일정 제목 2",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "silver",
    type: "단식",
  },
  {
    id: 3,
    title: "일정 제목 3",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "bronze",
    type: "단식",
  },
  {
    id: 4,
    title: "일정 제목 4",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "gold",
    type: "단식",
  },
  {
    id: 5,
    title: "일정 제목 5",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "silver",
    type: "단식",
  },
  {
    id: 6,
    title: "일정 제목 6",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "bronze",
    type: "단식",
  },
  {
    id: 7,
    title: "일정 제목 7",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "gold",
    type: "단식",
  },
  {
    id: 8,
    title: "일정 제목 8",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "silver",
    type: "단식",
  },
  {
    id: 9,
    title: "일정 제목 9",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "bronze",
    type: "단식",
  },
  {
    id: 10,
    title: "일정 제목 10",
    deadline: "8/12",
    participants: "8/24 명",
    tier: "gold",
    type: "단식",
  },
];

interface ScheduleListProps {
  selectedDate: Date;
}

function ScheduleList(props: ScheduleListProps) {
  const { selectedDate } = props;

  const getTierWithEmoji = (tier: string) => {
    switch (tier) {
      case "gold":
        return "🥇 골드";
      case "silver":
        return "🥈 실버";
      case "bronze":
        return "🥉 브론즈";
      default:
        return "";
    }
  };

  return (
    <div className="w-full  p-6 bg-white">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800">
          {format(selectedDate, "yyyy년 MM월 dd일")}
        </h1>
      </div>

      <div className="grid gap-4 h-[27rem] overflow-y-auto">
        {schedules.map((schedule) => (
          // TODO(Yejin0O0): mock data or data 변수 이름 다시 생각해보기
          <Link key={schedule.id} href={`/club/schedule/league/${schedule.id}`}>
            <div className="bg-white py-4 px-6 rounded-xl border border-solid hover:shadow-lg transform  transition-transform duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {schedule.title}
                  </h2>
                  <Text color="gray" className="text-sm mt-1">
                    {schedule.type}
                  </Text>
                </div>
                <Text className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {getTierWithEmoji(schedule.tier)}
                </Text>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <div>
                  <Text className="text-sm">
                    모집 기한: {schedule.deadline}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm">{schedule.participants}</Text>
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
