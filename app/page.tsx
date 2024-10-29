"use client";

import DateCarousel from "@/components/DayCarousel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { format } from "date-fns";

const mockData = [
  {
    league_id: 1,
    league_name: "배드민턴 경기 1",
    league_description: "이 경기는 지역 예선 경기 1입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "SINGLES",
    league_at: "2024-11-01T09:00:00",
    recruiting_closed_at: "2024-10-22T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 16,
    recruited_member_count: 8,
    is_participated_in_league: true,
    created_at: "2024-10-01T08:00:00",
    modified_at: "2024-10-01T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 8,
    league_name: "배드민턴 경기 8",
    league_description: "이 경기는 지역 예선 경기 8입니다.",
    league_location: "양재 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "DOUBLES",
    league_at: "2024-11-01T09:30:00",
    recruiting_closed_at: "2024-10-29T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 23,
    recruited_member_count: 22,
    is_participated_in_league: false,
    created_at: "2024-10-08T08:00:00",
    modified_at: "2024-10-11T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 2,
    league_name: "배드민턴 경기 2",
    league_description: "이 경기는 지역 예선 경기 2입니다.",
    league_location: "양재 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "DOUBLES",
    league_at: "2024-11-01T10:30:00",
    recruiting_closed_at: "2024-10-23T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 17,
    recruited_member_count: 10,
    is_participated_in_league: false,
    created_at: "2024-10-02T08:00:00",
    modified_at: "2024-10-02T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 9,
    league_name: "배드민턴 경기 9",
    league_description: "이 경기는 지역 예선 경기 9입니다.",
    league_location: "장충동 체육관",
    required_tier: "BRONZE",
    league_status: "PLAYING",
    match_type: "SINGLES",
    league_at: "2024-11-01T12:00:00",
    recruiting_closed_at: "2024-10-30T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 24,
    recruited_member_count: 24,
    is_participated_in_league: true,
    created_at: "2024-10-09T08:00:00",
    modified_at: "2024-10-13T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 3,
    league_name: "배드민턴 경기 3",
    league_description: "이 경기는 지역 예선 경기 3입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "PLAYING",
    match_type: "SINGLES",
    league_at: "2024-11-01T13:00:00",
    recruiting_closed_at: "2024-10-24T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 18,
    recruited_member_count: 12,
    is_participated_in_league: true,
    created_at: "2024-10-03T08:00:00",
    modified_at: "2024-10-04T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 5,
    league_name: "배드민턴 경기 5",
    league_description: "이 경기는 지역 예선 경기 5입니다.",
    league_location: "장충동 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "SINGLES",
    league_at: "2024-11-01T15:30:00",
    recruiting_closed_at: "2024-10-26T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 20,
    recruited_member_count: 16,
    is_participated_in_league: true,
    created_at: "2024-10-05T08:00:00",
    modified_at: "2024-10-07T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 10,
    league_name: "배드민턴 경기 10",
    league_description: "이 경기는 지역 예선 경기 10입니다.",
    league_location: "양재 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T17:00:00",
    recruiting_closed_at: "2024-10-31T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 25,
    recruited_member_count: 26,
    is_participated_in_league: false,
    created_at: "2024-10-10T08:00:00",
    modified_at: "2024-10-14T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 6,
    league_name: "배드민턴 경기 6",
    league_description: "이 경기는 지역 예선 경기 6입니다.",
    league_location: "양재 체육관",
    required_tier: "BRONZE",
    league_status: "PLAYING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T18:00:00",
    recruiting_closed_at: "2024-10-27T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 21,
    recruited_member_count: 18,
    is_participated_in_league: false,
    created_at: "2024-10-06T08:00:00",
    modified_at: "2024-10-08T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 7,
    league_name: "배드민턴 경기 7",
    league_description: "이 경기는 지역 예선 경기 7입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "SINGLES",
    league_at: "2024-11-01T20:00:00",
    recruiting_closed_at: "2024-10-28T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 22,
    recruited_member_count: 20,
    is_participated_in_league: true,
    created_at: "2024-10-07T08:00:00",
    modified_at: "2024-10-10T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 4,
    league_name: "배드민턴 경기 4",
    league_description: "이 경기는 지역 예선 경기 4입니다.",
    league_location: "양재 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T20:00:00",
    recruiting_closed_at: "2024-10-25T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 19,
    recruited_member_count: 14,
    is_participated_in_league: false,
    created_at: "2024-10-04T08:00:00",
    modified_at: "2024-10-05T08:00:00",
    is_match_created: false,
  },
];

const getStatusText = (status: string) => {
  switch (status) {
    case "RECRUITING":
      return "모집중";
    case "COMPLETED":
      return "모집 완료";
    case "PLAYING":
      return "경기중";
    default:
      return "알 수 없음";
  }
};

function App() {
  const handleDateSelect = (date: Date) => {
    console.log("Selected date:", date);
  };

  return (
    <div className="p-4 w-full">
      <DateCarousel onDateSelect={handleDateSelect} />
      <div className="mt-4 space-y-4">
        {mockData.map((item) => (
          <div
            key={item.league_id}
            className="flex justify-between items-center p-4 border-b border-gray-200 !m-0"
          >
            {/* Left Side: Date and Time */}
            <div className="flex flex-col items-center text-center mr-4">
              <p className="font-bold text-gray-800">
                {format(new Date(item.league_at), "d일")}
              </p>
              <p className="text-gray-500 ">
                {format(new Date(item.league_at), "HH:mm")}
              </p>
            </div>

            <div className="flex flex-col flex-grow pl-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="font-semibold px-2 py-1 border-primary"
                >
                  {getTierWithEmoji(item.required_tier) || "랭크 없음"}
                </Badge>
                <p className="text-lg font-semibold text-gray-900">
                  {item.league_name}
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-1">
                {item.league_location}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>{item.match_type === "SINGLES" ? "단식" : "복식"}</span>
                <span className="text-gray-400 font-extralight">•</span>
                <span>
                  {item.recruited_member_count} / {item.player_limit_count}명
                </span>

                {item.is_participated_in_league && (
                  <>
                    <span className="text-gray-400 font-extralight">•</span>
                    <span className="text-[#007bff] font-medium">참여 중</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Side: Status Button */}
            <Button
              variant="outline"
              className={`px-4 py-2 rounded-md font-semibold ${
                item.league_status === "RECRUITING"
                  ? "bg-primary text-white hover:bg-blue-500" // 모집 중: 부드러운 파란색
                  : item.league_status === "COMPLETED"
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-200 hover:text-gray-800" // 모집 완료: 중립적인 회색
                    : item.league_status === "PLAYING"
                      ? "bg-red-500 text-white hover:bg-red-400 " // 경기 중: 부드러운 골드 계열
                      : ""
              }`}
            >
              {getStatusText(item.league_status)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
